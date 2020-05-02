import { Component, Input, Inject} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { BoardModel } from '../core/models/board.model';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent {

  room: BoardModel;
  error: string;

  constructor(public dialogRef: MatDialogRef<JoinRoomComponent>, @Inject(MAT_DIALOG_DATA) public data) { 
    this.room = data.room;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  joinRoom(f: NgForm){
    this.error = null;
    if (f.valid) {
      if (f.value.inputPasswordJoin === this.room.password) {
        //TODO go to room
        this.dialogRef.close();
      } else {
        this.error = "Incorrect password";
      }
    }
  }
  

}
