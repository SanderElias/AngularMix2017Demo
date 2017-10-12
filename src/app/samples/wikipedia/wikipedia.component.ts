// tslint:disable:member-ordering
import { Component } from '@angular/core';
import { WikipediaService } from 'app/samples/wikipedia.service';
import { FormControl } from '@angular/forms';

// Add operators to Observable
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-wikipedia',
    template: `
    <div>
        <!-- Bind input box to the component class's searchTerm FormControl -->
        <input type="text" [formControl]="searchTerm"/>
        <ul>
            <li *ngFor="let art of keyWords$|async" [title]='art.desc'><a [href]="art.url"  target="blank">{{art.title}}</a></li>
        </ul>
    </div>
  `,
    styles: []
})
export class WikipediaComponent {

    constructor(private wikiService: WikipediaService) {}

    // Gives us access to changes in the search box
    searchTerm = new FormControl();

    // Listen for search box value changes
    keyWords$ = this.searchTerm.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(searchTerm => this.wikiService.load(searchTerm))
        .map(this.makeResultsPretty);


    makeResultsPretty(list) {
        return list.length === 0 ? [{ title: '(no results)' }] : list;
    }
}
