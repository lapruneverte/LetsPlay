import { Component, OnInit, Input } from '@angular/core';
import { RoomModel } from '../core/models/room.model';

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

}
