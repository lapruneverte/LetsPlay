import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { HallComponent } from './hall/hall.component';
import { NgModule } from '@angular/core';
import { RoomListComponent } from './room-list/room-list.component';

const routes: Routes = [
  { path: 'main', component: RoomListComponent },
    { path: 'hall/:id', component: HallComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }