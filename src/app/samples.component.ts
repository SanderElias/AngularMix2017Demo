import { Component } from '@angular/core';
import { RakiService } from 'app/rijks/raki.service';

@Component({
    templateUrl: './samples.component.html',
    styles: [
        `
    div.main {
        background-size: contain;
        transition: background-image 1s ease-in-out;


    .main > button-bar-item:nth-child(2) > div:nth-child(1) > p:nth-child(1) > img:nth-child(1)
    height:1em;
    width: auto;

    }
    `
    ]
})
export class SamplesComponent {
    constructor(public raki: RakiService) {}
}
