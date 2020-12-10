import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, distinctUntilChanged } from 'rxjs/operators';
import BaseHttpService from 'src/base-http.service';
import IAutoCompletePagedModel from './autocomplete-paged.model';


@Injectable({ providedIn: 'root' })
export default class AutoCompleteService extends BaseHttpService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    getAutoCompletes(value: string): Observable<any[]> {
        const options =
            { params: new HttpParams().set('Search', value).set('Sleep', "1000") };

        return this.http.get<string[]>(this.sfcUrl + '/values/autocomplete', options)
            .pipe(
                tap(_ => this.log('fetched Autocompletes')),
                distinctUntilChanged(),
                catchError(this.handleError<string[]>('getAutocompletes', []))
            );
    }

    getPagedAutoCompletes(value: string, page: number, size: number): Observable<IAutoCompletePagedModel> {
        const options =
            { params: new HttpParams().set('Search', value).set('PageSize', size.toString()).set('PageNumber', page.toString()).set('Sleep', "1000") };

        return this.http.get<IAutoCompletePagedModel>(this.sfcUrl + '/values/pagination/autocomplete', options)
            .pipe(
                tap(_ => this.log('fetched paged selects')),
                distinctUntilChanged()
            );
    }
}