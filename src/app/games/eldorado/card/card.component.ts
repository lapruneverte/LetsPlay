import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CardModel } from '../../../core/models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: CardModel;
  @Input() clickable: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }
}
