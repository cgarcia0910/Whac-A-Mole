import { Component, OnInit } from '@angular/core';
import { BoardComponent as SharedBoardComponent } from '../../shared/components/board/board.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EasyBoardManagerService } from '../model/easy-board-manager.service';
import { CommonModule } from '@angular/common';
import { BoardManagerFactoryService } from '../model/board-manager-factory.service';
import { ABoardManagerService } from '../model/ABoardManager.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [SharedBoardComponent, CommonModule]
})
export class BoardComponent implements OnInit {
  boardItems = [];
  playerName = this.activatedRoute.snapshot.params['name'];
  board: ABoardManagerService | undefined = undefined;
  constructor(private activatedRoute: ActivatedRoute, public boardManagerFactory: BoardManagerFactoryService) {}
  ngOnInit(): void {
    this.board = this.boardManagerFactory.getBoard('easy');
    this.board?.boardStatus.subscribe(status => this.boardItems = status as any);
  }
  boardActions(content: {action: string, value: any}) {
    const {action = undefined, value = undefined} = content || {};
    switch(action) {
      case 'start-game':
        this.board?.start()
      break;
      default: 
        this.board?.clickAction(content);
    }
  }
}
