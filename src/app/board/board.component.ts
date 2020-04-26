import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { BoardModel } from '../core/models/board.model';

@Component({
    selector: 'app-board-component',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
  })
export class BoardComponent implements OnInit {

  boardGame: BoardModel = new BoardModel();
  constructor(
      public firebaseService: FirebaseService,
      // private route: ActivatedRoute,
      // private fb: FormBuilder,
      // private router: Router,
      // public dialog: MatDialog
  ) { }
  
  ngOnInit() {
      this.getData();
  }

  getData(){
    this.firebaseService.getBoard('Test Game')
    .subscribe((result: any) => {
      this.boardGame.id = result[0].id;
      this.boardGame.name = result[0].name;
      this.boardGame.link = result[0].link;
    })
  }
}