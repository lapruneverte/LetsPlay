import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../../services/firebase.service';
import { RoomModel } from '../../core/models/room.model';
import { NewRoomComponent } from '../new-room/new-room.component'
import { PasswordModalComponent } from '../password-modal/password-modal.component';

@Component({
  selector: 'app-room-list-component',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: RoomModel[];

  constructor(public firebaseService: FirebaseService, 
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.firebaseService.getRooms().subscribe( (result: RoomModel[]) => {
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
    const dialogRef = this.dialog.open(PasswordModalComponent, {
      width: '700px',
      data: {
        name: this.rooms[i].name,
        password: this.rooms[i].password,
        destination: '/hall',
        destinationId: this.rooms[i].id,
        callback: () => console.log('callback!')
      }
    });
  }

}
