import { TimeService } from '../../time.service';
import { Subject } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-take-until',
    template: `<p>observable operator: {{time }}</p>`
})
export class TakeUntilComponent implements OnInit, OnDestroy {
    time: string;
    private onDestroy = new Subject<void>();

    constructor(private t: TimeService) {}

    ngOnInit() {
        // use this form to allow my monkey-patched rx-operator.
        this.t.time('TakeUntil')
            .takeUntil(this.onDestroy.asObservable())
            .subscribe(
                time => (this.time = time),
                err => console.error(err),
                () => console.log('TakeUntil completed')
            );
    }

    ngOnDestroy() {
        this.onDestroy.next();
    }
}
