import { Component, OnInit, Input } from '@angular/core';
import { RoomModel } from '../core/models/room.model';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss']
})
export class PlayerStatusComponent implements OnInit {
  @Input() room: RoomModel;
  
  constructor() { }

  ngOnInit(): void {
  }

}
