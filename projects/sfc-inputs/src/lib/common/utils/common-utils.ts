import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommonUtils {

    private static readonly STRING_SPACE_REGEX = /\s/g;

    public static isDefined<T>(value: T | undefined | null): value is T {
        return <T>value !== undefined && <T>value !== null;
    }

    public static isNullOrEmptyString<T>(value: string | undefined | null) {
        return !CommonUtils.isDefined(value) || value === '';
    }

    public static trim<T>(value: string) {
        return this.isNullOrEmptyString(value) ? value : value.replace(CommonUtils.STRING_SPACE_REGEX, '')
    }

    public static isAsyncData(data: any) {
        return data instanceof Observable;
    }

    public static addPropertyToObject(obj: object, newProperty: string, newPropertyValue: any = null): object {

        if (!this.isNullOrEmptyString(newProperty) && !obj.hasOwnProperty(newProperty)) {
            let newObj = {};
            newObj[newProperty] = newPropertyValue;
            obj = { ...obj, ...newObj };
        }

        return obj;
    }

    public static removePropertyFromObject(obj: object, property: string) {
        if (obj.hasOwnProperty(property)) {
            delete obj[property];
        }
    }
}