import { Injectable } from '@angular/core';  
import { CommonConstants } from '../constants/common-constants';
  
@Injectable()  
export class CollectionUtils {

    public hasObjectItem(collection: Array<any>, propertyName: string, value: any): boolean {
        return collection.findIndex(i => i[propertyName] === value) !== CommonConstants.NOT_FOUND_INDEX;
    }

    public hasItem(collection: Array<any>, value: any): boolean {
        return collection && collection.findIndex(i => i === value) !== CommonConstants.NOT_FOUND_INDEX;
    }
}