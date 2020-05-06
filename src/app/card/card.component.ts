import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() cardclicked: EventEmitter<MouseEvent> = new EventEmitter();
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
      this.cardclicked.emit(event);
    }
  }

  onDragEnd(event) {
    this.dragEnd.emit(event);
  }
}
