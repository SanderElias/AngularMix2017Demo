import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/shareReplay';

export interface Button {
    title: string;
}
@Injectable()
export class ButtonbarService {
    private buttonSource = new Subject<Button>();

    public buttons$ = this.buttonSource
        .map(b => [b])
        .startWith([])
        .scan((acc, newButton) => acc.concat(newButton))
        .shareReplay(1);

    private buttonsMap = new Map<string, Subject<MouseEvent>>();

    addButton(button: Button): Observable<MouseEvent> {
        return this.buttons$.switchMap(buttonList => {
            if (this.buttonsMap.has(button.title)) {
                return this.buttonsMap.get(button.title).asObservable();
            }
            const sj = new Subject<MouseEvent>();
            this.buttonsMap.set(button.title, sj);
            this.buttonSource.next(button);
            return sj.asObservable();
        });
    }

    activate(button: Button, evt) {
        fromPromise(this.router.navigate(['/']))
        .delay(0) // wait for view to draw
        .subscribe(() => this.buttonsMap.get(button.title).next(evt));
    }

    constructor(private router: Router) {
        this.buttons$.subscribe();
    }
}
