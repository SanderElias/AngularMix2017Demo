import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/switchMap';

import { People, RootPeople } from 'app/samples/sw-interfaces';

const log = (desc: string) => (...args) => console.log(desc, ...args);

@Injectable()
export class SwPeopleService {
    private addOne$ = new ReplaySubject<People[]>(Number.POSITIVE_INFINITY);
    private additions$ = this.addOne$
        .startWith([])
        .scan((acc, ext) => acc.concat(ext), []);

    private load = (url: string): Observable<RootPeople> =>
        this.http
            .get<RootPeople>(url)
            .catch(_ => of<RootPeople>(null))
            .do(() => console.log('fetched from back-end: ' + url))
            .switchMap(r => {
                if (r.next) {
                    return of(r).merge(this.load(r.next));
                }
                return of(r);
            });

    // tslint:disable:member-ordering
    private _people$ = of(`https://swapi.co/api/people/`)
        .mergeMap(this.load)
        .map(r => r.results)
        .scan((acc, cur) => acc.concat(cur), [])
        .shareReplay(1);

    people$ = this._people$
        .mergeMap(list =>
            this.additions$.map(additions => list.concat(additions))
        )
        .map(list => list.sort((x, y) => (x.name < y.name ? -1 : 1)));

    loading$ = of(true)
        .merge(this._people$.map(_ => true).concat(of(false)))
        .distinctUntilChanged();

    count$ = this.people$.map(list => list.length).startWith(0);

    find(partial) {
        return this.people$.map(list =>
            list.filter(
                character =>
                    character.name
                        .toLocaleLowerCase()
                        .indexOf(partial.toLocaleLowerCase()) > -1
            )
        );
    }

    add(newCharacter: People) {
        // generate an id! just for demo purposes.
        newCharacter.url = new Date().getTime().toString(36);
        /**
         * Make sure you do the actual save to DB in here.
         * as this function now only updates the local
         */
        return this.addOne$.next([newCharacter]);
    }

    save(update: People) {}

    constructor(private http: HttpClient) {
        /**
         * the code hereafter simulates local user input.
         * it call the add method the same way it would be
         * used in a user form.
         */
        // Observable.timer(1500, 250)
        //     .take(2)
        //     .subscribe(i => {
        //         this.add({
        //             name: 'A dynamic generated local name' + (10 + i)
        //         });
        //     });
    }
}
