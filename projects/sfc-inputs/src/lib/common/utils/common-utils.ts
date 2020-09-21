import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommonUtils {

    public static isDefined<T>(value: T | undefined | null): value is T {
        return <T>value !== undefined && <T>value !== null;
    }

    public static isNullOrEmptyString<T>(value: string | undefined | null) {
        return !CommonUtils.isDefined(value) || value === '';
    }

    public static isAsyncData(data: any) {
        return data instanceof Observable;
    }
}