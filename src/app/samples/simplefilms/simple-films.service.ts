// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootMovies, Movie } from '../sw-interfaces';
import { SwUrlService } from 'app/samples/sw-url.service';

@Injectable()
export class SimpleFilmsService {
    constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

    getFilms() {
        return this.http.get<RootMovies>(this.url);
    }

    get url() {
        return this.swUrlService.url;
    }
}
