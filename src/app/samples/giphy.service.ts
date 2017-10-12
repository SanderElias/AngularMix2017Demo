import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RootObject } from './giphy';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

const API_KEY = 'sEl7UmhvaI69Mrw9h8Ug0xNTnuhCkJpT';
const WAITIMG = 'https://media0.giphy.com/media/xTkcEQACH24SMPxIQg/100.webp';

@Injectable()
export class GiphyService {
    cache = new Map<string, string>();
    constructor(private http: HttpClient) {}
    find(key) {
        if (!this.cache.has(key)) {
            this.cache.set(key, WAITIMG);
            return Observable.of(WAITIMG).merge(
                this.http
                    .get<RootObject>(
                        // tslint:disable-next-line:max-line-length
                        `https://api.giphy.com/v1/gifs/search?api_key=sEl7UmhvaI69Mrw9h8Ug0xNTnuhCkJpT&q=${key}&limit=1&offset=0&rating=G&lang=en`
                    )
                    .map(r => r.data[0].images.fixed_height_small.url)
                    .catch(e => {
                        console.log(key);
                        return Observable.of('/assets/404.jpg');
                    })
                    .do(imgsrc => this.cache.set(key, imgsrc))
                    .toPromise() //  make eager!
            );
        }
        return Observable.of(this.cache.get(key));
    }
}
