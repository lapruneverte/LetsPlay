import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { BoardModel } from '../core/models/board.model';
import { TokenModel } from '../core/models/token.model';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board-component',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
  })
export class BoardComponent implements OnInit {

  imgWidth: number;
  imgHeight: number;

  @Input() boardGame: BoardModel;
  
  constructor(
      public firebaseService: FirebaseService,
  ) { }
  
  ngOnInit() {
      let self = this;
      let img = new Image();
      img.onload = function(event:Event){
        let loadedImage: any = event.target;
        self.imgWidth = loadedImage.width;
        self.imgHeight = loadedImage.height;
      };
      img.src = this.boardGame.link;
  }

  updateData($event: CdkDragEnd, i: number) {
    this.boardGame.tokens[i].position.x = this.boardGame.tokens[i].position.x + $event.distance.x;
    this.boardGame.tokens[i].position.y = this.boardGame.tokens[i].position.y + $event.distance.y;
    this.firebaseService.updateBoardById(this.boardGame)
    .then(result => {
      //console.log("update ", result);
    });
   }
}