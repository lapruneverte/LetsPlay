import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'game/:id', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElDoradoRoutingModule { }