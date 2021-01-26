import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @dynamic
@Injectable()
export class CommonUtils {

    public static isDefined<T>(value: T | undefined | null): value is T {
        return <T>value !== undefined && <T>value !== null;
    }

    public static isNullOrEmptyString<T>(value: string | undefined | null) {
        return !CommonUtils.isDefined(value) || value === '';
    }

    public static contains<T>(value: string | undefined | null, includeValue: string) {
        if (CommonUtils.isDefined(value) && !this.isNullOrEmptyString(includeValue)) {
            const valueLower = value.toLowerCase();
            return valueLower.includes(includeValue.toLowerCase());
        }

        return false;
    }

    public static trim<T>(value: string) {
        return this.isNullOrEmptyString(value) ? value : value.replace(/\s/g, '')
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