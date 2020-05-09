import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule} from '@angular/material/tabs';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatCardModule } from '@angular/material/card';

import { CommonModule } from '@angular/common';
import { ElDoradoRoutingModule } from './eldorado-routing.module';
import { GameComponent } from './game/game.component';
import { ZoomComponent } from './zoom/zoom.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { DeckComponent } from './deck/deck.component';
import { PlayerComponent } from './player/player.component';
import { PlayerStatusComponent } from './player-status/player-status.component';
import { StoreComponent } from './store/store.component';



@NgModule({
  declarations: [
    GameComponent,
    ZoomComponent,
    BoardComponent,
    CardComponent,
    DeckComponent,
    PlayerComponent,
    PlayerStatusComponent,
    StoreComponent
  ],
  imports: [
    CommonModule,
    ElDoradoRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatTabsModule,
    DragDropModule,
    ClickOutsideModule,
    MatCardModule
  ]
})
export class ElDoradoModule { }
