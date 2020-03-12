import { FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TextAreaRequired } from '../sfc-text-area-required.validator';
import SfcValidators from '../sfc-input.validators';
import { By } from '@angular/platform-browser';
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
        const validationResult = SfcValidators.TextAreaRequired(new FormControl('\n\n\n')),
            expectedResult = { textAreaRequired: true };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: TextAreaRequired validation success', () => {
        const validationResult = SfcValidators.TextAreaRequired(new FormControl('firstline \n second line')),
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

    it('Validator: FileExtensions validation failed', () => {
        const mockFile = getHugeFile('testFile.jpg', 10),
            allowedExtensions = ["png", "jpeg"],
            validationResult = SfcValidators.FileExtensions(allowedExtensions)(new FormControl(mockFile)),
            expectedResult = { fileExtension: { allowedExtensions: allowedExtensions, actualExtension: 'jpg', file: mockFile } };
        expect(validationResult).toEqual(expectedResult);
    });

    it('Validator: FileExtensions validation success', () => {
        const mockFile = getHugeFile('testFile.png', 10),
            allowedExtensions =  ["png", "jpeg"],
            validationResult = SfcValidators.FileExtensions(allowedExtensions)(new FormControl(mockFile)),
            expectedResult = null;
        expect(validationResult).toEqual(expectedResult);
    });

});

