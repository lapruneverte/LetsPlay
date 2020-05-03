import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BoardModel } from '../core/models/board.model';
import { PlayerModel } from '../core/models/player.model';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  downloadURL: any;

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {}

  getBoard(id: string){
    return this.db.collection('board').doc(id).valueChanges();
  }

  getBoardPromise(id: string) {
    return this.db.collection('board').doc(id).get().toPromise();
  }

  updateBoardById(board: BoardModel){
    return this.db.collection('board').doc(board.id).update(JSON.parse(JSON.stringify(board)));
  }

  updatePlayers(boardId: string, player: PlayerModel) {
/*     return this.getBoardPromise(boardId).then((result:any) => {
      //result.players.push(player);
      result.data().players.push(player);
      return this.db.collection('board').doc(boardId).update({
        players: JSON.parse(JSON.stringify(result.data().players))
      });
    }); */
    let boardRef = this.db.collection('board').doc(boardId);
    return boardRef.update({
      players: firebase.firestore.FieldValue.arrayUnion(JSON.parse(JSON.stringify(player)))
    });
  }

  createBoard(board: any) {
    return this.db.collection('board').doc(board.id).set(JSON.parse(JSON.stringify(board)));
  }

  getCardBackside() {
    return this.db.collection('cards').doc('backside').valueChanges();
  }

  getBoards(){
    return this.db.collection('board').valueChanges();
  }

  uploadImage(fileBlob: File){
    const filePath = `/boards/${fileBlob.name}`;
    const task = this.storage.upload(filePath, fileBlob);
    return task;
  }
}