import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent }
];