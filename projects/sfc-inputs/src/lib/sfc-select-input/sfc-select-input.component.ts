import { Component, Self, Optional, ChangeDetectorRef, Input, ElementRef, ViewChild, OnInit, AfterViewInit, OnChanges, HostBinding, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import ISelectData from '../common/interfaces/select-input/ISelectData';
import { StyleClass, CommonConstants } from '../common/constants/common-constants';
import ISelectDataGroup from '../common/interfaces/select-input/ISelectDataGroup';
import { CollectionUtils } from '../common/utils/collection-utils';
import { Observable } from 'rxjs';
import { LoaderService } from '../common/components/loader/base/sfc-loader.service';
import HttpUtils from '../common/utils/http-utils';
import { InfiniteScrollerDirective } from '../common/directives/infinite-scroll/sfc-infinite-scroll.directive';
import { CommonUtils } from '../common/utils/common-utils';
import { IPageable } from '../common/interfaces/IPageable';
import { ILoadMoreData } from '../common/interfaces/ILoadMoreData';
import IOptGroupValue from '../common/interfaces/select-input/IOptGroupValue';
import IOptGroupOption from '../common/interfaces/select-input/IOptGroupOption';
import { HttpConfig } from '../common/utils/http-config';

@Component({
    selector: 'sfc-select-input',
    templateUrl: './sfc-select-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css', './sfc-select-input.component.css', './sfc-select-input-dark-theme.component.css']
})
export class SelectInputComponent extends BaseInputComponent<string | Array<string> | IOptGroupValue> implements OnInit, AfterViewInit, OnChanges,
    IPageable<ILoadMoreData<ISelectData | ISelectDataGroup> | ISelectData[] | ISelectDataGroup[]> {

    @Input("default-display-value")
    defaultDisplayValue: ISelectData = { value: CommonConstants.SELECT_INPUT.DEFAULT_OPTION_VALUE, key: -1, isDefault: true };

    @Input("show-default-option")
    showDefaultOption: boolean = true;

    // TRUE - multiple selection
    @Input()
    multiple: boolean = false;

    // load data (subscribe) on component init
    @Input("load-on-init")
    isLoadOnInit: boolean = false;

    // component data (simple array of objects or obsevable)
    @Input()
    data: ISelectData[] | ISelectDataGroup[] | Observable<ISelectData[]> | Observable<ISelectDataGroup[]>;

    // function for pageable data loading
    @Input()
    loader: () => Observable<ILoadMoreData<ISelectData | ISelectDataGroup> | ISelectData[] | ISelectDataGroup[]>;

    @Input("load-more-button")
    loadMoreButton: boolean = false;

    @Input("http-data-config")
    httpConfig: HttpConfig<ILoadMoreData<ISelectData | ISelectDataGroup> | ISelectData[] | ISelectDataGroup[]>;

    // check if component must behave as group select
    private isOptGroup: boolean;

    // local variable to store data
    private localData: any[];

    @HostBinding('class.loading')
    private isLoadingData: boolean = false;

    private isLoadedData: boolean = false;

    private isAlreadyScrolled: boolean = false;    

    // infinity scroll directive (can start load data immediately)
    // if data pageable and isLoadOnInit = FALSE we can open dropdown and start load data from infinity scroll directive
    @ViewChild(InfiniteScrollerDirective, { static: false })
    private infinityScroll: InfiniteScrollerDirective;

    // label element reference
    @ViewChild('labelFocused', { static: false })
    private labelElement: ElementRef;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef,
        private loaderService: LoaderService,
        private httpUtils: HttpUtils) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        this.setLoaderByConfig();
        this.loadData();
    }

    ngAfterViewInit(): void {
        this.setOnFocusEvent(this.labelElement.nativeElement);
        super.ngAfterViewInit();
    }

    ngOnChanges(changes: any) {
        // if data changes update local data
        if (changes.data && !changes.data.firstChange) {
            this.initData(changes.data.currentValue);
        }
    }

    protected get isValueDefined() {
        if (this.multiple && Array.isArray(this.value)) {
            return CollectionUtils.any(this.value);
        }

        return super.isValueDefined;
    }

    private get hasItems(): boolean{
        return CommonUtils.isDefined(this.localData) && CollectionUtils.any(this.localData.filter(i => !i.isDefault));
    }

    private get isPageableData() {
        return CommonUtils.isDefined(this.loader);
    }

    private get isLoadAsyncDataOnInit(): boolean {
        return CommonUtils.isAsyncData(this.data) && this.isLoadDataOnInit;
    }

    // need load async data only if value defined or need load on init
    private get isLoadDataOnInit(): boolean {
        return this.isLoadOnInit || this.isValueDefined;
    }

    private get isInfScrollImmediateCallback() {
        return this.isPageableData && this.isLoadDataOnInit && !this.loadMoreButton;
    }

    private get isLoadMoreBtnImmediateCallback() {
        return this.isPageableData && this.isLoadDataOnInit && this.loadMoreButton;
    }

    private setLoaderByConfig() {
        if (this.httpConfig) {
            if (this.httpConfig.isPageable) {
                this.loader = () => this.httpUtils.getDataByConfig<ILoadMoreData<ISelectData | ISelectDataGroup> | ISelectData[] | ISelectDataGroup[]>(this.httpConfig);
            } else {
                this.data = this.httpUtils.getDataByConfig<ISelectData[] | ISelectDataGroup[]>(this.httpConfig as HttpConfig<ISelectData[] | ISelectDataGroup[]>);
            }
        }
    }

    // css classes for dropdown options
    private getOptionClasses(item: ISelectData | IOptGroupOption, child: HTMLElement) {
        const classes = {};

        if (this.isItemSelected(item)) {
            this.setActiveOption(classes, child);
        } else {
            // handle for multiple state (disable default item if value not empty)
            if (this.multiple && item.isDefault && this.isValueDefined) {
                classes[StyleClass.Disabled] = true;
            }
        }

        if (this.isOptGroup) {
            const optGroupItem = item as IOptGroupOption;

            if (optGroupItem.isOptGroupOption) {
                classes[CommonConstants.SELECT_INPUT.OPT_GROUP_OPTION_CLASS] = true;
            }

            if (optGroupItem.isOptGroup) {
                classes[CommonConstants.SELECT_INPUT.OPT_GROUP_CLASS] = true;
            }
        }

        return classes;
    }

    private isItemSelected(item: ISelectData) {
        if (this.isOptGroup) {
            return this.optGroupSelected(item as IOptGroupOption);
        } else if (this.multiple) {
            return CollectionUtils.hasItem(this.value as Array<string>, item.key);
        } else {
            return this.value === item.key;
        }
    }

    // get value to display (single, multiple and grouped)
    private get displayValue(): string {
        if (this.isOptGroup) {
            return this.getDisplayValue(this.optGroupSelected.bind(this));
        } else if (this.multiple) {
            return this.getMultipleDisplayValue();
        } else {
            return this.getDisplayValue(i => i.key === this.value);
        }
    }

    private setOptionValue(event: any, item: ISelectData): void {
        if (event.stopPropagation)
            event.stopPropagation();

        if (this.isFocus) {
            if (this.isOptGroup) {
                this.setOptGroupOption(event, item as IOptGroupOption);
            } else if (this.multiple) {
                this.setMultipleOption(event, item);
            } else {
                this.onChange(item.key);
            }
        }
    }

    // OPT GROUP    

    private optGroupSelected(item: IOptGroupOption): boolean {
        let optGroupValue = this.value as IOptGroupValue;
        return optGroupValue && item.key === optGroupValue.key && item.groupKey === optGroupValue.groupKey
    }

    private setOptGroupSettings() {
        // check if data for group select component
        this.isOptGroup = this.setIsOptGroup();

        if (this.isOptGroup) {
            this.prepareOptGroupData();
        }
    }

    private prepareOptGroupData() {
        const innerData: ISelectDataGroup[] = this.localData;
        this.localData = [] as IOptGroupOption[];

        for (let group of innerData) {
            this.localData.push({ value: group.value, key: group.key, isOptGroup: true });
            group.options.forEach(element => {
                element.isOptGroupOption = true;
                element.groupKey = group.key
            });

            this.localData = this.localData.concat(group.options);
        }
    }

    private setOptGroupOption(event: any, item: IOptGroupOption) {
        // do not close dropdown for group deliminator
        if (item.isOptGroup) {
            if (event.preventDefault)
                event.preventDefault();
        }

        if (item.isOptGroupOption || item.isDefault) {
            this.onChange({ key: item.key, groupKey: item.groupKey } as IOptGroupValue);
        }
    }

    private setIsOptGroup(): boolean {
        return CollectionUtils.any(this.localData) && 'options' in this.localData[0];
    }

    // END OPT GROUP

    // MULTIPLE

    private getMultipleDisplayValue() {
        let selectedItemsKeys = this.value as Array<string>;
        if (CollectionUtils.any(this.localData) && CollectionUtils.any(selectedItemsKeys)) {
            let selectedValues = [];

            this.localData.forEach(function (item) {
                let findItem = selectedItemsKeys.find(i => i === item.key);

                if (findItem || (findItem === null && item.isDefault)) {
                    selectedValues.push(item.value);
                }
            });

            return selectedValues.join(', ');
        }
    }

    private setMultipleOption(event: any, item: ISelectData) {
        if (event.preventDefault)
            event.preventDefault();

        let multipleValue = this.value = Object.assign([], this.value) as Array<string>,
            itemIndex = multipleValue.findIndex(i => i === item.key);

        if (itemIndex !== CommonConstants.NOT_FOUND_INDEX) {
            multipleValue.splice(itemIndex, 1);
        } else {
            if (item.isDefault) {
                let notDefaultItemIndex = multipleValue.findIndex(i => i !== this.defaultDisplayValue.key);
                if (notDefaultItemIndex === CommonConstants.NOT_FOUND_INDEX) {
                    multipleValue.push(item.key);
                }
            } else {
                multipleValue.push(item.key);
                let defaultItemIndex = multipleValue.findIndex(i => i === this.defaultDisplayValue.key);
                if (defaultItemIndex !== CommonConstants.NOT_FOUND_INDEX) {
                    multipleValue.splice(defaultItemIndex, 1);
                }
            }
        }

        this.onChange(this.value);
    }

    // END MULTIPLE

    private openDropdown(event: Event) {
        if (!this.isLoadDataOnInit) {

            if (this.isLoadedData || this.isLoadingData)
                return;

            if (this.isPageableData) {
                this.infinityScroll.immediateCallback = !this.loadMoreButton;
            } else if (CommonUtils.isAsyncData(this.data)) {
                this.loadAsyncData(this.data as Observable<ISelectData[] | ISelectDataGroup[]>);
            }
        }
    }

    private loadData() {
        if (this.isLoadAsyncDataOnInit) {
            this.loadAsyncData(this.data as Observable<ISelectData[] | ISelectDataGroup[]>);
        }
        else {
            if (!this.isPageableData && !CommonUtils.isAsyncData(this.data)) { 
                this.initData(this.data);
            }
        }
    }

    private loadAsyncData(dataObservable: Observable<ISelectData[] | ISelectDataGroup[]>) {
        this.loaderService.showLoader(this.id, true);
        this.isLoadingData = true;

        dataObservable.subscribe(
            data => this.initData(data),
            error => console.log(error),
            () => this.setLoaded(true)
        );
    }

    initData(data: any) {
        this.localData = Object.assign([], data);
        this.setOptGroupSettings();
        this.setDefaultOption();
    }

    private setDefaultOption() {
        if (this.showDefaultOption) {

            if (!CommonUtils.isDefined(this.defaultDisplayValue.isDefault)) {
                this.defaultDisplayValue.isDefault = true;
            }

            this.localData.unshift(this.defaultDisplayValue);
        }
    }

    private getDisplayValue(predicate: (n: ISelectData) => boolean) {
        if (this.value) {
            const item = CollectionUtils.getItem<ISelectData>(this.localData, predicate);
            return item ? item.value : null;
        }

        return null;
    }

    private setActiveOption(classes: any, child: HTMLElement) {
        classes[StyleClass.Selected] = true;
        if (!this.isAlreadyScrolled) {
            this.setSelectedScroll(child);
        }
    }

    // move scrollbar to active option (first if multiple) 
    private setSelectedScroll(child: HTMLElement) {
        if (child && child.offsetTop !== 0 && child.parentElement.scrollTop === 0) {
            child.parentElement.scrollTop = child.parentElement.scrollTop +
                child.offsetTop - child.parentElement.offsetHeight / 2 + child.offsetHeight / 2;
            this.isAlreadyScrolled = true;
        }
    }   

    private toggleLoading(isLoading: boolean) {
        if (isLoading)
            this.loaderService.showLoader(this.id);
        else
            this.loaderService.hideLoader(this.id);

        this.isLoadingData = isLoading;
    }

    private setLoaded(isObs: boolean) {
        if (isObs)
            this.loaderService.hideLoader(this.id);

        this.isLoadingData = false;
        this.isLoadedData = true;
    }

    //IPageable - before start load next page
    onLoadMore() {
        setTimeout(() => this.toggleLoading(true), 0);
    }

    //IPageable - after next page was loaded
    updateData(data: ILoadMoreData<ISelectData | ISelectDataGroup>) {

        if (data) {
            if (!this.isLoadedData) {
                this.initData(data.Items);
                this.setLoaded(false);
            } else {
                this.localData = this.localData.concat(data.Items);
            }
        }

        this.toggleLoading(false);
    }
}