import { Component, ElementRef, Input, Output, ViewChild, HostBinding, OnInit, Inject } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import { EventEmitter } from '@angular/core';
import { CollectionUtils } from '../../utils/collection-utils';
import { IPageable } from '../../interfaces/IPageable';
import { LoaderService } from '../loader/base/sfc-loader.service';
import { CommonUtils } from '../../utils/common-utils';
import { StyleClass } from '../../constants/common-constants';
import { HttpConfig } from '../../utils/http-config';
import { ILoadParameters } from '../../interfaces/ILoadParameters';
import { HttpErrorResponse } from '@angular/common/http';
import { UIUtils } from '../../utils/ui-utils';
import { HttpUtils } from '../../utils/http-utils';
import { exhaustMap } from 'rxjs/operators';

@Component({
    selector: 'load-more-dropdown',
    templateUrl: './sfc-load-more-dropdown.component.html',
    styleUrls: ['../../styles/sfc-base-input.component.css', '../../styles/sfc-base-input-dark-theme.component.css',
        './sfc-load-more-dropdown.component.css', './sfc-load-more-dropdown-dark-theme.component.css']
})
export class LoadMoreDropDownComponent implements OnInit, IPageable<ILoadMoreData<any>>{

    // for loader identification
    @Input('id')
    loaderId: string;

    // load more button as pageable element (otherwise infinity scroll)
    @Input('load-more-button')
    loadMoreButton: boolean = true;

    // show/hide loader dropdown
    @Input('open')
    @HostBinding('class.' + StyleClass.Open)
    _open: boolean = false;

    _data = null;

    // static/observable data
    @Input()
    set data(value: Array<any> | Observable<Array<any>>) {
        this._data = value;

        if (CommonUtils.isDefined(value)) {
            this.setLoader();
        }
    }

    get data() {
        return this._data;
    }


    _loader = null;

    // load function (return observable)
    @Input()
    set loader(value: (parameters: ILoadParameters) => Observable<ILoadMoreData<any>>) {
        this._loader = value;

        if (CommonUtils.isDefined(value)) {
            this.setLoader();
        }
    }

    get loader() {
        return this._loader;
    }

    _httpConfig: HttpConfig<any> = null;

    @Input('http-data-config')
    set httpConfig(value: HttpConfig<any>) {
        this._httpConfig = value;

        if (CommonUtils.isDefined(value)) {
            this.setLoader();
        }
    }

    get httpConfig() {
        return this._httpConfig;
    }

    // output handler for loader exception
    @Output('handle-error')
    handleError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    // output handler for loader success result
    @Output('handle-success')
    handleSuccess: EventEmitter<ILoadMoreData<any>> = new EventEmitter<ILoadMoreData<any>>();

    // output handler for load more result
    @Output('handle-update')
    handleUpdate: EventEmitter<ILoadMoreData<any>> = new EventEmitter<ILoadMoreData<any>>();

    @ViewChild('dropdown', { static: false })
    private dropdown: ElementRef;

    // indicate loading process
    @HostBinding('class.' + StyleClass.Loading)
    public isLoadingData: boolean = false;

    /**
     * detect if if items exist for entire value
     */
    hasItems: boolean = false;

    // indicate that has more data
    showLoadMore: boolean = false;

    // inner loader
    _loadFunction: (parameters: ILoadParameters) => Observable<ILoadMoreData<any>>;

    constructor(private loaderService: LoaderService, private httpUtils: HttpUtils) { }

    ngOnInit() {
        if (!CommonUtils.isDefined(this._loadFunction)) {
            this.setLoader();
        }
    }

    /**
     * scroll to selected item
     */
    public scrollToSelected(selectedEl: HTMLElement) {
        let dropDownEl = this.dropdown.nativeElement;

        UIUtils.addClasses(dropDownEl, StyleClass.Selected);

        if (selectedEl && selectedEl.offsetTop !== 0 && dropDownEl.scrollTop === 0) {
            dropDownEl.scrollTop = dropDownEl.scrollTop +
                selectedEl.offsetTop - dropDownEl.offsetHeight / 2 + selectedEl.offsetHeight / 2;
        }

        UIUtils.removeClasses(dropDownEl, StyleClass.Selected);
    }

    /**
     * load data by loader function
     * @param parameters ILoadParameters entity
     */
    public loadData(parameters?: ILoadParameters) {
        if (CommonUtils.isDefined(this._loadFunction)) {
            this.toggleLoading(true);
            this.subscribe(this._loadFunction(parameters));
        }
    }

    /**
     * Exhaust to load data
     * @param observable data observable
     */
    public exhaust(observable: Observable<any>) {
        if (CommonUtils.isDefined(observable)) {
            let exhaustedObservable = observable
                .pipe(
                    exhaustMap((parameters: ILoadParameters) => {
                        this.toggleLoading(true);
                        return CommonUtils.isDefined(this._loadFunction) ? this._loadFunction(parameters) : EMPTY;
                    })
                );

            this.subscribe(exhaustedObservable);
        }
    }

    /**
     * subscribe to observable
     * @param observable data observable
     */
    private subscribe(observable: Observable<any>) {
        if (CommonUtils.isDefined(observable)) {
            observable.subscribe(
                (result: ILoadMoreData<any>) => {
                    this.handleLoaderSuccess(result);
                },
                (error: HttpErrorResponse) => {
                    this.handleLoaderError(error);
                });
        }
    }

    private setLoader() {
        if (!CommonUtils.isDefined(this.loader)) {
            // 1. observable data
            if (CommonUtils.isAsyncData(this.data)) {
                this._loadFunction = () => this.data as Observable<any>;
            }
            // 2. config data
            else if (CommonUtils.isDefined(this.httpConfig)) {
                this._loadFunction = () => this.httpUtils.getDataByConfig<any>(this.httpConfig);
            }
            // 3. static data
            else if (CommonUtils.isDefined(this.data)) {
                this._loadFunction = () => of({ Items: Object.assign([], this.data), HasNext: false });
            }
        } else {
            this._loadFunction = this.loader;
        }
    }

    private handleLoaderError(error: HttpErrorResponse) {
        if (this.handleError)
            this.handleError.emit(error);

        this.showLoadMore = false;
        this.toggleLoading(false);
    }

    private handleLoaderSuccess(result: ILoadMoreData<any>) {
        if (this.handleSuccess)
            this.handleSuccess.emit(result);

        this.hasItems = CollectionUtils.any(result.Items);
        this.showLoadMore = result ? result.HasNext : false;
        this.toggleLoading(false);
    }

    //IPageable - before start load next page
    onLoadMore() {
        this.toggleLoading(true);
    }

    //IPageable - after next page was loaded
    updateData(result: ILoadMoreData<any>) {
        if (this.handleUpdate)
            this.handleUpdate.emit(result);

        this.showLoadMore = result ? result.HasNext : false;
        this.toggleLoading(false);
    }

    /**
     * show/hide loading
     * @param isLoading true - show loader, false - hide
     */
    private toggleLoading(isLoading: boolean) {
        if (isLoading)
            this.loaderService.showLoader(this.loaderId);
        else
            this.loaderService.hideLoader(this.loaderId);

        this.isLoadingData = isLoading;
    }
}