import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: 'sfc-text-input input'
})
export class InputRefDirective {
    isOnFocus: boolean;

    constructor() {
        this.isOnFocus = false;
    }

    @HostListener('focus')
    onFocus() {
        this.isOnFocus = true;
    }

    @HostListener('blur')
    onBlur() {
        this.isOnFocus = false;
    }
}