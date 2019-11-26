import { Component, OnInit, Input, ContentChild, AfterContentInit, HostBinding } from '@angular/core';
import { InputRefDirective } from '../common/input-ref.directive';

@Component({
    selector: 'sfc-text-input',
    templateUrl: './sfc-text-input.component.html',
    styleUrls: ['./sfc-text-input.component.css',
        './sfc-text-input-default-theme.css',
        './sfc-text-input-red-theme.css']
})
export class TextInputComponent implements OnInit, AfterContentInit {


    @Input()
    icon: string;

    @ContentChild(InputRefDirective, { static: false })
    input: InputRefDirective;

    constructor() {

    }

    ngOnInit(): void {

    }

    ngAfterContentInit(): void {
        console.log('input is: ' + this.input);
    }

    @HostBinding('class.input-focus')
    get isInputFocus() {
        return this.input ? this.input.isOnFocus : false;
    }

    get classes() {
        const classes = {}
        if (this.icon) {
            classes['fa-' + this.icon] = true;
        }
        return classes;
    }
}