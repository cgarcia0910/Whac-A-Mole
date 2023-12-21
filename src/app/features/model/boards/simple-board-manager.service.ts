import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, timer } from "rxjs";
import { ABoardManagerService } from "../ABoardManager.service";

@Injectable({
    providedIn: 'root'
}
)
export abstract class SimpleBoardManagerService extends ABoardManagerService {
    protected subscription: Subscription | undefined = undefined;
    private initialBoardStatus = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
    boardStatus = new BehaviorSubject(JSON.parse(JSON.stringify(this.initialBoardStatus)));
    protected moleImgRoute: string = '';
    protected hitScore: number = 0;
    score = new BehaviorSubject<number>(0);
    // abstract start()
    // interval = 1000;
    // start() {
    //     this.subscription = timer(0,this.interval).subscribe(tick => {
    //         this.tick();
    //     });
    // }
    stop() {
        this.subscription?.unsubscribe();
        this.boardStatus.next(this.initialBoardStatus);
        this.score.next(0);
    }
    tick() {
        // reset boardStatus
        const nextBoardStatus = JSON.parse(JSON.stringify(this.initialBoardStatus));
        nextBoardStatus[Math.ceil(Math.random() * 9) - 1] = {img: this.moleImgRoute, points: this.hitScore};
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