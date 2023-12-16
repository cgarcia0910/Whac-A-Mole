import { Injectable } from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";
import { ABoardManagerService } from "./ABoardManager.service";

@Injectable({
    providedIn: 'root'
}
)
export class EasyBoardManagerService extends ABoardManagerService {
    private initialBoardStatus = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
    boardStatus = new BehaviorSubject(JSON.parse(JSON.stringify(this.initialBoardStatus)));
    score = new BehaviorSubject<number>(0);
    interval = 1000;
    start() {
        timer(0,this.interval).subscribe(tick => {
            this.tick();
        });
    }
    stop() {}
    tick() {
        // reset boardStatus
        const nextBoardStatus = JSON.parse(JSON.stringify(this.initialBoardStatus));
        nextBoardStatus[Math.ceil(Math.random() * 9) - 1] = {img: '/assets/images/mole.png', points: 30};
        this.boardStatus.next(nextBoardStatus);
    }
    clickAction(content: {action: string, value: any}) {
        const {action = undefined, value = undefined} = content || {};
        switch(action) {
            case 'click-item':
                this.boardStatus.next(JSON.parse(JSON.stringify(this.initialBoardStatus)));
                this.score.next(this.score.getValue() + value);
                break;
        }
    }
    gameOver$= new BehaviorSubject<boolean>(false);
}