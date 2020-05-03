import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { RoomComponent } from './room/room.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { v4 } from 'uuid';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { PlayerComponent } from './player/player.component';
import { RoomListComponent } from './room-list/room-list.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { HallComponent } from './hall/hall.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    RoomComponent,
    PlayerComponent,
    RoomListComponent,
    NewRoomComponent,
    JoinRoomComponent,
    HallComponent,
    NewPlayerComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    DragDropModule,
    ClickOutsideModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }