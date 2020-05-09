import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RoomModel } from '../../core/models/room.model';
import { FirebaseService } from '../../services/firebase.service';
import { NewPlayerComponent } from '../new-player/new-player.component';
import { MatDialog } from '@angular/material/dialog';
import { PasswordModalComponent } from '../password-modal/password-modal.component';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {

  gameId: string;
  room: RoomModel;
  isDataLoaded: boolean = false;

  constructor(private route: ActivatedRoute,
    public firebaseService: FirebaseService, 
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.gameId = params.id;
      this.getData(params.id);
    });
  }

  getData(id: string) {
    this.firebaseService.getRoom(id)
    .subscribe((result: RoomModel) => {
      this.room = result;
      this.isDataLoaded = true;
    })
  }

  pickPlayer(i: number) {
    const dialogRef = this.dialog.open(PasswordModalComponent, {
      width: '700px',
      data: {
        name: this.room.players[i].name,
        password: this.room.players[i].password,
        destination: '/game',
        destinationId: this.room.id,
        callback: () => sessionStorage.setItem('playerId', this.room.players[i].playerId)
      }
    });
  }

  newPlayer() {
    this.dialog.open(NewPlayerComponent, {
      width: '700px',
      data: {
        roomId: this.room.id,
        gameType: this.room.gameType
      }
    });
  }

}
