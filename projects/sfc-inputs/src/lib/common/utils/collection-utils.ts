import { Injectable } from '@angular/core';  
import { CommonConstants } from '../constants/common-constants';
  
@Injectable()  
export class CollectionUtils {

    public hasObjectItem<T>(collection: Array<any>, propertyName: string, value: T): boolean {
        return collection.findIndex(i => i[propertyName] === value) !== CommonConstants.NOT_FOUND_INDEX;
    }

    public hasItem<T>(collection: Array<T>, value: T): boolean {
        return collection && collection.findIndex(i => i === value) !== CommonConstants.NOT_FOUND_INDEX;
    }
}