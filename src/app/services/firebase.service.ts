import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { RoomModel } from '../core/models/room.model';
import { PlayerModel } from '../core/models/player.model';
import * as firebase from 'firebase';
import { TokenModel } from '../core/models/token.model';
import { StoreCardModel } from '../core/models/store-card.model';
import { StoreLogModel } from '../core/models/store-log.model';
import { ElDoradoAssetsModel } from '../admin/models/edit-assets.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  downloadURL: any;

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {}

  getRoom(roomId: string) {
    return this.db.collection('rooms').doc(roomId).valueChanges();
  }

  updateToken(roomId: string, token: TokenModel) {
    let roomRef = this.db.firestore.collection('rooms').doc(roomId);
    this.db.firestore.runTransaction(transaction => 
      transaction.get(roomRef).then(updateRef => {
        let tokens: TokenModel[] = updateRef.data().tokens;
        let index = tokens.findIndex(item => item.color == token.color);
        tokens[index] = token;

        transaction.update(roomRef, {
          tokens: JSON.parse(JSON.stringify(tokens))
        });
      })
    );
  }

  updatePlayer(roomId: string, player: PlayerModel) {
    let roomRef = this.db.firestore.collection('rooms').doc(roomId);
    this.db.firestore.runTransaction(transaction => 
      transaction.get(roomRef).then(updateRef => {
        let players: PlayerModel[] = updateRef.data().players;
        let index = players.findIndex(item => item.playerId == player.playerId);
        players[index] = player;

        transaction.update(roomRef, {
          players: JSON.parse(JSON.stringify(players))
        });
      })
    );
  }

  updateStoreItem(roomId: string, storeItem: StoreCardModel) {
    let roomRef = this.db.firestore.collection('rooms').doc(roomId);
    this.db.firestore.runTransaction(transaction => 
      transaction.get(roomRef).then(updateRef => {
        let store: StoreCardModel[] = updateRef.data().store;
        let index = store.findIndex(item => item.card.cardId == storeItem.card.cardId);
        store[index] = storeItem;

        transaction.update(roomRef, {
          store: JSON.parse(JSON.stringify(store))
        });
      })
    );
  }

  updateStoreLog(roomId: string, storeLog: StoreLogModel[]) {
    let roomRef = this.db.collection('rooms').doc(roomId);
    return roomRef.update({
      storeLog: JSON.parse(JSON.stringify(storeLog))
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

  getRooms() {
    return this.db.collection('rooms').valueChanges();
  }

  getAsset(assetId: string) {
    return this.db.collection('assets').doc(assetId).get().toPromise();
  }

  updateCardAssets(assetId: string, assets: ElDoradoAssetsModel) {
    let roomRef = this.db.collection('assets').doc(assetId);
    return roomRef.update({
      cards: JSON.parse(JSON.stringify(assets.cards))
    });
  }

  updateTokenAssets(assetId: string, assets: ElDoradoAssetsModel) {
    let roomRef = this.db.collection('assets').doc(assetId);
    return roomRef.update({
      tokens: JSON.parse(JSON.stringify(assets.tokens))
    });
  }

  uploadImage(fileBlob: File){
    const filePath = `/boards/${fileBlob.name}`;
    const task = this.storage.upload(filePath, fileBlob);
    return task;
  }
}