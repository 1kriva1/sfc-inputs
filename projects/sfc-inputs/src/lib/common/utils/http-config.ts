import { HttpMethod } from '../constants/common-constants';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonUtils } from './common-utils';
import { CollectionUtils } from './collection-utils';
import { ILoadMoreData } from '../interfaces/ILoadMoreData';
import { Type } from '@angular/core';

export class HttpConfig<T>{

    /**
     * An HTTP request body that represents serialized parameters
     */
    public params: HttpParams;

    /**
     * Represents the header configuration options for an HTTP request
     */
    public headers: HttpHeaders;

    /**
     * Map function from server model to T model
     */
    public mapper: (data: any) => T;

    /**
     * Update function (mostly for update page number)
     */
    public updater: (data: any) => void;    

    constructor(public url: string, private _isPageable: boolean = false, private httpMethod = HttpMethod.GET) {
    }

    /**
     * Pageable mean that data will be loaded by pages. If not pageable - subscribe to observable
     */
    public get isPageable(): boolean {
        return this._isPageable && CommonUtils.isDefined(this.updater);
    }

    /**
     * Set up http headers
     * @param headers Http headers
     */
    setHeaders(headers: HttpHeaders) {
        this.headers = headers;
        return this;
    }
    /**
     * Set up function which will be map result to T type
     * @param mapper Mapper function
     */
    setMapper(mapper: (data: any) => T) {
        this.mapper = mapper;
        return this;
    }

    /**
     * Set up function which will be called when http called
     * @param updater Update function
     */
    setUpdater(updater: (data: any) => void) {
        this.updater = updater;
        return this;
    }

    /**
     * Update configuration HttpParams
     * @param paramName HttpParams name
     * @param paramValue HttpParams value
     */
    updateParam(paramName: string, paramValue: any) {
        if (CommonUtils.isDefined(this.params) && this.params.has(paramName)) {
            this.params = this.params.set(paramName, paramValue);
        }
    }

    /**
     * Set HttpParams for configuration
     * @param params Array of parameters with name and value
     */
    setParams(params: Array<{ paramName: string, paramValue: any }>) {
        if (CollectionUtils.any(params)) {
            let newParams = new HttpParams();
            params.forEach((param) => {
                if (newParams.has(param.paramName)) {
                    newParams = newParams.set(param.paramName, param.paramValue);
                } else {
                    newParams = newParams.append(param.paramName, param.paramValue)
                }
            });

            this.params = newParams;
        }

        return this;
    }
}