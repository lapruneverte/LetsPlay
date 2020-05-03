import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { CardModel } from '../core/models/card.model';
import { PlayerModel } from '../core/models/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player: PlayerModel;
  @Output() playerChanged = new EventEmitter<PlayerModel>();

  cardBackside: CardModel;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getCardBackside()
    .subscribe((result: CardModel) => {
      this.cardBackside = result;
    });
  }

  popCard(): void {
    if (this.player.deck.length > 0) {
      this.player.inHand.push(this.player.deck.pop());
      this.cardsChanged();
    }
  }

  cardsChanged() {
    this.playerChanged.emit(this.player);
  }

}
