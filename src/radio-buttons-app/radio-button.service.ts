import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, distinctUntilChanged } from 'rxjs/operators';
import IRadioButtonModel from './radio-button.model';
import BaseHttpService from 'src/base-http.service';


@Injectable({ providedIn: 'root' })
export default class RadioButtonService extends BaseHttpService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    getRadioButtons(): Observable<IRadioButtonModel[]> {
        return this.http.get<IRadioButtonModel[]>(this.sfcUrl + '/values/radiobutton/sleep/5000')
            .pipe(
                tap(_ => this.log('fetched radio buttons')),
                distinctUntilChanged(),
                catchError(this.handleError<IRadioButtonModel[]>('getRadioButtons', []))
            );
    }
}