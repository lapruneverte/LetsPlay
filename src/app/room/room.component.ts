import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';
import { BoardModel } from '../core/models/board.model';
import { NewRoomComponent } from '../new-room/new-room.component'
import { JoinRoomComponent } from '../join-room/join-room.component'

@Component({
  selector: 'app-room-component',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rooms: BoardModel[];

  constructor(public firebaseService: FirebaseService, 
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.firebaseService.getBoards().subscribe( (result: BoardModel[]) => {
      this.rooms = result;
    });
  }

  getPlayerNames(i: number) {
    if (this.rooms[i].players) {
      return this.rooms[i].players.map(player => player.name).join(",");
    }
    return '';
  }

  newRoom() {
    const dialogRef = this.dialog.open(NewRoomComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  joinRoom(i: number) {
    const dialogRef = this.dialog.open(JoinRoomComponent, {
      width: '700px',
      data: {
        room: this.rooms[i]
      }
    });
  }

}
