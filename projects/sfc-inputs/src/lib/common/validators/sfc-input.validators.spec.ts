import { FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TextAreaRequired } from './sfc-text-area-required.validator';
import SfcValidators from './sfc-input.validators';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../sfc-inputs.module';

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
});