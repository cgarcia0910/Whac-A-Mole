import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, timer } from "rxjs";
import { ABoardManagerService } from "../ABoardManager.service";
import { SimpleBoardManagerService } from "./simple-board-manager.service";

@Injectable({
    providedIn: 'root'
}
)
export class HardBoardManagerService extends SimpleBoardManagerService {
    interval = 500;
    protected override moleImgRoute: string = '/assets/images/mole.png';
    protected override hitScore: number = 30;
    override start(): void {
        this.subscription = timer(0,this.interval).subscribe(tick => {
            this.tick();
        });
    }
}