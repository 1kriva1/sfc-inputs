import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FileUtils } from '../utils/file-utils';
import { CommonUtils } from '../utils/common-utils';
import { CollectionUtils } from '../utils/collection-utils';

export default class SfcValidators {
    static TextAreaRequired() {
        const validatorFn: ValidatorFn = (value: any) => {

            if (!CommonUtils.isDefined(value)) {
                return { textAreaRequired: true };
            }

            return value.replace(/\r?\n/g, "\\n").replace(/\\n/g, "") === ''
                ? { textAreaRequired: true }
                : null;
        }

        return SfcValidators.validation(validatorFn);
    }

    static EqualOrInclude(includes: any | Array<any>): ValidatorFn {

        const validatorFn: ValidatorFn = (value: any) => {

            if (Array.isArray(includes)) {
                if (includes.length > 0) {
                    if (Array.isArray(value)) {
                        for (let index = 0; index < value.length; index++) {
                            const element = value[index];
                            let result = SfcValidators.equalOrIncludeArrayOfValues(element, includes);

                            if (result) {
                                return result;
                            }
                        }
                    } else {
                        return SfcValidators.equalOrIncludeArrayOfValues(value, includes);
                    }
                }
            } else {
                if (Array.isArray(value)) {
                    for (let index = 0; index < value.length; index++) {
                        const element = value[index];

                        if (element instanceof Object) {
                            return JSON.stringify(includes) !== JSON.stringify(element) ? { equalOrInclude: true } : null;
                        } else {
                            return value.includes(includes) ? null : { equalOrInclude: true };
                        }
                    }
                } else {
                    if (value instanceof Object) {
                        return JSON.stringify(includes) !== JSON.stringify(value) ? { equalOrInclude: true } : null;
                    } else {
                        return value !== includes ? { equalOrInclude: true } : null;
                    }
                }
            }

            return null;
        };

        return SfcValidators.validation(validatorFn);
    }

    static FileMaxSize(maxSize: number): ValidatorFn {
        const validatorFn = (file: File) => {
            if (file instanceof File && file.size > maxSize) {
                return { fileMaxSize: { requiredSize: maxSize, actualSize: file.size, file } };
            }

            return null;
        };
        return SfcValidators.validation(validatorFn);
    }

    static FileMinSize(minSize: number): ValidatorFn {
        const validatorFn = (file: File) => {
            if (file instanceof File && file.size < minSize) {
                return { fileMinSize: { requiredSize: minSize, actualSize: file.size, file } };
            }

            return null;
        };
        return SfcValidators.validation(validatorFn);
    }

    static FileExtensions(allowedExtensions: Array<string>): ValidatorFn {
        const validatorFn = (file: File) => {
            if (!CollectionUtils.any(allowedExtensions)) {
                return null;
            }

            if (file instanceof File) {
                const ext = FileUtils.getFileExtension(file);
                if (allowedExtensions.indexOf(ext) === -1) {
                    return { fileExtension: { allowedExtensions: allowedExtensions, actualExtension: ext, file } };
                }
            }

            return null;
        };
        return SfcValidators.validation(validatorFn);
    }

    // Private methods

    private static validation(validatorFn: (any) => null | object): ValidatorFn {
        return (formControl: AbstractControl) => {
            return CommonUtils.isDefined(formControl) ? validatorFn(formControl.value) : null;
        };
    }

    private static validationMultiple(validatorFn: (any) => null | object): ValidatorFn {
        return (formControl: AbstractControl) => {
            if (!formControl.value) {
                return null;
            }

            const values: any[] = [];
            const isMultiple = Array.isArray(formControl.value);
            isMultiple
                ? formControl.value.forEach((value: any) => values.push(value))
                : values.push(formControl.value);

            for (const value of values) {
                return validatorFn(value);
            }

            return null;
        };
    }

    private static equalOrIncludeArrayOfValues(element: any, includes: Array<any>) {
        if (element instanceof Object) {
            let found: boolean = false;
            for (let index = 0; index < includes.length; index++) {
                const item = includes[index];
                if (JSON.stringify(item) === JSON.stringify(element)) {
                    found = true;
                    break;
                }
            }

            return found ? null : { equalOrInclude: true };
        } else {
            return includes.includes(element) ? null : { equalOrInclude: true };
        }
    }

    // END Private methods
}