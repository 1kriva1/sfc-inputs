import { Component, Self, Optional, ChangeDetectorRef, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import ISelectData from '../common/interfaces/ISelectData';
import { StyleClass, CommonConstants } from '../common/constants/common-constants';
import ISelectDataGroup from '../common/interfaces/ISelectDataGroup';
import { CollectionUtils } from '../common/utils/collection-utils';
import { UIUtils } from '../common/utils/ui-utils';

@Component({
    selector: 'sfc-select-input',
    templateUrl: './sfc-select-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-select-input.component.css', './sfc-select-input-dark-theme.component.css']
})
export class SelectInputComponent extends BaseInputComponent implements OnInit {

    private readonly OPT_GROUP_OPTION_CLASS = "optgroup-option";

    private readonly OPT_GROUP_CLASS = "optgroup";

    private readonly FOCUSED_LABEL_CLASS = "isFocus";

    @Input()
    defaultDisplayValue: ISelectData = { value: "Choose your option", key: -1, isDefault: true };

    @Input()
    showDefaultOption: boolean = true;

    @Input()
    isMultiple: boolean = false;

    @Input()
    data: any;

    private isOptGroup: boolean;

    private localData: any;

    @ViewChild('inputSelect', { static: false }) selectInput: ElementRef;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef, private collectionUtils: CollectionUtils, private uiUtils: UIUtils) {
        super(ngControl, changeDetector);
    }

    get dropdownClasses() {
        return this.isFocus ? StyleClass.Active : null;
    }

    getOptionClasses(item: ISelectData) {
        const classes = {};

        if (this.isOptGroup) {

            if (this.value && this.value.key === item.key && this.value.groupKey === item.groupKey) {
                classes[StyleClass.Selected] = true;
            }

        } else if (this.isMultiple) {
            if (this.collectionUtils.hasItem(this.value, item.key)) {
                classes[StyleClass.Selected] = true;
            } else {
                if (item.isDefault && !this.isValueNullOrEmpty) {
                    classes[StyleClass.Disabled] = true;
                }
            }
        } else {
            if (this.value === item.key) {
                classes[StyleClass.Selected] = true;
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

    isItemSelected(item: ISelectData) {

        if (this.isOptGroup) {
            return this.value && this.value.key === item.key && this.value.groupKey === item.groupKey;
        } else if (this.isMultiple) {
            return this.collectionUtils.hasItem(this.value, item.key);
        } else {
            return this.value === item.key;
        }
    }

    get dynamicSizeStyles() {
        const styles = {},
            selectNativeEl = this.selectInput ? this.selectInput.nativeElement : null,
            width = selectNativeEl ? selectNativeEl.offsetWidth : 0,
            left = selectNativeEl ? selectNativeEl.offsetLeft : 0;

        if (this.isFocus) {
            styles[CommonConstants.CSS_WIDTH] = this.uiUtils.getCssLikePx(width);
            styles[CommonConstants.CSS_LEFT] = this.uiUtils.getCssLikePx(left);
        }

        return styles;
    }

    protected get labelClass() {
        const classes = {};
        classes[super.labelClass] = true;

        if (this.icon) {
            classes[StyleClass.WithIcon] = true;
        }

        if (this.isFocus) {
            classes[this.validationClass] = true;
            classes[this.FOCUSED_LABEL_CLASS] = true;
        }

        return classes;
    }

    protected get iconClass() {
        const classes = super.iconClass;

        if (this.isFocus) {
            classes[this.FOCUSED_LABEL_CLASS] = true;
        }

        return classes;
    }

    private get displayValue(): string {

        if (this.isOptGroup) {

            if (this.value) {
                return this.getDisplayValue(i => i.key === this.value.key && i.groupKey === this.value.groupKey);
            }

        } else if (this.isMultiple) {

            return this.getMultipleDisplayValue();

        } else {

            return this.value ? this.getDisplayValue(i => i.key === this.value) : null;

        }
    }

    setOptionValue(event: any, item: ISelectData): void {
        if (this.isMultiple) {

            this.setMultipleOption(event, item);

        } else if (this.isOptGroup) {

            this.setOptGroupOption(event, item);

        }
        else {
            this.onChange(item.key);
        }
    }

    ngOnInit(): void {
        this.localData = Object.assign([], this.data);
        this.isOptGroup = this.localData && Array.isArray(this.localData) && this.localData.length > 0
            && this.instanceOfSelectData(this.localData[0]);

        if (this.isOptGroup) {
            this.isMultiple = false;
            this.prepateOptGroupData();
        }

        if (this.isMultiple && !this.value) {
            this.value = [];
        }

        if (this.showDefaultOption) {

            if (this.defaultDisplayValue.isDefault === null || this.defaultDisplayValue.isDefault == undefined) {
                this.defaultDisplayValue.isDefault = true;
            }

            this.localData.unshift(this.defaultDisplayValue);
        }
    }

    openDropdownContent() {
        if (!this.isFocus) {
            this.selectInput.nativeElement.focus();
        }
    }

    private instanceOfSelectData(object: any): object is ISelectDataGroup {
        return 'options' in object
    }

    private prepateOptGroupData() {
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

        let itemIndex = this.value.findIndex(i => i === item.key);

        if (itemIndex !== CommonConstants.NOT_FOUND_INDEX) {
            this.value.splice(itemIndex, 1);
        } else {
            if (item.isDefault) {
                let notDefaultItemIndex = this.value.findIndex(i => i !== this.defaultDisplayValue.key);
                if (notDefaultItemIndex === CommonConstants.NOT_FOUND_INDEX) {
                    this.value.push(item.key);
                }
            } else {
                this.value.push(item.key);
                let defaultItemIndex = this.value.findIndex(i => i === this.defaultDisplayValue.key);
                if (defaultItemIndex !== CommonConstants.NOT_FOUND_INDEX) {
                    this.value.splice(defaultItemIndex, 1);
                }
            }
        }

        this.onChange(this.value);
    }

    private setOptGroupOption(event: any, item: ISelectData) {
        if (item.isOptGroupOption || item.isDefault) {
            this.onChange({ key: item.key, groupKey: item.groupKey });
        } else {
            if (event.preventDefault)
                event.preventDefault();
        }
    }

    private getMultipleDisplayValue() {
        let selectedItemsKeys = this.value,
            selectedValues = [];

        this.localData.forEach(function (item) {
            let findItem = selectedItemsKeys.find(i => i === item.key);

            if (findItem || (findItem === null && item.isDefault)) {
                selectedValues.push(item.value);
            }
        });

        return selectedValues.join(", ");
    }

    private getDisplayValue(predicate: (n: ISelectData) => boolean) {
        if (this.localData && this.localData.length > 0) {

            let dataValue = this.localData.find(predicate);

            return dataValue ? dataValue.value : null;
        }
    }
}