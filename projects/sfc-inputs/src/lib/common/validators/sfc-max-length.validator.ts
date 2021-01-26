import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[max-length]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: MaxLength }
    ]
})
export class MaxLength {
    @Input('max-length') maxLength: number;

    validate(control: AbstractControl): { [key: string]: any } | null {
        return SfcValidators.MaxLength(this.maxLength)(control);
    }
}