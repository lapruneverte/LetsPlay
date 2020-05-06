import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() dragEnd: EventEmitter<any> = new EventEmitter();
  @Input() cardImage: string;
  @Input() clickable: boolean = true;
  @Input() draggable: boolean = false;
  @Input() position: {
    x: number,
    y: number
  };

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: MouseEvent) {
    if (this.clickable) {
      this.click.emit(event);
    }
  }

  onDragEnd(event) {
    this.dragEnd.emit(event);
  }
}
