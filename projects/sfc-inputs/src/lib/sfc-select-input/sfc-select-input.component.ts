import { Component, Self, Optional, ChangeDetectorRef, Input, ElementRef, ViewChild, OnInit, AfterViewInit, HostListener, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import ISelectData from '../common/interfaces/ISelectData';
import { StyleClass, CommonConstants } from '../common/constants/common-constants';
import ISelectDataGroup from '../common/interfaces/ISelectDataGroup';
import { CollectionUtils } from '../common/utils/collection-utils';
import { UIUtils } from '../common/utils/ui-utils';
import { Observable } from 'rxjs';
import { LoaderService } from '../common/components/loader/base/sfc-loader.service';
import { IHttpConfig } from '../common/interfaces/IHttpConfig';
import HttpUtils from '../common/utils/http-utils';
import ISelectPagedModel from 'src/select-input-app/select-paged.model';
import { InfiniteScrollerDirective } from '../common/directives/infinite-scroll/sfc-infinite-scroll.directive';
import { CommonUtils } from '../common/utils/common-utils';
import { IPageable } from '../common/interfaces/IPageable';
import { ILoadMoreData } from '../common/interfaces/ILoadMoreData';

@Component({
    selector: 'sfc-select-input',
    templateUrl: './sfc-select-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-select-input.component.css', './sfc-select-input-dark-theme.component.css']
})
export class SelectInputComponent extends BaseInputComponent<string | Array<string> | ISelectData> implements OnInit, AfterViewInit, OnChanges, IPageable<ILoadMoreData> {

    // class name for group option
    private readonly OPT_GROUP_OPTION_CLASS = "optgroup-option";

    // class name for group deliminator
    private readonly OPT_GROUP_CLASS = "optgroup";

    // indicate focus state for icon and label
    private readonly FOCUSED_LABEL_CLASS = "isFocus";

    private readonly LOADING_CLASS = "isLoading"

    @Input("default-display-value")
    defaultDisplayValue: ISelectData = { value: "Choose your option", key: -1, isDefault: true };


    _showDefaultOption: boolean = true;

    @Input("show-default-option")
    set showDefaultOption(value: boolean) {

        this._showDefaultOption = value;

        if (this.localData) {
            let defaultItemIndex = this.localData.findIndex(i => i.isDefault);

            if (value) {
                if (defaultItemIndex === CommonConstants.NOT_FOUND_INDEX) {
                    this.localData.unshift(this.defaultDisplayValue);
                }
            } else {
                if (defaultItemIndex !== CommonConstants.NOT_FOUND_INDEX) {
                    this.localData.splice(defaultItemIndex, 1);
                }
            }
        }
    }

    get showDefaultOption() {
        return this._showDefaultOption;
    }

    // TRUE - multiple selection
    @Input()
    multiple: boolean = false;

    // load data (subscribe) on component init
    @Input("load-on-init")
    isLoadOnInit: boolean = false;

    // component data (simple array of objects or obsevable)
    @Input()
    data: any; //ISelectData[] | ISelectDataGroup | Observable<ISelectData[]>;

    // function for pageable data loading
    @Input()
    loader: () => Observable<ILoadMoreData>;

    @Input("load-more-button")
    loadMoreButton: boolean = false;

    @Input("http-data-config")
    httpConfig: IHttpConfig;

    // check if component must behave as group select
    private isOptGroup: boolean;

    // local variable to store data
    private localData: any;


    private isLoadingData: boolean = false;

    private isLoadedData: boolean = false;

    private isFirstOpen: boolean = true;

    // for click outside directive
    //private isOpen: boolean = false;


    // input element ref (can focus manualy and can set dymamic size for select data container)
    @ViewChild('inputSelect', { static: false })
    private inputSelectElementRef: ElementRef;

    // UL element ref (set scroll position)
    @ViewChild('ulSelect', { static: false })
    private ulSelectElementRef: ElementRef;

