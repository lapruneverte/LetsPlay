import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { CardModel } from '../core/models/card.model';
import { PlayerModel } from '../core/models/player.model';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player: PlayerModel;
  @Output() playerChanged = new EventEmitter<PlayerModel>();

  cardBackside: CardModel;
  isMenuVisible: boolean = false;
  menuX: number;
  menuY: number;
  selectedIndex: number;
  lastTarget: any;
  zoomImageSrc: string;
  zoom: boolean;

  constructor(public firebaseService: FirebaseService, public utils: UtilsService) { }

  ngOnInit(): void {
    this.firebaseService.getCardBackside()
    .subscribe((result: CardModel) => {
      this.cardBackside = result;
    });
  }

  shiftCard(): void {
    if (this.player.deck.length > 0) {
      this.player.inHand.push(this.player.deck.shift());
      this.cardsChanged();
    }
  }

  cardsChanged() {
    this.playerChanged.emit(this.player);
  }

  showMenu(event: MouseEvent, i:number) {
    console.log(event);
    if (event.view.innerWidth - event.x < 170) {
      this.menuX = event.x - 160;
    } else {
      this.menuX = event.x;
    }

    this.menuY = event.y;
    this.isMenuVisible = true;
    this.selectedIndex = i;
    this.lastTarget = event.target;
  }

  onClickOutsideMenu(event?: MouseEvent) {
    if (event.target != this.lastTarget) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.isMenuVisible = false;
  }

  moveToDeck() {
    this.player.deck.push(this.player.inHand.splice(this.selectedIndex,1)[0]);
    this.cardsChanged();
    this.closeMenu();
  }

  moveToPreview() {
    this.player.preview.push(this.player.inHand.splice(this.selectedIndex,1)[0]);
    this.cardsChanged();
    this.closeMenu();
  }

  moveToHand(index: number) {
    this.player.inHand.push(this.player.preview.splice(index,1)[0]);
    this.cardsChanged();
  }

  play() {
    this.player.played.push(...this.player.preview);
    this.player.preview = [];
    this.cardsChanged();
  }

  shuffle() {
    if (this.player.deck.length == 0 && this.player.played.length > 0) {
      this.player.deck = this.utils.shuffleArray(this.player.played);
      this.player.played = [];
      this.cardsChanged();
    }
  }

  zoomImage() {
    this.zoom = true;
    this.zoomImageSrc = this.player.inHand[this.selectedIndex].link;
    this.closeMenu();
  }

  closeZoom() {
    this.zoom = false;
  }
}
