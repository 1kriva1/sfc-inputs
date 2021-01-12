import { Component, HostBinding, Input } from '@angular/core';
import { StyleClass } from '../../constants/common-constants';

@Component({
    selector: 'sfc-button',
    templateUrl: './sfc-button.component.html',
    styleUrls: ['./sfc-button.component.css']
})
export class ButtonComponent {
    @Input()
    text: string;

    @Input()
    icon: string;

    @Input()
    @HostBinding('class.' + StyleClass.Disabled)
    disabled:boolean;

    protected get iconClass() {
        const classes = {};

        if (this.icon) {
            // example: fa fa-star
            const iconParts = this.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }
}