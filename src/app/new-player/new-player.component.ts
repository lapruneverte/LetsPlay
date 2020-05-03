import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { PlayerModel } from '../core/models/player.model';
import { v4 } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent {

  roomId: string;

  constructor(public firebaseService: FirebaseService, public dialogRef: MatDialogRef<NewPlayerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.roomId = data.roomId;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPlayer(f: NgForm) {
    if (f.valid) {
      let player = new PlayerModel(f.value.inputPlayerName);
      player.playerId = v4();
      this.firebaseService.updatePlayers(this.roomId, player).then( result => {
        this.dialogRef.close();
      });
    }   
  }

}
