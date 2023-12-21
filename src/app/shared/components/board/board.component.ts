import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-board',
  templateUrl: './board.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class BoardComponent {
  @Input() boardItems: ({img: string, points: number} | undefined)[] = [];
  @Output() Emitter: EventEmitter<{action: string, value: any}> = new EventEmitter();
  doAction(content: {action: string, value: any}) {
    this.Emitter.emit(content);
  }
}
