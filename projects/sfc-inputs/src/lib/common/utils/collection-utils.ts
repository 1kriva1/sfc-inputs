import { Injectable } from '@angular/core';  
  
@Injectable()  
export class CollectionUtils {  

    private readonly NOT_FOUND_INDEX = -1;

    public hasItem(collection: Array<any>, propertyName: string, value: any): boolean {
        return collection.findIndex(i => i[propertyName] === value) !== this.NOT_FOUND_INDEX;
    }

}