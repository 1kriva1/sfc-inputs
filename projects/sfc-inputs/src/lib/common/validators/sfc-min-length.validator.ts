import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[min-length]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: MinLength }
    ]
})
export class MinLength {
    @Input('min-length') minLength: number;

    validate(control: AbstractControl): { [key: string]: any } | null {
        return SfcValidators.MinLength(this.minLength)(control);
    }
}