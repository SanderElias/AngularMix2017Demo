import { TimeService } from '../../time.service';
import { Component, ComponentRef, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'app-comp-is-there',
    template: `<p>decorator: {{time }}</p>`
})
export class CompIsThereComponent implements OnInit, OnDestroy {
    time: string;
    @EmitOnDestroy componentDone: Observable<void>;

    constructor(private t: TimeService) {}

    ngOnInit() {
        this.t.time('CompIsThere')
            .takeUntil(this.componentDone)
            .subscribe(
                time => (this.time = time),
                err => console.error(err),
                () => console.log('completed')
            );
    }

    ngOnDestroy() {
        console.log('done');
    }
}

export function EmitOnDestroy(target: any, prop: string): any {
    const ngOnDestroy = target.ngOnDestroy; // keep original Fn
    const trigger = new Subject();
    target[prop] = from(trigger);
    target.ngOnDestroy = () => {
        console.log('fire!!');
        trigger.next();
        if (ngOnDestroy !== undefined) {
            // fire original OnDestroy
            ngOnDestroy.apply(target);
        }
    };
}

export function CustomDecorator(target: any, prop: string): any {
    const ngOnDestroy = target.ngOnDestroy; // keep original Fn
    // more custom code here, that's not the problem
    target.ngOnDestroy = () => {
        // need to do some cleanup here!
        if (ngOnDestroy !== undefined) {
            // fire original OnDestroy
            ngOnDestroy.apply(target);
        }
    };
}
