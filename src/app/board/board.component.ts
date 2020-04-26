import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { BoardModel } from '../core/models/board.model';

@Component({
    selector: 'app-board-component',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
  })
export class BoardComponent implements OnInit {

  boardGame: BoardModel = new BoardModel();
  constructor(
      public firebaseService: FirebaseService,
  ) { }
  
  ngOnInit() {
      this.getData();
  }

  getData(){
    this.firebaseService.getBoard('Test Game 1')
    .subscribe((result: any) => {
      if (result.length == 1) {
        this.boardGame.id = result[0].id;
        this.boardGame.name = result[0].name;
        this.boardGame.link = result[0].link;
      } else {
        console.log("Board Component: found 0 or more than 1 board games with that name...");
      }
    })
  }
}