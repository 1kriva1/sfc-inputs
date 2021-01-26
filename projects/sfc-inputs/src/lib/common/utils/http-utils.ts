import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, distinctUntilChanged, retry } from 'rxjs/operators';
import { HttpConfig } from './http-config';
import { CommonUtils } from './common-utils';

@Injectable({providedIn: 'root'})
export class HttpUtils {

    /**
     * Default http header for all requests
     */
    private readonly defaultContentTypeHttpHeader = { 'Content-Type': 'application/json' };

    /**
     * Retry a failed request up to 3 times
     */
    private readonly RETRY_COUNT = 3;

    constructor(private http: HttpClient) { }

    getDataByConfig<T>(config: HttpConfig<T>): Observable<T> {

        if (!CommonUtils.isDefined(config))
            throw new Error('HTTP configuration is empty');

        if (!CommonUtils.isDefined(config.url))
            throw new Error('HTTP configuration URL is not defined');

        const options = this.buildOptions(config.params, config.headers);

        return this.http.get<T>(config.url, options)
            .pipe(
                distinctUntilChanged(),
                tap(data => config.updater ? config.updater(data) : this.defaultUpdater(data)),
                map(config.mapper || this.defaultMap),
                retry(this.RETRY_COUNT), // retry a failed request
                catchError(this.handleError)
            );
    }

    /**
     * Buld options for configuration request
     */
    private buildOptions(params: HttpParams, headers: HttpHeaders) {
        const options = {
            headers: this.buildHeaders(headers),
            observe: 'body' as const,
            params: params,
            reportProgress: false,
            responseType: 'json' as const,
            withCredentials: false
        };

        return options
    }

    /**
     * Build headers for configuration request
     */
    private buildHeaders(headers: HttpHeaders): HttpHeaders {
        let headersOption: HttpHeaders = new HttpHeaders(this.defaultContentTypeHttpHeader);

        if (CommonUtils.isDefined(headers)) {
            let keys = headers.keys();

            keys.forEach((key) => {
                if (!headersOption.has(key)) {
                    headersOption.append(key, headers[key]);
                } else {
                    headersOption.set(key, headers[key]);
                }
            });
        }

        return headersOption;
    }

    /** Default map function */
    private defaultMap<T>(data: T) {
        return data;
    }

    /** Default update function */
    private defaultUpdater<T>(data: T) {
        this.log('Get data by configuration');
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param error Error response
     */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    /** Log a HttpUtils message */
    private log(message: string) {
        console.log(`Http utils: ${message}`);
    }
}