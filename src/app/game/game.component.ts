import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BoardModel } from '../core/models/board.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

gameId: string;
boardGame: BoardModel;
isDataLoaded: boolean = false;

constructor(
public firebaseService: FirebaseService,
private router: Router,
private route: ActivatedRoute
) { }

ngOnInit() {
  this.route.params.subscribe( params => {
    this.gameId = params.id;
    this.getData(params.id);
  });
}

getData(id: string){
  this.firebaseService.getBoard(id)
  .subscribe((result: BoardModel) => {
    this.boardGame = result;
    this.isDataLoaded = true;
  })
}

}