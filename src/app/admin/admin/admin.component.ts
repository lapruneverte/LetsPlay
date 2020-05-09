import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ElDoradoAssetsModel } from '../models/edit-assets.model';
import { CardModel } from 'src/app/core/models/card.model';
import { StoreCardModel } from 'src/app/core/models/store-card.model';
import { TokenModel } from 'src/app/core/models/token.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  assets: ElDoradoAssetsModel;
  loaded: boolean = false;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getAsset('El Dorado').then(result => {
      this.assets = new ElDoradoAssetsModel();
      this.assets.cards = result.data().cards;
      this.assets.tokens = result.data().tokens;
      this.loaded = true;
    });
  }

  copyPlayerCard(card:CardModel) {
    let cardCopy = new CardModel();
    cardCopy.cardId = card.cardId;
    cardCopy.link = card.link;
    this.assets.cards.player.push(cardCopy);
    this.updateCardAssets();
  }

  copyStoreCard(card:StoreCardModel) {
    let cardCopy = new StoreCardModel();
    cardCopy.card = card.card;
    cardCopy.position = card.position;
    cardCopy.quantity = card.quantity;

    this.assets.cards.store.push(cardCopy);
    this.updateCardAssets();
  }

  copyToken(token:TokenModel) {
    let tokenCopy = new TokenModel();
    tokenCopy.color = token.color;
    tokenCopy.link = token.link;
    tokenCopy.position = token.position;

    this.assets.tokens.push(tokenCopy);
    this.updateTokenAssets();
  }

  updateCardAssets() {
    this.firebaseService.updateCardAssets('El Dorado', this.assets);
  }

  updateTokenAssets() {
    this.firebaseService.updateTokenAssets('El Dorado', this.assets);
  }

  deletePlayerCard(i: number) {
    this.assets.cards.player.splice(i, 1);
    this.updateCardAssets();
  }

  deleteStoreCard(i: number) {
    this.assets.cards.store.splice(i, 1);
    this.updateCardAssets();
  }

  deleteToken(i: number) {
    this.assets.tokens.splice(i, 1);
    this.updateTokenAssets();
  }
}
