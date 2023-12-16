import { Injectable, Injector } from "@angular/core";
import { ABoardManagerService } from "./ABoardManager.service";
import { EasyBoardManagerService } from "./easy-board-manager.service";

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
            default:
                console.error('incorrect board');
        }
        return undefined;
    }
}