// tslint:disable:member-ordering
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MultiStreamService } from './multi-stream.service';

@Component({
    selector: 'app-multi-stream',
    templateUrl: './multi-stream.component.html',
    providers: [ MultiStreamService ],

    // Take advantage of immutability
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStreamComponent {

    constructor(private filmService: MultiStreamService) {}

    films$ = this.filmService.films$;

    add(newData) {
        this.filmService.add(newData);
    }

}
