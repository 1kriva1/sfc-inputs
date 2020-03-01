import { Component, Self, Optional, ChangeDetectorRef, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import ISelectData from '../common/interfaces/ISelectData';
import { StyleClass, CommonConstants } from '../common/constants/common-constants';
import ISelectDataGroup from '../common/interfaces/ISelectDataGroup';
import { CollectionUtils } from '../common/utils/collection-utils';
import { UIUtils } from '../common/utils/ui-utils';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'sfc-select-input',
    templateUrl: './sfc-select-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-select-input.component.css']
})
export class SelectInputComponent extends BaseInputComponent implements OnInit {

    private readonly OPT_GROUP_OPTION_CLASS = "optgroup-option";

    private readonly OPT_GROUP_CLASS = "optgroup";

    private readonly FOCUSED_LABEL_CLASS = "isFocus";

    @Input()
    defaultDisplayValue: ISelectData = { value: "Choose your option", key: null, isDefault: true };

    @Input()
    showDefaultOption: boolean = true;

    @Input()
    isMultiple: boolean = false;

    @Input()
    data: any;


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

        if (this.isMultiple) {
            if (this.value.findIndex(i => i === item.key) !== -1) {
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

    get dynamicSizeStyles() {
        const classes = {},
            selectNativeEl = this.selectInput ? this.selectInput.nativeElement : null,
            width = selectNativeEl ? selectNativeEl.offsetWidth : 0,
            left = selectNativeEl ? selectNativeEl.offsetLeft : 0;

        if (this.isFocus) {
            classes[CommonConstants.CSS_WIDTH] = this.uiUtils.getCssLikePx(width);
            classes[CommonConstants.CSS_LEFT] = this.uiUtils.getCssLikePx(left);
        }

        return classes;
    }

    get isOptGroup(): boolean {
        return !Array.isArray(this.data);
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

    // private get isCurrentValueDefault() {
    //     if (this.isMultiple) {
    //         return this.collectionUtils.hasItem(this.value, "isDefault", true)
    //     } else {
    //         return this.value.isDefault;
    //     }
    // }

    private get displayValue(): string {
        let valueText: string;
        if (this.isOptGroup) {

        } else if (this.isMultiple) {
            let selectedItemsKeys = this.value,
                selectedValues = [];

            this.data.forEach(function (item) {
                let findItem = selectedItemsKeys.find(i => i === item.key);

                if (findItem || (findItem === null && item.isDefault)) {
                    selectedValues.push(item.value);
                }
            });

            valueText = selectedValues.join(", ");

        } else {
            if (this.data && this.data.length > 0) {
                let dataValue = this.data.find(i => i.key === this.value);

                if (dataValue) {
                    valueText = dataValue.value;
                }
            }
        }

        return valueText;
    }

    setOptionValue(event: any, item: any): void {
        if (this.isMultiple) {
            event.cancelBubble = true;
            if (event.stopPropagation) {

                event.preventDefault();
            }

            let itemIndex = this.value.findIndex(i => i === item.key);

            if (itemIndex !== -1) {
                this.value.splice(itemIndex, 1);
            } else {

                if (item.isDefault) {
                    if (this.value.findIndex(i => i !== null) === -1) {
                        this.value.push(item.key);
                    }
                } else {
                    this.value.push(item.key);

                    if (!item.isDefault) {
                        let defaultItemIndex = this.value.findIndex(i => i === null);
                        if (defaultItemIndex !== -1) {
                            this.value.splice(defaultItemIndex, 1);
                        }
                    }
                }


            }
            this.onChange(this.value);

            //this.displayValue = this.value.map(a => a.value).join(", ");
            console.log("setOptionValue");
            return;
        } else {
            this.onChange(item.key);
            //this.displayValue = item.value;
        }
    }

    openDropdownContent() {
        this.selectInput.nativeElement.focus();
    }

    ngOnInit(): void {

        if (this.isOptGroup) {
            const groups = Object.keys(this.data),
                innerData = this.data;
            this.data = [];
            for (let group of groups) {
                this.data.push({ value: group, key: null, isOptGroup: true });
                let test = innerData[group];
                test.forEach(element => {
                    element.isOptGroupOption = true;
                });
                this.data = this.data.concat(test);
            }
        }

        if (this.showDefaultOption) {
            this.data.unshift(this.defaultDisplayValue);
        }

        if (this.value !== null && this.value !== undefined) {

            // if (this.isOptGroup) {

            // } else if (this.isMultiple) {
            //     let selectedItemsKeys = this.value,
            //         selectedValues = [];

            //     this.data.forEach(function (item) {
            //         let findItem = selectedItemsKeys.find(i => i === item.key);

            //         if (findItem) {
            //             selectedValues.push(item.value);
            //         }
            //     });

            // } else {
            //     if (this.data && this.data.length > 0) {
            //         let dataValue = this.data.find(i => i.key === this.value);

            //         if (dataValue) {
            //             valueText = dataValue.value;
            //         }
            //     }
            // }

            //this.displayValue = valueText;
        } else {
            if (this.isMultiple) {
                this.value = [];
                if (this.showDefaultOption) {
                    // this.displayValue = this.defaultDisplayValue.value;
                    // this.value.push(this.defaultDisplayValue);
                    // this.onChange(this.value);
                }
            } else {
                if (this.showDefaultOption) {
                    this.value = this.defaultDisplayValue.key;
                    //this.displayValue = this.defaultDisplayValue.value;
                    this.onChange(this.value);
                }
            }
        }

    }
}