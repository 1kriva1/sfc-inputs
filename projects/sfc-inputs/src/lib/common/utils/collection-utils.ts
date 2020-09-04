import { Injectable } from '@angular/core';
import { CommonConstants } from '../constants/common-constants';
import { CommonUtils } from './common-utils';

@Injectable()
export class CollectionUtils {

    public static hasObjectItem<T>(collection: Array<any>, propertyName: string, value: T): boolean {
        return collection.findIndex(i => i[propertyName] === value) !== CommonConstants.NOT_FOUND_INDEX;
    }

    public static hasItem<T>(collection: Array<T>, value: T): boolean {
        return collection && collection.findIndex(i => i === value) !== CommonConstants.NOT_FOUND_INDEX;
    }

    public static getItem<T>(collection: Array<T>, predicate: (item: T) => boolean): T {
        if (CollectionUtils.any(collection)) {
            let value = collection.find(predicate);
            return value;
        }

        return null;
    }

    public static any<T>(collection: Array<T>): boolean {
        return CommonUtils.isDefined(collection) && collection.length > 0;
    }
}