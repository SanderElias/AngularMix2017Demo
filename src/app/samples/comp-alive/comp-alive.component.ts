import { TimeService } from '../../time.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/takeWhile';

@Component({
    selector: 'app-comp-alive',
    template: `<p>time: {{time }}</p>`
})
export class CompAliveComponent implements OnInit, OnDestroy {
    time: string;

    constructor(private t: TimeService) {}

    ngOnInit() {
        this.t.time('CompAlive')
            .takeWhile(CompStillAlive(this))
            .subscribe(
                time => (this.time = time),
                err => console.error(err),
                () => console.log('completed')
            );
    }

    ngOnDestroy() {}
}

function CompStillAlive(comp) {
    let active = true;
    const orgFn = comp.ngOnDestroy.bind(comp);
    comp.ngOnDestroy = () => {
        active = false;
        orgFn();
    };

    return () => active;
}
