import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
    selector: 'sfc-tags-chip',
    templateUrl: './sfc-tags-chip.component.html',
    styleUrls: ['./sfc-tags-chip.component.css', './sfc-tags-chip-dark-theme.component.css']
})
export class TagsChipComponent {

    /**
     * chip display value
     */
    @Input('display-value')
    displayValue: string;

    /**
     * image path in chip component
     */
    @Input()
    image: string;

    /**
     * disallow to remove chip
     */
    @Input()
    @HostBinding('class.disabled')
    disabled: boolean;

    /**
     * Parent handler for remove chip
     */
    @Output()
    removed = new EventEmitter<string>();

    /**
     * remove chip (notify parent component)
     */
    onRemove() {
        if (this.removed) {
            this.removed.emit(this.displayValue);
        }
    }
}