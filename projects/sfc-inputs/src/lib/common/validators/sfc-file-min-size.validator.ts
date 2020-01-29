import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[file-min-size]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: FileMinSize }
    ]
})
export class FileMinSize {
    @Input('file-min-size') fileMinSize: number;

    validate(control: AbstractControl): { [key: string]: any } | null {
        return SfcValidators.FileMinSize(this.fileMinSize)(control);
    }
}