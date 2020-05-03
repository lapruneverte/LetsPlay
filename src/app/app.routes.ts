import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RoomComponent } from './room/room.component';
import { HallComponent } from './hall/hall.component';

export const rootRouterConfig: Routes = [
  { path: '', component: RoomComponent },
  { path: 'hall/:id', component: HallComponent },
  { path: 'game/:id', component: GameComponent }
];