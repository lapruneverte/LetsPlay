import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HallComponent } from './hall/hall.component';
import { MainRoutingModule } from './main-routing.module';
import { NewPlayerComponent } from './new-player/new-player.component';
import { PasswordModalComponent } from './password-modal/password-modal.component';
import { RoomListComponent } from './room-list/room-list.component';
import { NewRoomComponent } from './new-room/new-room.component';



@NgModule({
  declarations: [
    HallComponent,
    NewPlayerComponent,
    PasswordModalComponent,
    RoomListComponent,
    NewRoomComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RoomListComponent
  ]
})
export class MainModule { }
