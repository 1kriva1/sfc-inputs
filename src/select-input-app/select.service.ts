import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, distinctUntilChanged } from 'rxjs/operators';
import ISelectModel from './select.model';
import ISelectGroupModel from './select-group.model';
import ISelectPagedModel from './select-paged.model';
import BaseHttpService from 'src/base-http.service';


@Injectable({ providedIn: 'root' })
export default class SelectService extends BaseHttpService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    getSelects(): Observable<ISelectModel[]> {
        return this.http.get<ISelectModel[]>(this.sfcUrl + '/values/sleep/1000')
            .pipe(
                tap(_ => this.log('fetched selects')),
                distinctUntilChanged(),
                catchError(this.handleError<ISelectModel[]>('getSelects', []))
            );
    }

    getGroupSelects(): Observable<ISelectGroupModel[]> {
        return this.http.get<ISelectGroupModel[]>(this.sfcUrl + '/values/group/sleep/1000')
            .pipe(
                tap(_ => this.log('fetched group selects')),
                distinctUntilChanged(),
                catchError(this.handleError<ISelectGroupModel[]>('getGroupSelects', []))
            );
    }

    getPagedSelects(page: number, size: number): Observable<ISelectPagedModel> {
        const options =
            { params: new HttpParams().set('PageSize', size.toString()).set('PageNumber', page.toString()).set('Sleep', "1000") };

        return this.http.get<ISelectPagedModel>(this.sfcUrl + '/values/pagination', options)
            .pipe(
                tap(_ => this.log('fetched paged selects')),
                distinctUntilChanged(),
                catchError(this.handleError<ISelectPagedModel>('getPagedSelects', { Items: [], Total: 0, CurrentPage: 0, HasNext: false, HasPrevious: false, TotalPages: 0 }))
            );
    }
}