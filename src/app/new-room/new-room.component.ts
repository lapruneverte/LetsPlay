import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RoomModel } from '../core/models/room.model';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { TokenModel } from '../core/models/token.model';
import { PlayerModel } from '../core/models/player.model';
import { v4 } from 'uuid';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent {

  newRoom: RoomModel = new RoomModel();
  imageToUpload: File;

  constructor(public dialogRef: MatDialogRef<NewRoomComponent>, public firebaseService: FirebaseService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createRoom(f: NgForm) {
    if (f.valid) {
      this.firebaseService.uploadImage(this.imageToUpload).then(result => { 
        result.ref.getDownloadURL().then(url => {
          this.newRoom.id = v4();
          this.newRoom.gameType = f.value.selectGameType;
          this.newRoom.link = url;
          this.newRoom.name = f.value.inputRoom;
          this.newRoom.password = f.value.inputPassword;
          this.newRoom.owner = f.value.inputOwner;

          this.firebaseService.getTokens(f.value.selectGameType).then(result => {
            this.newRoom.tokens = result.data().tokens;
            let player: PlayerModel = new PlayerModel(f.value.inputOwner);
            player.playerId = v4();
            this.newRoom.players = new Array(player);
  
            this.firebaseService.createRoom(this.newRoom).then( res => {
              //console.log("res is ",res);
              this.dialogRef.close();
            });
          })
        })
      });
    }   
  }

  handleFileInput(files: FileList) {
    this.imageToUpload = files.item(0);
  }
}
