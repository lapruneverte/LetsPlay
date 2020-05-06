import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RoomModel } from '../core/models/room.model';
import { CardModel } from '../core/models/card.model';
import { FirebaseService } from '../services/firebase.service';
import { ZoomModel } from '../core/models/zoom.model';
import { PlayerModel } from '../core/models/player.model';

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

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  moveFromStoreToDiscard() {
    this.closeMenu();
    let playerId = sessionStorage.getItem('playerId');
    let player: PlayerModel = this.room.players.find( p => p.playerId === playerId);
    if (this.room.store[this.selectedCardIndex].quantity > 0) {
      this.room.store[this.selectedCardIndex].quantity--;
      player.played.unshift(this.room.store[this.selectedCardIndex].card);  
      this.firebaseService.updatePlayers(this.room.id, this.room.players);
      this.firebaseService.updateStore(this.room.id, this.room.store);
    }
  }

  updatePosition($event,i) {
    this.room.store[i].position.x = this.room.store[i].position.x + $event.distance.x;
    this.room.store[i].position.y = this.room.store[i].position.y + $event.distance.y;
    this.firebaseService.updateStore(this.room.id, this.room.store);
  }

  zoomImage() {
    this.closeMenu();
    let zoomData = new ZoomModel();

    zoomData.x = this.menuX;
    zoomData.y = this.menuY;
    zoomData.src = this.room.store[this.selectedCardIndex].card.link;

    this.onZoom.emit(zoomData);
  }

  showMenu(event: MouseEvent, i:number) {
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

  closeMenu() {
    this.isMenuVisible = false;
  }

  onClickOutsideMenu(event?: MouseEvent) {
    if (event.target != this.lastTarget) {
      this.closeMenu();
    }
  }

}
