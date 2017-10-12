import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WikipediaService {
    constructor(private http: HttpClient) {}

    load(search: string) {
        if (search.length < 2) {
            return Observable.of([]);
        }
        return this.http
            .get(
                `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&format=json&origin=*`
            )
            .catch(e => {
                console.error(e);
                // just send off an empty result in case of error.
                return Observable.of([]);
            })
            .map(result =>
                result[1].reduce(
                    (acc, title, index) =>
                        acc.concat({
                            title,
                            desc: result[2][index],
                            url: result[3][index]
                        }),
                    []
                )
            );
    }
}
