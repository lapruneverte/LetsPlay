import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { RoomModel } from '../../../core/models/room.model';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board-component',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
  })
export class BoardComponent implements OnInit {

  imgWidth: number;
  imgHeight: number;

  @Input() room: RoomModel;
  
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
      img.src = this.room.link;
  }

  updateData($event: CdkDragEnd, i: number) {
    this.room.tokens[i].position.x = this.room.tokens[i].position.x + $event.distance.x;
    this.room.tokens[i].position.y = this.room.tokens[i].position.y + $event.distance.y;
    this.firebaseService.updateTokens(this.room.id, this.room.tokens);
  }

  getImageUri(){
    return this.room.link.replace(/\(/g, '%28').replace(/\)/g, '%29');
  }
}