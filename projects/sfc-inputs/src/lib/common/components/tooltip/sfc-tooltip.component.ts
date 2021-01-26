import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { LocationType, TooltipType } from '../../constants/common-constants';
import { CommonUtils } from '../../utils/common-utils';

@Component({
    selector: '[sfc-tooltip]',
    templateUrl: './sfc-tooltip.component.html',
    styleUrls: ['./sfc-tooltip.component.css']
})
export class TooltipComponent implements OnInit {

    @Input('sfc-tooltip')
    @HostBinding('attr.data-sfc-tooltip')
    displayValue: string;

    @Input('sfc-tooltip-type')
    @HostBinding('attr.sfc-tooltip-type')
    type = TooltipType.Hover;

    @Input('sfc-tooltip-location')
    @HostBinding('attr.sfc-tooltip-location')
    location = LocationType.Top;

    @Input('sfc-show-tooltip')
    @HostBinding('class.showTooltip')
    showTooltip: boolean;

    @HostListener('click')
    onClick() {
        if (this.type == TooltipType.Click) {
            this.showTooltip = !this.showTooltip;
        }
    }

    ngOnInit(): void {
        this.location = CommonUtils.isNullOrEmptyString(this.location) ? LocationType.Top : this.location;
        this.type = CommonUtils.isNullOrEmptyString(this.type) ? TooltipType.Hover : this.type;
    }
}