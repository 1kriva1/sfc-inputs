import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonConstants } from '../constants/common-constants';
import { ILoadMoreData } from '../interfaces/ILoadMoreData';
import { ILoadMoreDataItem } from '../interfaces/ILoadMoreDataItem';
import { CollectionUtils } from './collection-utils';

@Injectable()
export class LoadMoreUtils {    

    public static getStaticDataLoadFunction<T extends ILoadMoreDataItem>(data: Array<T>, predicate: (item: T) => boolean) {
        var page = 1;
        return (parameters: any) => {
            parameters = parameters || {page: page};
            page = parameters.page ? parameters.page : page;

            return this.getStaticDataLoader(data,
                (item: T) => predicate(item),                
                parameters.page, 
                CommonConstants.DEFAULT_PAGE_SIZE,
                (result: ILoadMoreData<T>) => {
                    if (result.HasNext) {
                        page += 1;
                    }
                });
        };
    }

    private static getStaticDataLoader<T>(staticData: Array<T>,
        predicate: (item: T) => boolean, page: number, pageSize: number = CommonConstants.DEFAULT_PAGE_SIZE,
        updater?: (result: ILoadMoreData<T>) => void): Observable<ILoadMoreData<T>> {

        const foundItems = CollectionUtils.where(staticData, predicate),
            data: ILoadMoreData<T> = {
                Items: CollectionUtils.skip(foundItems, page, pageSize),
                HasNext: page < Math.ceil(foundItems.length / pageSize)
            };

        return of(data)
            .pipe(
                tap((resp: ILoadMoreData<any>) => {
                    if (updater) {
                        updater(resp);
                    }
                })
            );
    }
}