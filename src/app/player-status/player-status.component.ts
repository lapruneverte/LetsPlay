import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RoomModel } from '../core/models/room.model';
import { ZoomModel } from '../core/models/zoom.model';
import { MatCardModule } from '@angular/material/card';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      transition(':increment', [style({ opacity: 0 }), animate('2000ms', style({ opacity: 1 }))]),
      transition(':decrement', [style({ opacity: 0 }), animate('2000ms', style({ opacity: 1 }))])
    ])
  ]
})
export class PlayerStatusComponent implements OnInit {
  @Input() room: RoomModel;
  @Output() onZoom = new EventEmitter<ZoomModel>();
  playerId: string;

  constructor() { }

  ngOnInit(): void {
    this.playerId = sessionStorage.getItem('playerId');
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

  roomPlayers() {
    return this.room.players.filter(player => player.playerId != this.playerId);
  }
}
