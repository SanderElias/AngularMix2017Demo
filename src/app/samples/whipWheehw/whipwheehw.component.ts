import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    SkipSelf
} from '@angular/core';
import { TimeService } from 'app/time.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { FormGroup, FormControl } from '@angular/forms';

let counter = 0;
const log = (context: string) => (...args) =>
    console.log(++counter, context, ...args);

@Component({
    selector: 'whip-wheehw',
    template: `
    <form [formGroup]='operator'>
        <label>
            <input formControlName="kind" type="radio" value="none" checked>None
        </label>
        <label>
            <input formControlName="kind" type="radio" value="share">share
        </label>
        <label>
            <input formControlName="kind" type="radio" value="shareReplay">shareReplay
        </label>
    </form>

    <div *ngFor="let item of whipwheehws$ | async" class="main">
        <input type="range" [value]="item|async" min=0 [max]="STEPS-1">
    </div>
    `
})
export class WhipwheehwComponent implements OnInit {
    STEPS = 40;
    toggle = false;

    whipwheehw$ = Observable.timer(0, 2000)
        .map(n => n % 2 === 0)
        // .do(log('outer'))
        .switchMap(
            n =>
                Observable.timer(500, 1000 / this.STEPS)
                    .map(i => (n ? i : this.STEPS - 1 - i))
                    .take(this.STEPS)
            // .do(log('inner'))
        );

    whipwheehws$: Observable<Observable<number>[]>;

    operator = new FormGroup({
        kind: new FormControl('none')
    });

    useWhatOperator$ = this.operator.valueChanges
        .startWith({ kind: 'none' })
        .map(o => o.kind)
        .map(kind => {
            switch (kind) {
                case 'none':
                    return this.whipwheehw$;
                case 'share':
                    return this.whipwheehw$.share();
                case 'shareReplay':
                    return this.whipwheehw$.shareReplay(1);
            }
        });

    constructor() {}

    ngOnInit() {
        this.startIt();
    }

    startIt() {
        const genTen = operator =>
            Observable.timer(250, 500)
                .take(10)
                .switchMap(_ => [operator])
                .scan((acc, ww) => acc.concat(ww), []);

        this.toggle = true;

        this.whipwheehws$ = this.useWhatOperator$.switchMap(genTen);
    }
}
