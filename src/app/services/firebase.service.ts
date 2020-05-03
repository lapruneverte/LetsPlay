import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { RoomModel } from '../core/models/room.model';
import { PlayerModel } from '../core/models/player.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  downloadURL: any;

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {}

  getRoom(roomId: string){
    return this.db.collection('rooms').doc(roomId).valueChanges();
  }

  updateRoom(room: RoomModel){
    return this.db.collection('rooms').doc(room.id).update(JSON.parse(JSON.stringify(room)));
  }

  updatePlayers(roomId: string, player: PlayerModel) {
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

  getRooms(){
    return this.db.collection('rooms').valueChanges();
  }

  uploadImage(fileBlob: File){
    const filePath = `/boards/${fileBlob.name}`;
    const task = this.storage.upload(filePath, fileBlob);
    return task;
  }
}