import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { CardModel } from '../../../core/models/card.model';
import { PlayerModel } from '../../../core/models/player.model';
import { UtilsService } from '../../../services/utils.service';
import { ZoomModel } from '../../../core/models/zoom.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player: PlayerModel;
  @Output() playerChanged = new EventEmitter<PlayerModel>();
  @Output() onZoom = new EventEmitter<ZoomModel>();

  isMenuVisible: boolean = false;
  menuX: number;
  menuY: number;
  selectedCardIndex: number;
  lastTarget: any;

  constructor(public firebaseService: FirebaseService, public utils: UtilsService) { }

  ngOnInit(): void {
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
    if (event.view.innerWidth - event.x < 170) {
      this.menuX = event.x - 160;
    } else {
      this.menuX = event.x;
    }

    this.menuY = event.y;
    this.isMenuVisible = true;
    this.selectedCardIndex = i;
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

  putCardInHand(card: CardModel) {
    this.player.inHand.push(card);
    this.cardsChanged();
  }

  moveFromInHandToDeck() {
    this.player.deck.push(this.player.inHand.splice(this.selectedCardIndex,1)[0]);
    this.cardsChanged();
    this.closeMenu();
  }

  moveFromHandToPreview() {
    let card = this.player.inHand.splice(this.selectedCardIndex,1)[0];
    card.toDelete = false;
    this.player.preview.push(card);
    this.cardsChanged();
    this.closeMenu();
  }

  moveFromHandToPreviewAndDelete() {
    let card = this.player.inHand.splice(this.selectedCardIndex,1)[0];
    card.toDelete = true;
    this.player.preview.push(card);
    this.cardsChanged();
    this.closeMenu();
  }

  moveFromPreviewToHand(index: number) {
    let card = this.player.preview.splice(index,1)[0];
    card.toDelete = false;
    this.player.inHand.push(card);
    this.cardsChanged();
  }

  play() {
    if (this.player.preview && this.player.preview.length > 0) {
      this.player.played.unshift(...this.player.preview.filter(item => item.toDelete == false));
      this.player.preview = [];
      this.cardsChanged();
    }
  }

  shuffle() {
    if (this.player.deck.length == 0 && this.player.played.length > 0) {
      this.player.deck = this.utils.shuffleArray(this.player.played);
      this.player.played = [];
      this.cardsChanged();
    }
  }

  zoomImage() {
    this.closeMenu();
    let zoomData = new ZoomModel();
    zoomData.x = this.menuX;
    zoomData.y = this.menuY;
    zoomData.src = this.player.inHand[this.selectedCardIndex].link;
    this.onZoom.emit(zoomData);
  }

  addBlockade() {
    this.player.blockades++;
    this.cardsChanged();
  }

  subtractBlockade() {
    this.player.blockades--;
    this.cardsChanged();
  }
}
