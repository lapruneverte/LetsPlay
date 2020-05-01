import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { BoardModel } from '../core/models/board.model';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board-component',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
  })
export class BoardComponent implements OnInit {

  boardGame: BoardModel = new BoardModel();
  imgWidth: number;
  imgHeight: number;
  tokens: any[];
  constructor(
      public firebaseService: FirebaseService,
  ) { }
  
  ngOnInit() {
      this.getData();
  }

  getData(){
    this.firebaseService.getBoard('Test Game 2')
    .subscribe((result: any) => {
      if (result.length == 1) {
        this.boardGame.id = result[0].id;
        this.boardGame.name = result[0].name;
        this.boardGame.link = result[0].link;
        this.tokens = result[0].tokens;

        let self = this;
        let img = new Image();
        img.onload = function(event:Event){
          let loadedImage: any = event.target;
          self.imgWidth = loadedImage.width;
          self.imgHeight = loadedImage.height;
        };
        img.src = result[0].link;
      } else {
        console.log("Board Component: found 0 or more than 1 board games with that name...");
      }
    })
  }
}