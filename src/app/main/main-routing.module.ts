import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { HallComponent } from './hall/hall.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'hall/:id', component: HallComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }