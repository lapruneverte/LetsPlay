import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();
  @Input() cardImage: string;
  @Input() clickable: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: MouseEvent) {
    if (this.clickable) {
      this.click.emit(event);
    }
  }
}
