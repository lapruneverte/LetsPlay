import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { RoomModel } from '../../../core/models/room.model';
import { PlayerModel } from '../../../core/models/player.model';
import { MatTabsModule } from '@angular/material/tabs';
import { ZoomModel } from '../../../core/models/zoom.model';
import { MatDialog } from '@angular/material/dialog';
import { ZoomComponent } from '../zoom/zoom.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameId: string;
  room: RoomModel;
  isDataLoaded: boolean = false;
  playerId: string;
  zoomX: number;
  zoomY: number;
  zoom: boolean = false;
  zoomImageSrc: string;

  constructor(
  public firebaseService: FirebaseService,
  private route: ActivatedRoute, 
  public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.gameId = params.id;
      this.getData(params.id);
    });
  }

  getData(id: string){
    this.firebaseService.getRoom(id)
      .subscribe((result: RoomModel) => {
        this.room = result;
        this.isDataLoaded = true;
        this.playerId = sessionStorage.getItem('playerId');
    })
  }

  getPlayerData() {
    return this.room.players.find( p => p.playerId === this.playerId);
  }

  updatePlayer(player: PlayerModel) {
    this.firebaseService.updatePlayer(this.room.id, player);
  }

  closeZoom() {
    this.zoom = false;
  }

  onZoom(event: ZoomModel){
    const dialogRef = this.dialog.open(ZoomComponent, {
      data: {
        zoomImageSrc: event.src 
      }
    });
  }

  onSelectedTabChange(event) {
    console.log(event);
  }

}