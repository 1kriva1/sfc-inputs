import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, distinctUntilChanged, exhaustMap, switchMap, shareReplay } from 'rxjs/operators';
import { IHttpConfig } from '../interfaces/IHttpConfig';


@Injectable({ providedIn: 'root' })
export default class HttpUtils<T> {

    private readonly defaultContentTypeHttpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getDataByConfig(config: IHttpConfig): Observable<T> {

        if (!config)
            throw new Error("HTTP configuration is empty");

        let options = {
            headers: this.defaultContentTypeHttpHeader,
            params:this.buildParams(config.params)
        };

        return this.http.get<T>(config.url, options)
            .pipe(
                tap(data => config.updater ? config.updater(data, config) : this.defaultTap(data)),
                distinctUntilChanged(),
                map(config.mapper || this.defaultMap),
                catchError(this.handleError<T>('get config data', null))
            );
    }

    private defaultMap(data: T) {
        return data;
    }

    private defaultTap(data: T) {
        this.log("get data");
    }

    private buildParams(params: Array<any>) {
        if (params) {
            let httpParams = new HttpParams();

            params.forEach(function (param) {
                httpParams = httpParams.append(param.key, param.value);
            });

            return httpParams;
        }
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(`SelectService: ${message}`);
    }
}