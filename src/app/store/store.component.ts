import { Component, OnInit, Input } from '@angular/core';
import { RoomModel } from '../core/models/room.model';
import { CardModel } from '../core/models/card.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})

export class StoreComponent implements OnInit {
  @Input() room: RoomModel;

  constructor() { }

  ngOnInit(): void {
  }

  putCardInPlayed(card: CardModel) {
    let playerId = sessionStorage.getItem('playerId');
    this.room.players.find( p => p.playerId === playerId).played.unshift(card);
  }

  updateData($event,i) {
    console.log($event);
  }

}
