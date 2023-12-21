import { Component, OnInit } from '@angular/core';
import { BoardComponent as SharedBoardComponent } from '../../shared/components/board/board.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BoardManagerFactoryService } from '../model/board-manager-factory.service';
import { ABoardManagerService } from '../model/ABoardManager.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  standalone: true,
  imports: [SharedBoardComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class BoardComponent implements OnInit {
  boardItems = [];
  playerName = this.activatedRoute.snapshot.params['name'];
  unsubscribe: Subject<boolean> = new Subject();
  boardSelectOptions = [
    {text: 'Easy', value: 'easy'},
    {text: 'Medium', value: 'medium'},
    {text: 'Hard', value: 'hard'},
  ];
  boardSelectControl: FormControl = new FormControl('');
  board: any;
  isRuning = false;
  constructor(private activatedRoute: ActivatedRoute, public boardManagerFactory: BoardManagerFactoryService) {}
  ngOnInit(): void {
    this.boardSelectControl.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(level => {
      console.log(level)
      if(this.board) {
        this.board.stop();
      }
      this.isRuning = false
      this.board = this.boardManagerFactory.getBoard(level);
      this.board?.boardStatus.subscribe((status: any) => this.boardItems = status as any);
    });
    this.boardSelectControl.setValue('easy');
  }
  boardActions(content: {action: string, value: any}) {
    const {action = undefined, value = undefined} = content || {};
    switch(action) {
      case 'start-game':
        this.isRuning = true;
        this.board?.start();
      break;
      case 'stop-game':
        this.isRuning = false;
        this.board?.stop();
      break;
      default: 
        this.board?.clickAction(content);
    }
  }
}
