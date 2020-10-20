import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { TooltipType } from '../../constants/common-constants';

@Component({
    selector: '[sfc-tooltip]',
    templateUrl: './sfc-tooltip.component.html',
    styleUrls: ['./sfc-tooltip.component.css']
})
export class TooltipComponent {

    @Input('sfc-tooltip')
    @HostBinding('attr.data-sfc-tooltip')
    displayValue: string;

    @Input('sfc-tooltip-type')
    @HostBinding('attr.sfc-tooltip-type')
    type = TooltipType.Hover;

    @Input('sfc-show-tooltip')
    @HostBinding('class.showTooltip')
    showTooltip: boolean;

    @HostListener('click')
    onClick() {
        if (this.type == TooltipType.Click) {
            this.showTooltip = !this.showTooltip;
        }
    }
}