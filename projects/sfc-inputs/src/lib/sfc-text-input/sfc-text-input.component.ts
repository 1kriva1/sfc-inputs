import { Component, Self, Optional, ChangeDetectorRef, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseTextInputComponent from '../common/components/sfc-base-text-input.component';

@Component({
    selector: 'sfc-text-input',
    templateUrl: './sfc-text-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css', './sfc-text-input.component.css']
})
export class TextInputComponent extends BaseTextInputComponent implements OnInit{

    @Input()
    type: string = 'text';

    showPasswordEye: boolean;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef, protected renderer: Renderer2, protected elementRef: ElementRef) {
            super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(){
        this.showPasswordEye = this.type == "password";
    }

    onShowPasswordClick(){
        this.type = this.type == "password" ? 'text' : 'password';
    }
}