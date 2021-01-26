import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[file-max-size]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: FileMaxSize }
    ]
})
export class FileMaxSize {
    @Input('file-max-size') fileMaxSize: number;

    validate(control: AbstractControl): { [key: string]: any } | null {
        return SfcValidators.FileMaxSize(this.fileMaxSize)(control);
    }
}