import { EasyBoardManagerService } from "./easy-board-manager.service";

describe('Simple Board Service', () => {
    let service: EasyBoardManagerService;
    let scoreSpy: jasmine.Spy;
    let boardStatusSpy: jasmine.Spy;
    beforeEach(() => {
        service = new EasyBoardManagerService();
        scoreSpy = spyOn(service.score, 'next');
        boardStatusSpy = spyOn(service.boardStatus, 'next');
    });
    it('should reset the board when stop the game', () => {
        spyOn(Math, 'random').and.returnValues(0.1);
        service.tick();
        service.stop();
        expect(boardStatusSpy.calls.argsFor(1)).toEqual([[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]]);
    })
    it('should reset score when stop the game', () => {
        spyOn(Math, 'random').and.returnValues(0.1);
        service.tick();
        service.stop();
        expect(scoreSpy).toHaveBeenCalledWith(0);
    })
  });