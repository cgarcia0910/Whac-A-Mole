import { Injectable, Injector } from "@angular/core";
import { ABoardManagerService } from "./ABoardManager.service";
import { EasyBoardManagerService } from "./boards/easy-board-manager.service";
import { MediumBoardManagerService } from "./boards/medium-board-manager.service";
import { HardBoardManagerService } from "./boards/hard-board-manager.service";

@Injectable({
    providedIn: 'root'
})
export class BoardManagerFactoryService {
    constructor(private injector: Injector) {

    }
    getBoard(board: string): ABoardManagerService | undefined {
        switch(board) {
            case 'easy':
                return this.injector.get(EasyBoardManagerService);
            case 'medium':
                return this.injector.get(MediumBoardManagerService);
            case 'hard':
                return this.injector.get(HardBoardManagerService);
            default:
                console.error('incorrect board');
        }
        return undefined;
    }
}