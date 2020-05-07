import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RoomModel } from '../core/models/room.model';
import { ZoomModel } from '../core/models/zoom.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss']
})
export class PlayerStatusComponent implements OnInit {
  @Input() room: RoomModel;
  @Output() onZoom = new EventEmitter<ZoomModel>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  zoomImage(event: MouseEvent, playerIndex: number, cardIndex: number) {
    let zoomData = new ZoomModel();

    if (event.view.innerWidth - event.x < 170) {
      zoomData.x = event.x - 160;
    } else {
      zoomData.x = event.x;
    }

    zoomData.y = event.y - 200;
    zoomData.src = this.room.players[playerIndex].preview[cardIndex].link;

    this.onZoom.emit(zoomData);
  }
}
