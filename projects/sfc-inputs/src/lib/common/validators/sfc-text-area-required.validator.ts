import { NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[text-area-required]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useValue: SfcValidators.TextAreaRequired }
    ]
})
export class TextAreaRequired {
}