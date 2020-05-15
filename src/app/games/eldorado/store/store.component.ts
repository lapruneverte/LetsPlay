import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RoomModel } from '../../../core/models/room.model';
import { CardModel } from '../../../core/models/card.model';
import { FirebaseService } from '../../../services/firebase.service';
import { ZoomModel } from '../../../core/models/zoom.model';
import { PlayerModel } from '../../../core/models/player.model';
import { StoreLogModel } from '../../../core/models/store-log.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})

export class StoreComponent implements OnInit {
  @Input() room: RoomModel;
  @Output() onZoom = new EventEmitter<ZoomModel>();

  selectedCardIndex: number;
  menuX: number;
  menuY: number;
  isMenuVisible: boolean = false;
  lastTarget: any;
  dragged = false;

  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  moveFromStoreToDiscard() {
    this.closeMenu();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { 
        title: 'Buy', 
        confirmMessage: 'Do you wish to buy? This action cannot be undone!',
        imageSrc: this.room.store[this.selectedCardIndex].card.link
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let playerId = sessionStorage.getItem('playerId');
        let player: PlayerModel = this.room.players.find( p => p.playerId === playerId);
        if (this.room.store[this.selectedCardIndex].quantity > 0) {
          this.room.store[this.selectedCardIndex].quantity--;
          player.played.unshift(this.room.store[this.selectedCardIndex].card); 
          let storeLog = new StoreLogModel();
          storeLog.playerName = player.name;
          storeLog.card = this.room.store[this.selectedCardIndex].card;
          this.room.storeLog.unshift(storeLog);
    
          this.firebaseService.updateStoreLog(this.room.id, this.room.storeLog);
          this.firebaseService.updatePlayer(this.room.id, player);
          this.firebaseService.updateStoreItem(this.room.id, this.room.store[this.selectedCardIndex]);
        }
      }
    });
  }

  updatePosition($event,i) {
    this.room.store[i].position.x = this.room.store[i].position.x + $event.distance.x;
    this.room.store[i].position.y = this.room.store[i].position.y + $event.distance.y;
    this.firebaseService.updateStoreItem(this.room.id, this.room.store[i]);
  }

  zoomImage() {
    this.closeMenu();
    let zoomData = new ZoomModel();

    zoomData.x = this.menuX;
    zoomData.y = this.menuY;
    zoomData.src = this.room.store[this.selectedCardIndex].card.link;

    this.onZoom.emit(zoomData);
  }

  zoomLogImage(card: CardModel) {
    let zoomData = new ZoomModel();
    zoomData.src = card.link;

    this.onZoom.emit(zoomData);
  }

  showMenu(event: MouseEvent, i:number) {
    if (!this.dragged) {
      if (event.view.innerWidth - event.x < 170) {
        this.menuX = event.x - 160;
      } else {
        this.menuX = event.x;
      }

      this.menuY = event.y;
      this.isMenuVisible = true;
      this.selectedCardIndex = i;
      this.lastTarget = event.target;
    }
    event.stopPropagation();
    this.dragged = false;
  }

  closeMenu() {
    this.isMenuVisible = false;
  }

  onClickOutsideMenu(event?: MouseEvent) {
    if (event.target != this.lastTarget) {
      this.closeMenu();
    }
  }

  dragStart() {
    this.dragged = true;
  }
}
