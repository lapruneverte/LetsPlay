import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoardComponent } from '../board/board.component';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getBoard(name: string){
    return this.db.collection('board',ref => ref.where('name', '==', name)).valueChanges();
  }

  updateBoard(board: any){
    return this.db.collection('board').doc('dT4aJTEaxtPb0TLeiVR6').set(Object.assign({}, board));
  }

  getCardBackside() {
    return this.db.collection('cards').doc('backside').valueChanges();
  }

  getBoards(){
    return this.db.collection('board').valueChanges();
  }
}