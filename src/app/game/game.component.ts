import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { BoardModel } from '../core/models/board.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

boardGame: BoardModel = new BoardModel();
isDataLoaded: boolean = false;

constructor(
public firebaseService: FirebaseService,
private router: Router
) { }

ngOnInit() {
    this.getData();
}

getData(){
  this.firebaseService.getBoard('Test Game 2')
  .subscribe((result: any) => {
    if (result.length == 1) {
      this.boardGame.name = result[0].name;
      this.boardGame.link = result[0].link;
      this.boardGame.tokens = result[0].tokens;
      this.boardGame.players = result[0].players;
      this.isDataLoaded = true;
    } else {
      console.log("Board Component: found 0 or more than 1 board games with that name...");
    }
  })
}

}