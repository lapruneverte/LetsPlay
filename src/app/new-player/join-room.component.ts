import { Component, Input, Inject} from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public dialogRef: MatDialogRef<JoinRoomComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router) { 
    this.room = data.room;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  joinRoom(f: NgForm){
    this.error = null;
    if (f.valid) {
      if (f.value.inputPasswordJoin === this.room.password) {
        this.dialogRef.close();
        this.router.navigate(['/hall', this.room.id]);
      } else {
        this.error = "Incorrect password";
      }
    }
  }
  

}
