import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RoomModel } from '../core/models/room.model';
import { CardModel } from '../core/models/card.model';
import { FirebaseService } from '../services/firebase.service';
import { ZoomModel } from '../core/models/zoom.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})

export class StoreComponent implements OnInit {
  @Input() room: RoomModel;
  @Output() onZoom = new EventEmitter<ZoomModel>();

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  putCardInPlayed(card: CardModel) {
    let playerId = sessionStorage.getItem('playerId');
    this.room.players.find( p => p.playerId === playerId).played.unshift(card);
  }

  updateData($event,i) {
    this.room.store[i].position.x = this.room.store[i].position.x + $event.distance.x;
    this.room.store[i].position.y = this.room.store[i].position.y + $event.distance.y;
    this.firebaseService.updateStore(this.room.id, this.room.store);
  }

  zoomImage(event: MouseEvent, cardIndex: number) {
    let zoomData = new ZoomModel();

    zoomData.x = event.x;
    zoomData.y = event.y;
    zoomData.src = this.room.store[cardIndex].card.link;

    this.onZoom.emit(zoomData);
  }

}
