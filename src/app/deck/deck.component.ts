import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardModel } from '../core/models/card.model';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  @Output() onPick: EventEmitter<CardModel> = new EventEmitter();
  @Input() cards: CardModel[];
  @Input() enabled: boolean = true;
  @Input() reverseImage: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  pickCard() {
    if (this.enabled && this.cards.length > 0) {
      this.onPick.emit(this.cards.shift());
    }
  }
}
