import { Component, Self, Optional, ChangeDetectorRef, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UIUtils } from '../common/utils/ui-utils';
import BaseTextInputComponent from '../common/components/sfc-base-text-input.component';
import { CommonConstants } from '../common/constants/common-constants';

@Component({
    selector: 'sfc-text-area-input',
    templateUrl: './sfc-text-area-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css', './sfc-text-area-input.component.css']
})
export class TextAreaInputComponent extends BaseTextInputComponent {

    @ViewChild("textarea", { static: false })
    protected textareaElement: ElementRef;    

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef, protected renderer: Renderer2, protected elementRef: ElementRef) {
            super(ngControl, changeDetector, renderer, elementRef);
    }

    ngAfterViewInit(): void {
        this.alignTextAreHeight();
        super.ngAfterViewInit();
    }

    get charCounterValue(): string {
        //Think about this:  this.value.replace(/\r?\n/g, "");
        const requiredCounter = super.getCharCounterValue();
        return requiredCounter ? requiredCounter :  this.value.length ? this.value.length.toString() : '';
    }

    onKeyUp(event: KeyboardEvent) {
        if(event.keyCode === CommonConstants.ENTER_KEY_CODE || event.keyCode === CommonConstants.BACKSPACE_KEY_CODE)
            this.alignTextAreHeight();
    }

    private alignTextAreHeight() {
        this.textareaElement.nativeElement.style.height = UIUtils.getCssLikePx(0);
        this.textareaElement.nativeElement.style.height = UIUtils.getCssLikePx(this.textareaElement.nativeElement.scrollHeight);
    }
}