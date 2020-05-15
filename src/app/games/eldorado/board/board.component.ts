import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { RoomModel } from '../../../core/models/room.model';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board-component',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
  })
export class BoardComponent implements OnInit, AfterViewChecked {
  @ViewChild('boardViewport') private boardViewport: ElementRef;

  imgWidth: number;
  imgHeight: number;
  private scrollTop = 0;
  private scrollLeft = 0;

  @Input() room: RoomModel;
  
  constructor(
      public firebaseService: FirebaseService,
  ) { }
  
  ngAfterViewChecked() {
    this.boardViewport.nativeElement.scrollTop = this.scrollTop;
    this.boardViewport.nativeElement.scrollLeft = this.scrollLeft;
  }

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
    this.firebaseService.updateToken(this.room.id, this.room.tokens[i]);
  }

  getImageUri(){
    return this.room.link.replace(/\(/g, '%28').replace(/\)/g, '%29');
  }

  onScroll(event) {
    this.scrollTop = event.srcElement.scrollTop;
    this.scrollLeft = event.srcElement.scrollLeft;
  }
}