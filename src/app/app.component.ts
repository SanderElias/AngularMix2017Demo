import { Component, OnInit, ViewChild } from '@angular/core';
import { RakiService } from 'app/rijks/raki.service';
import {} from '';
import { SwUrlService } from 'app/samples/sw-url.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [
        `
    div.MainHolder {
        background-size: contain;
        transition: background-image 1s ease-in-out;


    .main > button-bar-item:nth-child(2) > div:nth-child(1) > p:nth-child(1) > img:nth-child(1)
    height:1em;
    width: auto;

    }
    `
    ]
})
export class AppComponent implements OnInit {
    @ViewChild('main') main;
    constructor(public raki: RakiService, private swUrlService: SwUrlService) {}

    ngOnInit() {
        // const m = this.main.nativeElement;
        // this.raki.randomImage$.subscribe(url => {
        //     m.style.backgroundImage = url;
        // });
    }

    toggleSwUrl() {
        this.swUrlService.toggleUrl();
    }
}
//
