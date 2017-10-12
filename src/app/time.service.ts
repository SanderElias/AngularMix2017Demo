import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class TimeService {

    time(label = '') {
     return interval(400)
        .take(30) // fail safe, stop emitting after ~12 secs
        .do(counter => {
            if (counter === 0) {
                console.log(`${label} TimeService timer started`);
            }
            if (counter === 29) {
                console.log(`${label} TimeService self-completes after 12 seconds`);
            }
        })
        .map(() => new Date().toLocaleTimeString()) // return time as a string
        .do(
            time => console.log(`${label} time`, time),
            null,
            () => console.log(`${label} TimeService timer completed`),
        );
    }
}
