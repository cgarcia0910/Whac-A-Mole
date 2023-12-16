import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { ActivatedRoute } from '@angular/router';
import { EasyBoardManagerService } from '../model/easy-board-manager.service';
import { BehaviorSubject } from 'rxjs';
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
  boardActions() {},
}
describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        {provide: ActivatedRoute, useValue: ActivatedRouteStub},
        {provide: EasyBoardManagerService, useValue: EasyBoardManagerServiceStub},
      ]
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
