import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { v4 } from 'uuid';
import { MainModule } from './main/main.module';
import { ElDoradoModule } from './games/eldorado/eldorado.module'

import { FirebaseService } from './services/firebase.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminModule } from './admin/admin.module';
import { ConfirmDialogComponent } from './core/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MainModule,
    ElDoradoModule,
    AdminModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }