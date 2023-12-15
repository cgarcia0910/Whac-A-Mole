import { Component } from '@angular/core';
import { BoardComponent as SharedBoardComponent } from '../../shared/components/board/board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [SharedBoardComponent]
})
export class BoardComponent {
  boardItems = [undefined, undefined, undefined, undefined, {img: 'https://picsum.photos/110', points: 30},undefined,undefined,undefined,undefined];
  boardActions(content: {action: string, value: any}) {
    console.log(content);
  }
}
