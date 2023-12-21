import { Injectable, Injector } from "@angular/core";
import { BoardManagerFactoryService } from "./board-manager-factory.service";
import { EasyBoardManagerService } from "./boards/easy-board-manager.service";
import { MediumBoardManagerService } from "./boards/medium-board-manager.service";
import { HardBoardManagerService } from "./boards/hard-board-manager.service";

// @Injectable()
// export class TestingWrapperService {
//     constructor(public boardManager: BoardManagerFactoryService) {}
// }
describe('Board Manager Factory Service', () => {
    let service: BoardManagerFactoryService;
    let boardStatusSpy: jasmine.Spy;
    let injector: Injector;
    let scoreSpy: jasmine.Spy;
    let consoleSpy: jasmine.Spy;
    beforeEach(() => {
        injector = Injector.create({providers: [
            {provide: EasyBoardManagerService, deps: []},
            {provide: MediumBoardManagerService, deps: []},
            {provide: HardBoardManagerService, deps: []},
        ]});
        consoleSpy = spyOn(console, 'error');
        service = new BoardManagerFactoryService(injector);
    });
    it('should return an instance of EasyBoardManagerService when ask for an easy board', (()=> {
        expect(service.getBoard('easy')).toBeInstanceOf(EasyBoardManagerService);
    }));
    it('should return an instance of MediumBoardManagerService when ask for a medium board', (()=> {
        expect(service.getBoard('medium')).toBeInstanceOf(MediumBoardManagerService);
    }));
    it('should return an instance of HardBoardManagerService when ask for a hard board', (()=> {
        expect(service.getBoard('hard')).toBeInstanceOf(HardBoardManagerService);
    }));
    it('should throw an exception if a non defined map is asked', () => {
        service.getBoard('not defined board');
        expect(consoleSpy).toHaveBeenCalledWith('incorrect board');
    })
});