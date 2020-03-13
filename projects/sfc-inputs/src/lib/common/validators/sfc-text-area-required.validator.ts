import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[text-area-required]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: TextAreaRequired }
    ]
})
export class TextAreaRequired {
    validate(control: AbstractControl): { [key: string]: any } | null {
        return SfcValidators.TextAreaRequired()(control);
    }
}