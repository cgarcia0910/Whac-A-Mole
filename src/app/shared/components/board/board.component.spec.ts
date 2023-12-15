import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardComponent, CommonModule]
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render as many tiles as be defined in boardItems input property', ()=> {
    component.boardItems = [undefined, undefined];
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelectorAll('.board_item');
    expect(board.length).toBe(2);
  });
  it('should render an empty div when an item of boardItem is undefined', () => {
    component.boardItems = [undefined,  {img: 'https://picsum.photos/110', points: 30}];
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelectorAll('.board_item');
    expect(board.item(0).tagName).toBe('DIV')
  });
  it('should render an img when an item of boardItem is an object with the structure {img: string, points: number}', () => {
    component.boardItems = [{img: 'https://picsum.photos/110', points: 30}];
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelectorAll('.board_item');
    expect(board.item(0).tagName).toBe('IMG')
  });
  it('should emmit an event {action: "click-item", value: 30} in Emitter output when click in the image', ()=> {
    const emitterSpy = spyOn(component.Emitter, 'emit');
    component.boardItems = [{img: 'https://picsum.photos/110', points: 30}];
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelectorAll('.board_item');
    board.item(0).click();
    expect(emitterSpy).toHaveBeenCalledWith({action: 'click-item', value: 30});
  });
  it('should emmit an event {action: "click-outside", value: undefined} in Emitter output when click in the image', ()=> {
    const emitterSpy = spyOn(component.Emitter, 'emit');
    component.boardItems = [undefined];
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelectorAll('.board_item');
    board.item(0).click();
    expect(emitterSpy).toHaveBeenCalledWith({action: 'click-outside', value: undefined});
  });
});
