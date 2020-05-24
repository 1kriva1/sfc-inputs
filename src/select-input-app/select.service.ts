import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, distinctUntilChanged, exhaustMap, switchMap, shareReplay } from 'rxjs/operators';
import ISelectModel from './select.model';
import ISelectGroupModel from './select-group.model';
import ISelectPagedModel from './select-paged.model';


@Injectable({ providedIn: 'root' })
export default class SelectService {

    private sfcUrl = 'http://sfc.mock.com:88';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    /** GET heroes from the server */
    getSelects(): Observable<ISelectModel[]> {
        return this.http.get<ISelectModel[]>(this.sfcUrl + '/values/sleep/1000')
            .pipe(
                tap(_ => this.log('fetched selects')),
                //shareReplay(),
                distinctUntilChanged(),
                catchError(this.handleError<ISelectModel[]>('getSelects', []))
            );
    }

    /** GET heroes from the server */
    getGroupSelects(): Observable<ISelectGroupModel[]> {
        return this.http.get<ISelectGroupModel[]>(this.sfcUrl + '/values/group/sleep/1000')
            .pipe(
                tap(_ => this.log('fetched group selects')),
                //shareReplay(),
                distinctUntilChanged(),
                catchError(this.handleError<ISelectGroupModel[]>('getGroupSelects', []))
            );
    }

    /** GET heroes from the server */
    getPagedSelects(page: number, size: number): Observable<ISelectPagedModel> {
        const options =
            { params: new HttpParams().set('PageSize', size.toString()).set('PageNumber', page.toString()).set('Sleep', "3000") };

        return this.http.get<ISelectPagedModel>(this.sfcUrl + '/values/pagination', options)
            .pipe(
                tap(_ => this.log('fetched paged selects')),
                //shareReplay(),
                distinctUntilChanged(),
                catchError(this.handleError<ISelectPagedModel>('getPagedSelects', { Items: [], Total: 0, CurrentPage: 0, HasNext: false, HasPrevious: false, TotalPages: 0 }))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(`SelectService: ${message}`);
    }
}