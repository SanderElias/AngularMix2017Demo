import { Component, OnInit } from '@angular/core';
import { RakiService } from 'app/rijks/raki.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-artists',
    template: `
    <div>
        <input type="text" [formControl]='search'>
        <ul>
            <li *ngFor="let piece of list$|async">
            <!-- <a [href]='piece.links.web' target="_blank">{{piece.title}}</a> -->
            <img (click)="raki.loadDetail(piece.objectNumber)" [title]="piece.longTitle" *ngIf="piece.hasImage" [src]="piece.headerImage.url"></li>
        </ul>
    </div>

  `,
    styles: [
        `

    img {
        width:100%;
        height:auto;
    }

    ul {
        padding-left: 8px;
        padding-right: 8px;
    }

    li {
        list-style:none
    }
    `
    ]
})
export class ArtistsComponent implements OnInit {
    search = new FormControl();

    list$ = this.search.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .switchMap(artist => this.raki.artist(artist))
        .take(5);

    constructor(public raki: RakiService) {}

    ngOnInit() {}
}
