// import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";


export abstract class ABoardManagerService {
    abstract boardStatus: BehaviorSubject<({img: string, points: number} | undefined)[]>
    abstract score: BehaviorSubject<number>;
    abstract start():void;
    abstract stop(): void;
    abstract clickAction(content: {action: string, value: any}): void;
    abstract gameOver$: BehaviorSubject<boolean>;
}