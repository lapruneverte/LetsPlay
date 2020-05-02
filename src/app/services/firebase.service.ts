import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { BoardComponent } from '../board/board.component';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  downloadURL: any;

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {}

  getBoard(name: string){
    return this.db.collection('board',ref => ref.where('name', '==', name)).valueChanges();
  }

  updateBoard(board: any){
    return this.db.collection('board').doc('dT4aJTEaxtPb0TLeiVR6').set(JSON.parse(JSON.stringify(board)));
  }

  createBoard(board: any) {
    return this.db.collection('board').add(JSON.parse(JSON.stringify(board)));
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