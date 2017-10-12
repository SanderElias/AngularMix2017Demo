import 'rxjs/add/operator/takeWhile';
import { TimeService } from '../../time.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/takeWhile';

@Component({
    selector: 'app-take-while',
    template: `<p>onDestroy while {{time }}`
})
export class TakeWhileComponent implements OnInit, OnDestroy {
    time: string;
    active = true;

    constructor(private t: TimeService) {}

    ngOnInit() {
        this.t.time('TakeWhile')
            .takeWhile(() => this.active)
            .subscribe(
                time => (this.time = time),
                err => console.error(err),
                () => console.log('completed')
            );
    }

    ngOnDestroy() {
        this.active = false;
    }
}
