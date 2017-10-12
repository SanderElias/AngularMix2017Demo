import { Component, OnInit } from '@angular/core';
import { Movie } from 'app/samples/sw-interfaces';
import { SimpleFilmsService3 } from './simple-films3.service';

import { Observable } from 'rxjs/Observable';

// Add the catch operator to Observable
import 'rxjs/add/operator/catch';

@Component({
    selector: 'app-simplefilms3',
    template: `

      <h3>Simple Films 3: asyncPipe and catch</h3>

      <div *ngFor="let film of films$ | async">{{film.title}}</div>

      <div *ngIf="errorMsg" class="error">{{errorMsg}}</div>

      <button (click)="add()">Add movie</button>
      <button (click)="refresh()">Refresh list</button>
`,

    providers: [ SimpleFilmsService3 ]
})
export class Simplefilms3Component implements OnInit {
    errorMsg: string;

    // Expose Observable of Movies instead of Move[]
    films$: Observable<Movie[]>;

    constructor(private filmsService: SimpleFilmsService3) {}

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.errorMsg = '';

        this.films$ = this.filmsService.getFilms()
            .catch(err => {
                this.errorMsg = err.message;
                return [];
            });
    }

    add() {
        const movie = { title: 'A New Observer!' } as Movie;

        // Don't forget to subscribe
        this.filmsService.add(movie).subscribe();
    }
}
