import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { TestBed, async } from '@angular/core/testing';
import { TextAreaRequired } from '../sfc-text-area-required.validator';
import SfcValidators from '../sfc-input.validators';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { getHugeFile } from './sfc-input-validator-helper';

describe('Validators', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [TextAreaRequired],
        });
    }));

    it('Validator: TextAreaRequired validation failed', () => {
        const validationResult = SfcValidators.TextAreaRequired()(new FormControl('\n\n\n')),
            expectedResult = { textAreaRequired: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: TextAreaRequired validation failed (empty value)', () => {
        const validationResult = SfcValidators.TextAreaRequired()(new FormControl('')),
            expectedResult = { textAreaRequired: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: TextAreaRequired validation failed (null value)', () => {
        const validationResult = SfcValidators.TextAreaRequired()(new FormControl(null)),
            expectedResult = { textAreaRequired: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: TextAreaRequired validation success', () => {
        const validationResult = SfcValidators.TextAreaRequired()(new FormControl('firstline \n second line')),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileMaxSize validation failed', () => {
        const mockFile = getHugeFile('testFile.jpg', 1024),
            validationResult = SfcValidators.FileMaxSize(10)(new FormControl(mockFile)),
            expectedResult = { fileMaxSize: { requiredSize: 10, actualSize: 1024, file: mockFile } };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileMaxSize validation success', () => {
        const mockFile = getHugeFile('testFile.jpg', 1024),
            validationResult = SfcValidators.FileMaxSize(1024)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileMaxSize value is NOT a file', () => {
        const mockFile = { test: 1 },
            validationResult = SfcValidators.FileMaxSize(1024)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileMaxSize value is NULL', () => {
        const mockFile = null,
            validationResult = SfcValidators.FileMaxSize(1024)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileMinSize validation failed', () => {
        const mockFile = getHugeFile('testFile.jpg', 10),
            validationResult = SfcValidators.FileMinSize(1024)(new FormControl(mockFile)),
            expectedResult = { fileMinSize: { requiredSize: 1024, actualSize: 10, file: mockFile } };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileMinSize validation success', () => {
        const mockFile = getHugeFile('testFile.jpg', 1024),
            validationResult = SfcValidators.FileMinSize(10)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileMinSize value is NOT a file', () => {
        const mockFile = { test: 1 },
            validationResult = SfcValidators.FileMinSize(10)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileMinSize value is NULL', () => {
        const mockFile = null,
            validationResult = SfcValidators.FileMinSize(10)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileExtensions validation failed', () => {
        const mockFile = getHugeFile('testFile.jpg', 10),
            allowedExtensions = ["png", "jpeg"],
            validationResult = SfcValidators.FileExtensions(allowedExtensions)(new FormControl(mockFile)),
            expectedResult = { fileExtension: { allowedExtensions: allowedExtensions, actualExtension: 'jpg', file: mockFile } };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileExtensions validation success', () => {
        const mockFile = getHugeFile('testFile.png', 10),
            allowedExtensions = ["png", "jpeg"],
            validationResult = SfcValidators.FileExtensions(allowedExtensions)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileExtensions allowed extensions is NULL', () => {
        const mockFile = getHugeFile('testFile.png', 10),
            allowedExtensions = null,
            validationResult = SfcValidators.FileExtensions(allowedExtensions)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileExtensions allowed extensions is ampty array', () => {
        const mockFile = getHugeFile('testFile.png', 10),
            allowedExtensions = [],
            validationResult = SfcValidators.FileExtensions(allowedExtensions)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileExtensions value is not a file', () => {
        const mockFile = { test: 1 },
            allowedExtensions = ["png", "jpeg"],
            validationResult = SfcValidators.FileExtensions(allowedExtensions)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - single - not object - validation failed', () => {
        const testValue = 1,
            includes = 3,
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue)),
            expectedResult = { equalOrInclude: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - single - not object - validation success', () => {
        const testValue = 3,
            includes = 3,
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue));
        expect(validationResult).toBeNull();
    });

    it('Validator: EqualOrInclude - single - object - validation failed', () => {
        const testValue = { key: 1, groupKey: 1 },
            includes = { key: 1, groupKey: 2 },
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue)),
            expectedResult = { equalOrInclude: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - single - object - validation success', () => {
        const testValue = { key: 1, groupKey: 2 },
            includes = { key: 1, groupKey: 2 },
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue));
        expect(validationResult).toBeNull();
    });

    it('Validator: EqualOrInclude - multiple - not object - validation failed', () => {
        const testValue = 2,
            includes = [3, 1],
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue)),
            expectedResult = { equalOrInclude: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - multiple - not object - validation success', () => {
        const testValue = 1,
            includes = [3, 1],
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue));
        expect(validationResult).toBeNull();
    });

    it('Validator: EqualOrInclude - multiple - object - validation failed', () => {
        const testValue = { key: 2, groupKey: 1 },
            includes = [{ key: 1, groupKey: 2 }, { key: 1, groupKey: 1 }],
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue)),
            expectedResult = { equalOrInclude: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - multiple - object - validation success', () => {
        const testValue = { key: 1, groupKey: 1 },
            includes = [{ key: 1, groupKey: 2 }, { key: 1, groupKey: 1 }],
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue));
        expect(validationResult).toBeNull();
    });

    it('Validator: EqualOrInclude - multiple value - not object - validation failed', () => {
        const testValue = [1, 2],
            includes = [2, 3],
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue)),
            expectedResult = { equalOrInclude: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - multiple value - not object - validation success', () => {
        const testValue = [3, 2],
            includes = [2, 3],
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue));
        expect(validationResult).toBeNull();
    });

    it('Validator: EqualOrInclude - multiple value - object - validation failed', () => {
        const testValue = [{ key: 1, groupKey: 1 }, { key: 1, groupKey: 2 }],
            includes = [{ key: 2, groupKey: 1 }, { key: 2, groupKey: 2 }],
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue)),
            expectedResult = { equalOrInclude: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - multiple value - object - validation success', () => {
        const testValue = [{ key: 2, groupKey: 1 }, { key: 2, groupKey: 2 }],
            includes = [{ key: 2, groupKey: 1 }, { key: 2, groupKey: 2 }],
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue));
        expect(validationResult).toBeNull();
    });

    it('Validator: EqualOrInclude - not multiple - multiple value - not object - validation failed', () => {
        const testValue = [1, 2],
            includes = 3,
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue)),
            expectedResult = { equalOrInclude: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - not multiple - multiple value - not object - validation success', () => {
        const testValue = [1, 2],
            includes = 2,
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue));
        expect(validationResult).toBeNull();
    });

    it('Validator: EqualOrInclude - not multiple - multiple value - object - validation failed', () => {
        const testValue = [{ key: 1, groupKey: 1 }, { key: 1, groupKey: 2 }],
            includes = { key: 2, groupKey: 1 },
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue)),
            expectedResult = { equalOrInclude: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: EqualOrInclude - not multiple - multiple value - object - validation success', () => {
        const testValue = [{ key: 1, groupKey: 1 }, { key: 1, groupKey: 2 }],
            includes = { key: 1, groupKey: 1 },
            validationResult = SfcValidators.EqualOrInclude(includes)(new FormControl(testValue));
        expect(validationResult).toBeNull();
    });
});