    // infinity scroll directive (can start load data immediately)
    // if data pageable and isLoadOnInit = FALSE we can open dropdown and start load data from infinity scroll directive
    @ViewChild(InfiniteScrollerDirective, { static: false })
    private infinityScroll: InfiniteScrollerDirective;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        private loaderService: LoaderService,
        private httpUtils: HttpUtils<any>) {
        super(ngControl, changeDetector);
    }

    // @HostListener('document:click', ['$event'])
    // clickout(event) {
    //     if (this.eRef.nativeElement.contains(event.target)) {
    //         //this.text = "clicked inside";
    //     } else {
    //         //this.text = "clicked outside";
    //         this.isOpen = false;
    //     }
    // }

    // onClickOutside(event:Object) {
    //     if(event && event['value'] === true) {
    //       this.isOpen = false;
    //     }
    //   }    

    ngOnInit(): void {
        this.initComponent();

        if (this.httpConfig) {
            this.loader = () => this.httpUtils.getDataByConfig(this.httpConfig);
        }
    }

    ngAfterViewInit(): void {
        if (this.isLoadOnInit || this.isValueDefined) {
            this.loadData();
            this.changeDetector.detectChanges();
        }
    }

    ngOnChanges(changes: any) {
        // if data changes update local data
        if (changes.data && !changes.data.firstChange) {
            this.initData(changes.data.currentValue);
        }
    }

    protected get isValueDefined() {
        let isDefined = super.isValueDefined;

        if (Array.isArray(this.value)) {
            return isDefined && this.value.length > 0;
        }

        return isDefined;
    }

    protected get labelClass() {
        const classes = {};

        classes[super.labelClass] = true;

        if (this.isLoadingData) {
            classes[StyleClass.Active] = true;
        }

        if (this.icon) {
            classes[StyleClass.WithIcon] = true;
        }

        if (this.isFocus) {
            classes[this.validationClass] = true;

            // css prevent to click opened dropdown
            classes[this.FOCUSED_LABEL_CLASS] = true;
        }

        return classes;
    }

    protected get iconClass() {
        const classes = super.iconClass;

        // css prevent to click opened dropdown
        if (this.isFocus) {
            classes[this.FOCUSED_LABEL_CLASS] = true;
        }

        return classes;
    }

    protected get placeholder(): string {
        return super.placeholder && !this.isLoadingData ? this._placeholder : '';
    }

    get dropdownClasses() {
        const classes = {};

        if (this.isLoadingData) {
            classes[this.LOADING_CLASS] = true;
        }

        if (this.isFocus) {
            classes[StyleClass.Active] = true;
        }

        return classes;
    }

    // set size for dropdown container depend on input size
    private get dynamicSizeStyles() {
        const styles = {},
            selectNativeEl = this.inputSelectElementRef ? this.inputSelectElementRef.nativeElement : null,
            width = selectNativeEl ? selectNativeEl.offsetWidth : 0,
            left = selectNativeEl ? selectNativeEl.offsetLeft : 0;

        if (this.isFocus) {
            styles[CommonConstants.CSS_WIDTH] = UIUtils.getCssLikePx(width + 1);
            styles[CommonConstants.CSS_LEFT] = UIUtils.getCssLikePx(left);
        }

        return styles;
    }

    // check if immediate callback for pageable data
    private get isImediateCallback(): boolean {
        return this.isLoadOnInit || this.isValueDefined;
    }

    // get value to display (single, multiple and grouped)
    private get displayValue(): string {
        if (this.isOptGroup) {
            let optGroupValue = this.value as ISelectData;
            return optGroupValue ? this.getDisplayValue(i => i.key === optGroupValue.key && i.groupKey === optGroupValue.groupKey) : null;
        } else if (this.multiple) {
            return this.getMultipleDisplayValue();
        } else {
            return this.value ? this.getDisplayValue(i => i.key === this.value) : null;
        }
    }

    // css classes for dropdown options
    private getOptionClasses(item: ISelectData, child: HTMLElement) {
        const classes = {};

        if (this.isItemSelected(item)) {
            this.setActiveOption(classes, child);
        } else {
            // handle for multiple state (disable default item if value not empty)
            if (this.multiple && item.isDefault && this.isValueDefined) {
                classes[StyleClass.Disabled] = true;
            }
        }

        if (item.isOptGroupOption) {
            classes[this.OPT_GROUP_OPTION_CLASS] = true;
        }

        if (item.isOptGroup) {
            classes[this.OPT_GROUP_CLASS] = true;
        }

        return classes;
    }

    private isItemSelected(item: ISelectData) {
        if (this.isOptGroup) {
            let optGroupValue = this.value as ISelectData;
            return optGroupValue && optGroupValue.key === item.key && optGroupValue.groupKey === item.groupKey;
        } else if (this.multiple) {
            return CollectionUtils.hasItem<string>(this.value as Array<string>, item.key);
        } else {
            return this.value === item.key;
        }
    }

    private setOptionValue(event: any, item: ISelectData): void {
        if (this.multiple) {
            this.setMultipleOption(event, item);
        } else if (this.isOptGroup) {
            this.setOptGroupOption(event, item);
        }
        else {
            this.onChange(item.key);
        }
    }

    // open dropdown via label or icon
    private openDropdownContent() {
        if (!this.isFocus) { //  && this.isLoadedData
            this.inputSelectElementRef.nativeElement.focus();
        }
    }

    private openDropdown() {
        //this.isOpen = !this.isOpen;

        if (this.isLoadOnInit)
            return;

        if (!this.isLoadedData && !this.isImediateCallback) {

            if (!this.loadMoreButton && this.loader) {
                this.infinityScroll.immediateCallback = true;
            }
        }

        this.loadData();
    }

    private loadData() {

        if (this.isLoadedData || this.isLoadingData)
            return;

        if (this.data instanceof Observable) {
            this.loaderService.showLoader(this.id);
            this.isLoadingData = true;

            this.data.subscribe(data => {
                this.initData(data);
                this.setLoaded(true);
            });
        }
        else {
            if (this.data) {
                this.initData(this.data);
                this.setLoaded(false);
            }
        }
    }

    initData(data: any) {
        this.localData = Object.assign([], data);
        this.setOptGroupSettings();
        this.setDefaultOption();
    }

    private setOptGroupSettings() {
        // check if data for group select component
        this.isOptGroup = this.setIsOptGroup(this.localData);

        if (this.isOptGroup) {
            this.multiple = false;
            this.prepareOptGroupData();
        }
    }

    private initComponent() {
        this.localData = Object.assign([], this.data);

        if (this.multiple && !this.value) {
            this.value = [];
        }

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

    private prepareOptGroupData() {
        const innerData: ISelectDataGroup[] = this.localData;
        this.localData = [];

        for (let group of innerData) {
            this.localData.push({ value: group.value, key: group.key, isOptGroup: true });
            group.options.forEach(element => {
                element.isOptGroupOption = true;
                element.groupKey = group.key
            });

            this.localData = this.localData.concat(group.options);
        }
    }

    private setMultipleOption(event: any, item: ISelectData) {

        if (event.preventDefault)
            event.preventDefault();

        let itemIndex = (this.value as Array<string>).findIndex(i => i === item.key);

        if (itemIndex !== CommonConstants.NOT_FOUND_INDEX) {
            (this.value as Array<string>).splice(itemIndex, 1);
        } else {
            if (item.isDefault) {
                let notDefaultItemIndex = (this.value as Array<string>).findIndex(i => i !== this.defaultDisplayValue.key);
                if (notDefaultItemIndex === CommonConstants.NOT_FOUND_INDEX) {
                    (this.value as Array<string>).push(item.key);
                }
            } else {
                (this.value as Array<string>).push(item.key);
                let defaultItemIndex = (this.value as Array<string>).findIndex(i => i === this.defaultDisplayValue.key);
                if (defaultItemIndex !== CommonConstants.NOT_FOUND_INDEX) {
                    (this.value as Array<string>).splice(defaultItemIndex, 1);
                }
            }
        }

        this.onChange(this.value);
    }

    private setOptGroupOption(event: any, item: ISelectData) {

        // do not close dropdown for group deliminator
        if (item.isOptGroup) {
            if (event.preventDefault)
                event.preventDefault();
        }

        if (item.isOptGroupOption || item.isDefault) {
            this.onChange({ key: item.key, groupKey: item.groupKey } as any);
        }
    }

    private getMultipleDisplayValue() {
        if (this.localData && this.localData.length > 0) {
            let selectedItemsKeys = (this.value as Array<string>),
                selectedValues = [];

            this.localData.forEach(function (item) {
                let findItem = selectedItemsKeys.find(i => i === item.key);

                if (findItem || (findItem === null && item.isDefault)) {
                    selectedValues.push(item.value);
                }
            });

            return selectedValues.join(", ");
        }
    }

    private getDisplayValue(predicate: (n: ISelectData) => boolean) {
        if (this.localData && this.localData.length > 0) {

            let dataValue = this.localData.find(predicate);

            return dataValue ? dataValue.value : null;
        }

        return null;
    }

    // move scrollbar to active option (first if multiple) 
    private setSelectedScroll(child: HTMLElement) {
        if (child && child.offsetTop !== 0 && this.ulSelectElementRef.nativeElement.scrollTop === 0 && this.isFirstOpen) {
            this.ulSelectElementRef.nativeElement.scrollTop = this.ulSelectElementRef.nativeElement.scrollTop +
                child.offsetTop - this.ulSelectElementRef.nativeElement.offsetHeight / 2 + child.offsetHeight / 2;
            this.isFirstOpen = false;
        }
    }

    private setIsOptGroup(data: any): boolean {
        return data &&
            Array.isArray(data) &&
            data.length > 0 &&
            'options' in data[0];
    }

    private setActiveOption(classes: any, child: HTMLElement) {
        classes[StyleClass.Selected] = true;
        this.setSelectedScroll(child);
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
        this.toggleLoading(true);
    }

    //IPageable - after next page was loaded
    updateData(data) {

        if (data) {
            if (!this.localData) {
                this.initData(data);
                this.setLoaded(false);
            } else {
                this.localData = this.localData.concat(data);
            }
        }

        this.toggleLoading(false);
    }
}