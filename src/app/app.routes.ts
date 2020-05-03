import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RoomListComponent } from './room-list/room-list.component';
import { HallComponent } from './hall/hall.component';

export const rootRouterConfig: Routes = [
  { path: '', component: RoomListComponent },
  { path: 'hall/:id', component: HallComponent },
  { path: 'game/:id', component: GameComponent }
];