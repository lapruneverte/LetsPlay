import { Component, OnInit, Input } from '@angular/core';
import { RoomModel } from '../core/models/room.model';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss']
})
export class PlayerStatusComponent implements OnInit {
  @Input() room: RoomModel;

  zoom: boolean;
  zoomImageSrc: string;
  zoomX: number;
  zoomY: number;
  
  constructor() { }

  ngOnInit(): void {
  }

  zoomImage(event: MouseEvent, playerIndex: number, cardIndex: number) {
    this.zoom = true;
    this.zoomImageSrc = this.room.players[playerIndex].preview[cardIndex].link;
    if (event.view.innerWidth - event.x < 170) {
      this.zoomX = event.x - 160;
    } else {
      this.zoomX = event.x;
    }

    this.zoomY = event.y - 200;
  }

}
