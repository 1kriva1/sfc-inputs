import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class SfcValidators {
    static TextAreaRequired(control: AbstractControl) {

        if (control.value === null || control.value === undefined) {
            return { textAreaRequired: true };
        }

        const valueWithoutEscapeChars = control.value.replace(/\r?\n/g, "\\n").replace(/\\n/g, "");

        if (valueWithoutEscapeChars === '') {
            return { textAreaRequired: true };
        }

        return null;
    }

    static FileMaxSize(maxSize: number): ValidatorFn {
        const validatorFn = (file: File) => {
            if (file instanceof File && file.size > maxSize) {
                return { fileMinSize: { requiredSize: maxSize, actualSize: file.size, file } };
            }
        };
        return SfcValidators.fileValidation(validatorFn);
    }

    static FileMinSize(minSize: number): ValidatorFn {
        const validatorFn = (file: File) => {
            if (file instanceof File && file.size < minSize) {
                return { fileMinSize: { requiredSize: minSize, actualSize: file.size, file } };
            }
        };
        return SfcValidators.fileValidation(validatorFn);
    }

    /**
     * extensions must not contain dot
     */
    static FileExtensions(allowedExtensions: Array<string>): ValidatorFn {
        const validatorFn = (file: File) => {
            if (allowedExtensions.length === 0) {
                return null;
            }

            if (file instanceof File) {
                const ext = SfcValidators.getExtension(file.name);
                if (allowedExtensions.indexOf(ext) === -1) {
                    return { fileExtension: { allowedExtensions: allowedExtensions, actualExtension: file.type, file } };
                }
            }
        };
        return SfcValidators.fileValidation(validatorFn);
    }

    private static getExtension(filename: string): null | string {
        if (filename.indexOf('.') === -1) {
            return null;
        }
        return filename.split('.').pop();
    }

    private static fileValidation(validatorFn: (File) => null | object): ValidatorFn {
        return (formControl: AbstractControl) => {
            if (!formControl.value) {
                return null;
            }

            const files: File[] = [];
            const isMultiple = Array.isArray(formControl.value);
            isMultiple
                ? formControl.value.forEach((file: File) => files.push(file))
                : files.push(formControl.value);

            for (const file of files) {
                return validatorFn(file);
            }

            return null;
        };
    }
}