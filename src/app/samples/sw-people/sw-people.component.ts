import { Component, OnInit } from '@angular/core';
import { SwPeopleService } from 'app/samples/sw-people.service';

@Component({
    selector: 'app-sw-people',
    templateUrl: './sw-people.component.html',
    styles: []
})
export class SwPeopleComponent implements OnInit {
    constructor(public sw: SwPeopleService) {}

    ngOnInit() {}
}
