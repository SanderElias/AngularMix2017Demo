import { Component, OnInit, Input } from '@angular/core';
import { RakiObject } from '../rakiCollection';
@Component({
    selector: 'app-art-detail',
    template: `
    <img [src]="artDetail.webImage.url">
    <h4>{{artDetail.title}}</h4>
    Maker{{artDetail.principalMakers.length>1?'s':''}}
    <ul>
        <li *ngFor="let maker of artDetail.principalMakers">{{maker.name}}</li>
    </ul>
    <div class='colorboxes' *ngIf="artDetail.colors.length>0">
    <div class='box'  *ngFor="let c of artDetail.colors" [title]='c' [style.background]='c'></div>
    </div>
    <!-- <pre><code>{{artDetail|json:true}}</code></pre> -->
  `,
    styles: [
        `

    img {
        width:100%;
    }
    li {
        list-style:none
    }

    .box{
        height:1.2em;
        width:auto;
    }
    .colorboxes {
        padding-left:1.5em;
        padding-right:1.5em;
        display:grid;
        grid-gap: 5px;
        grid-auto-flow: column;
        grid-auto-column: minmax(2em, 1fr);

    }

    `
    ]
})
export class ArtDetailComponent implements OnInit {
    @Input() artDetail: RakiObject.ArtDetailObject;

    constructor() {}

    ngOnInit() {}
}
