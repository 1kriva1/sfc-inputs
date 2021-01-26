import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[equal-or-include]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: EqualOrInclude }
    ]
})
export class EqualOrInclude {
    @Input('equal-or-include') includes: any | Array<any>;

    validate(control: AbstractControl): { [key: string]: any } | null {
        return SfcValidators.EqualOrInclude(this.includes)(control);
    }
}