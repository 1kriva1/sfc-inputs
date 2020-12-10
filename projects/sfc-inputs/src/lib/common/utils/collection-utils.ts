import { Injectable } from '@angular/core';
import { CommonConstants } from '../constants/common-constants';
import { CommonUtils } from './common-utils';

@Injectable()
export class CollectionUtils {

    public static hasObjectItem<T>(collection: Array<any>, propertyName: string, value: T): boolean {
        return this.any(collection) && collection.findIndex(i => i[propertyName] === value) !== CommonConstants.NOT_FOUND_INDEX;
    }

    public static hasItem<T>(collection: Array<T>, value: T): boolean {
        return this.any(collection) && collection.findIndex(i => i === value) !== CommonConstants.NOT_FOUND_INDEX;
    }

    public static getItem<T>(collection: Array<T>, predicate: (item: T) => boolean): T {
        if (CollectionUtils.any(collection)) {
            let value = collection.find(predicate);
            return value;
        }

        return null;
    }

    public static where<T>(collection: Array<T>, predicate: (item: T) => boolean): Array<T> {
        if (CollectionUtils.any(collection)) {
            let value = collection.filter(predicate);
            return value;
        }

        return collection;
    }

    public static skip<T>(collection: Array<T>, page: number, pageSize: number): Array<T> {
        if (CollectionUtils.any(collection)) {
            let start = (page - 1) * pageSize;
            return collection.slice(start, start + pageSize);
        }

        return collection;
    }

    public static removeItem<T>(collection: Array<T>, predicate: (item: T) => boolean) {
        var i = collection.length;
        while (i--) {
            if (predicate(collection[i])) {
                collection.splice(i, 1);
            }
        }
    }

    public static any<T>(collection: Array<T>): boolean {
        return CommonUtils.isDefined(collection) && collection.length > 0;
    }

    public static firstItem<T>(collection: Array<T>): T {
        if (CommonUtils.isDefined(collection) && collection.length > 0) {
            return collection[0];
        }

        return null;
    }

    public static lastItem<T>(collection: Array<T>): T {
        if (CommonUtils.isDefined(collection) && collection.length > 0) {
            return collection[collection.length - 1];
        }

        return null;
    }

    public static getCollectionOrEmpty<T>(collection: Array<T>): Array<T> {
        return CommonUtils.isDefined(collection) ? collection : [];
    }
}