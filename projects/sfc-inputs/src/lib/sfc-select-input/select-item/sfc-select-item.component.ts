import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonConstants, StyleClass } from '../../common/constants/common-constants';
import IOptGroupOption from '../../common/interfaces/select-input/IOptGroupOption';
import IOptGroupValue from '../../common/interfaces/select-input/IOptGroupValue';
import ISelectData from '../../common/interfaces/select-input/ISelectData';
import { CollectionUtils } from '../../common/utils/collection-utils';
import { CommonUtils } from '../../common/utils/common-utils';

@Component({
    selector: 'sfc-select-item',
    templateUrl: './sfc-select-item.component.html',
    styleUrls: ['./sfc-select-item.component.css', './sfc-select-item-dark-theme.component.css']
})
export class SelectItemComponent {

    @Input()
    item: ISelectData | IOptGroupOption;

    @Input()
    value: any;

    @Input()
    multiple: boolean = false;

    @Input('opt-group')
    isOptGroup: boolean = false;

    @Input('default-display-key')
    defaultDisplayKey: any;

    @Output('selected')
    selected: EventEmitter<any> = new EventEmitter<any>();

    constructor(public elementRef: ElementRef) { }

    /**
     * is item is selected
     */
    public get isSelected() {
        return this.isItemSelected(this.item);
    }

    private get isValueDefined() {
        return this.multiple ? CollectionUtils.any(this.value) : CommonUtils.isDefined(this.value);
    }

    private setOptionValue(event: MouseEvent): void {
        if (event.stopPropagation)
            event.stopPropagation();

        if (this.isOptGroup) {
            this.setOptGroupOption(event, this.item as IOptGroupOption);
        } else if (this.multiple) {
            this.setMultipleOption(event, this.item);
        } else {
            this.selected.emit(this.item.key);
        }
    }

    private setOptGroupOption(event: any, item: IOptGroupOption) {
        // do not close dropdown for group deliminator
        if (item.isOptGroup) {
            if (event.preventDefault)
                event.preventDefault();
        }

        if (item.isOptGroupOption || item.isDefault) {
            this.selected.emit({ key: item.key, groupKey: item.groupKey } as IOptGroupValue);
        }
    }

    private setMultipleOption(event: any, item: ISelectData) {
        if (event.preventDefault)
            event.preventDefault();

        let multipleValue = this.value = Object.assign([], this.value) as Array<string>,
            itemIndex = multipleValue.findIndex(i => i === item.key);

        if (itemIndex === CommonConstants.NOT_FOUND_INDEX) {
            if (item.isDefault) {
                let notDefaultItemIndex = multipleValue.findIndex(i => i !== this.defaultDisplayKey);
                if (notDefaultItemIndex === CommonConstants.NOT_FOUND_INDEX) {
                    multipleValue.push(item.key);
                }
            } else {
                multipleValue.push(item.key);
                let defaultItemIndex = multipleValue.findIndex(i => i === this.defaultDisplayKey);
                if (defaultItemIndex !== CommonConstants.NOT_FOUND_INDEX) {
                    multipleValue.splice(defaultItemIndex, 1);
                }
            }
            
        } else {
            multipleValue.splice(itemIndex, 1);
        }

        this.selected.emit(this.value);
    }

    // css classes for dropdown options
    private get optionClasses() {
        const classes = {};

        if (this.isItemSelected(this.item)) {
            classes[StyleClass.Selected] = true;
        } else {
            // handle for multiple state (disable default item if value not empty)
            if (this.multiple && this.item && this.item.isDefault && this.isValueDefined) {
                classes[StyleClass.Disabled] = true;
            }
        }

        if (this.isOptGroup) {
            const optGroupItem = this.item as IOptGroupOption;

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
            return this.optGroupSelected(item);
        } else if (this.multiple) {
            return CommonUtils.isDefined(item) ? CollectionUtils.hasItem(this.value, item.key) : false;
        } else {
            return this.value === item.key;
        }
    }

    private optGroupSelected(item: IOptGroupOption): boolean {
        let optGroupValue = this.value as IOptGroupValue;
        return optGroupValue && item.key === optGroupValue.key && item.groupKey === optGroupValue.groupKey
    }
}