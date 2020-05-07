import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() dragEnd: EventEmitter<any> = new EventEmitter();
  @Output() dragStart: EventEmitter<any> = new EventEmitter();
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

  onDragEnd(event) {
    this.dragEnd.emit(event);
  }

  onDragStart(event) {
    this.dragStart.emit(event);
  }
}
