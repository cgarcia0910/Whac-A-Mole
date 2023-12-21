import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { ActivatedRoute } from '@angular/router';
import { EasyBoardManagerService } from '../model/boards/easy-board-manager.service';
import { BehaviorSubject } from 'rxjs';
import { BoardManagerFactoryService } from '../model/board-manager-factory.service';
export const ActivatedRouteStub = {
  snapshot: {
    params: {
      name: 'test'
    }
  }
};
export const EasyBoardManagerServiceStub = {
  boardStatus: new BehaviorSubject([]),
  start() {},
  stop() {},
  clickAction() {},
  boardActions() {},
}
export const BoardManagerFactoryServiceStub = {
  getBoard(level:string) {
    return EasyBoardManagerServiceStub;
  }
}
describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        {provide: ActivatedRoute, useValue: ActivatedRouteStub},
        // {provide: EasyBoardManagerService, useValue: EasyBoardManagerServiceStub},
        {provide: BoardManagerFactoryService, useValue: BoardManagerFactoryServiceStub}
      ]
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set is runing true when click start button', ()=> {
    const startStopButton = fixture.debugElement.nativeElement.querySelector('#start-stop-button');
    startStopButton.click();
    fixture.detectChanges();
    expect(component.isRuning).toBe(true);
  });
  it('should call board start when click start button', ()=> {
    const startStopButton = fixture.debugElement.nativeElement.querySelector('#start-stop-button');
    const boardStartSpy = spyOn(component.board, 'start');
    startStopButton.click();
    fixture.detectChanges();
    expect(boardStartSpy).toHaveBeenCalled();
  });
  it('should set is runing false when click stop button', ()=> {
    const startStopButton = fixture.debugElement.nativeElement.querySelector('#start-stop-button');
    startStopButton.click();
    fixture.detectChanges();
    startStopButton.click();
    fixture.detectChanges();
    expect(component.isRuning).toBe(false);
  });
  it('should call board stop when click stop button', ()=> {
    const startStopButton = fixture.debugElement.nativeElement.querySelector('#start-stop-button');
    const boardStopSpy = spyOn(component.board, 'stop');
    startStopButton.click();
    fixture.detectChanges();
    startStopButton.click();
    fixture.detectChanges();
    expect(boardStopSpy).toHaveBeenCalled();
  });
  it('should call board click action when the action is not start or stop', () => {
    const clickActionSpy = spyOn(component.board, 'clickAction');
    component.boardActions({action: 'testAction', value: undefined});
    expect(clickActionSpy).toHaveBeenCalled();
  });
  it('should stop the game when the level is changed', () => {
    const boardStopSpy = spyOn(component.board, 'stop');
    component.boardSelectControl.setValue('medium');
    expect(boardStopSpy).toHaveBeenCalled();
  })
});
