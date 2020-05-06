import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { RoomModel } from '../core/models/room.model';
import { PlayerModel } from '../core/models/player.model';
import * as firebase from 'firebase';
import { TokenModel } from '../core/models/token.model';
import { StoreCardModel } from '../core/models/store-card.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  downloadURL: any;

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {}

  getRoom(roomId: string) {
    return this.db.collection('rooms').doc(roomId).valueChanges();
  }

  updateTokens(roomId: string, tokens: TokenModel[]) {
    let roomRef = this.db.collection('rooms').doc(roomId);
    return roomRef.update({
      tokens: JSON.parse(JSON.stringify(tokens))
    });
  }

  updatePlayers(roomId: string, players: PlayerModel[]) {
    let roomRef = this.db.collection('rooms').doc(roomId);
    return roomRef.update({
      players: JSON.parse(JSON.stringify(players))
    });
  }

  updateStore(roomId: string, store: StoreCardModel[]) {
    let roomRef = this.db.collection('rooms').doc(roomId);
    return roomRef.update({
      store: JSON.parse(JSON.stringify(store))
    });
  }

  addPlayer(roomId: string, player: PlayerModel) {
    let roomRef = this.db.collection('rooms').doc(roomId);
    return roomRef.update({
      players: firebase.firestore.FieldValue.arrayUnion(JSON.parse(JSON.stringify(player)))
    });
  }

  createRoom(room: RoomModel) {
    return this.db.collection('rooms').doc(room.id).set(JSON.parse(JSON.stringify(room)));
  }

  getCardBackside() {
    return this.db.collection('cards').doc('backside').valueChanges();
  }

  getRooms() {
    return this.db.collection('rooms').valueChanges();
  }

  getAsset(assetId: string) {
    return this.db.collection('assets').doc(assetId).get().toPromise();
  }

  uploadImage(fileBlob: File){
    const filePath = `/boards/${fileBlob.name}`;
    const task = this.storage.upload(filePath, fileBlob);
    return task;
  }
}