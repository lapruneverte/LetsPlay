import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { PlayerModel } from '../../core/models/player.model';
import { v4 } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent {

  roomId: string;
  gameType: string;
  disabled: boolean= false;

  constructor(public firebaseService: FirebaseService, 
    public dialogRef: MatDialogRef<NewPlayerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
    private utils: UtilsService
    ) { 
      this.roomId = data.roomId;
      this.gameType = data.gameType;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPlayer(f: NgForm) {
    if (!this.disabled) {
      if (f.valid) {
        this.disabled = true;
        this.firebaseService.getAsset(this.gameType).then(result => {
          let player = new PlayerModel(f.value.inputPlayerName, f.value.inputPlayerPassword);
          player.cardBackside = result.data().cards.backside;
          player.playerId = v4();
          player.deck = this.utils.shuffleArray(result.data().cards.player);
          this.firebaseService.addPlayer(this.roomId, player).then( result => {
            this.dialogRef.close();
          });
        });
      } 
    }
  }

}
