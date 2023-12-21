import { discardPeriodicTasks, fakeAsync, flush, tick } from "@angular/core/testing";
import { HardBoardManagerService } from "./hard-board-manager.service";

describe('Hard Board Service', () => {
    let service: HardBoardManagerService;
    let boardStatusSpy: jasmine.Spy;
    let scoreSpy: jasmine.Spy;
        beforeEach(() => {
        service = new HardBoardManagerService();
        scoreSpy = spyOn(service.score, 'next');
        boardStatusSpy = spyOn(service.boardStatus, 'next');
    });
    it('should call tick just when the game starts', fakeAsync(()=> {
        let tickSpy = spyOn(service, 'tick');
        service.start();
        tick();
        expect(tickSpy).toHaveBeenCalledTimes(1);
        discardPeriodicTasks();
    }));
    it('should call tick 500ms after start the game', fakeAsync(()=> {
        let tickSpy = spyOn(service, 'tick');
        service.start();
        tick(500);
        expect(tickSpy).toHaveBeenCalledTimes(2);
        discardPeriodicTasks();
    }));
    it('should emit a new board status with the first position filled', (() => {
        spyOn(Math, 'random').and.returnValues(0.1);
        service.tick();
        expect(boardStatusSpy).toHaveBeenCalledWith( [{ img: service['moleImgRoute'], points: service['hitScore'] }, null, null, null, null, null, null, null, null ]);
    }));
    it('should reset the board when click in the filled position of the board', () => {
        spyOn(Math, 'random').and.returnValues(0.1);
        service.tick();
        service.clickAction({action: 'click-item', value: 30});
        expect(boardStatusSpy).toHaveBeenCalledWith( [null, null, null, null, null, null, null, null, null ]);
    });
    it('should update the score when click in the filled position of the board', () => {
        spyOn(Math, 'random').and.returnValues(0.1);
        service.tick();
        service.clickAction({action: 'click-item', value: 30});
        expect(scoreSpy).toHaveBeenCalledWith(30);
    })
  });