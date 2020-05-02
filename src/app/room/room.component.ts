import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { BoardModel } from '../core/models/board.model';

@Component({
  selector: 'app-room-component',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rooms: BoardModel[];

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.firebaseService.getBoards().subscribe( (result: BoardModel[]) => {
      this.rooms = result;
    });
  }

  getPlayerNames(i: number) {
    if (this.rooms[i].players) {
      return this.rooms[i].players.map(player => player.name).join(",");
    }
    return '';
  }

}
