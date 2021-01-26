import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import SfcValidators from './sfc-input.validators';

@Directive({
    selector: '[file-extensions]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: FileExtensions }
    ]
})
export class FileExtensions {
    @Input('file-extensions') allowedExtensions: string[];

    validate(control: AbstractControl): { [key: string]: any } | null {
        return SfcValidators.FileExtensions(this.allowedExtensions)(control);
    }
}