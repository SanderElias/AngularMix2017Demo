import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { GiphyService } from 'app/samples/giphy.service';
import { People } from 'app/samples/sw-interfaces';
import { SwPeopleService } from 'app/samples/sw-people.service';

@Component({
    selector: 'app-sw-people-find',
    template: `

    <label>Find: <input type="text" #inp [formControl]="search"></label>
    <span *ngIf="sw.loading$|async">
        <img src="/assets/spinner.svg" alt="spinner" style="width:2em;height:1em;"> Loading..
    </span>
    <div class="card" *ngIf='found$|async; let found'>
    <div>There are {{found.length}} results in the set</div>
      <table>
        <thead>
            <tr>
                <th></th>
                <th>name</th>
                <th>gender</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let people of found">
                <td><img [src]="gip.find(people.name)|async" style="max-width:5em"></td>
                <td>{{people.name}}</td>
                <td>{{people.gender}}</td>
            </tr>
        </tbody>
      </table>
    </div>

  `,
    styles: []
})
export class SwPeopleFindComponent implements OnInit {
    search = new FormControl();

    found$ = this.search.valueChanges
        .debounceTime(250)
        .distinctUntilChanged()
        .do(v => console.log(v))
        .switchMap(searchValue => this.sw.find(searchValue));

    constructor(public sw: SwPeopleService, public gip: GiphyService) {}

    ngOnInit() {}
}
