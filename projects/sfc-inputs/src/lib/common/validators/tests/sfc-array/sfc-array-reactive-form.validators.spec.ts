import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import SfcValidators from '../../sfc-input.validators';
import { SfcInputsModule } from '../../../../sfc-inputs.module';

@Component({
    template: `
        <form [formGroup]="form">
            <sfc-tags-input id="demo-input-field" formControlName="tagsField"></sfc-tags-input>
        </form>
        `
})
export class ArrayValuesReativeFormTestComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            tagsField: [null, [SfcValidators.MinLength(1), SfcValidators.MaxLength(3)]]
        });
    }
}

describe('Validators: Array values - Reactive form', () => {
    let component: ArrayValuesReativeFormTestComponent;
    let fixture: ComponentFixture<ArrayValuesReativeFormTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [ArrayValuesReativeFormTestComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ArrayValuesReativeFormTestComponent);
            component = fixture.componentInstance;

            component.ngOnInit();
            fixture.detectChanges();
        });
    }));

    it('MaxLength: validation failed', () => {
        const value = ['test1', 'test2', 'test3', 'test4'],
            expectedResult = { requiredLength: 3, actualLength: 4, value: value },
            tagsField = component.form.controls['tagsField'];

        tagsField.setValue(value);

        expect(component.form.valid).toBeFalsy();
        expect(tagsField.valid).toBeFalsy();
        expect(tagsField.errors['maxLength']).toEqual(expectedResult);
    });

    it('MaxLength: validation success', () => {
        const value = ['test1', 'test2', 'test3'],
            tagsField = component.form.controls['tagsField'];

        tagsField.setValue(value);

        expect(component.form.valid).toBeTruthy();
        expect(tagsField.valid).toBeTruthy();
        expect(tagsField.errors).toBeNull();
    });

    it('MaxLength: value is NOT an array', () => {
        const value = 'test1',
            tagsField = component.form.controls['tagsField'];

        tagsField.setValue(value);

        expect(component.form.valid).toBeTruthy();
        expect(tagsField.valid).toBeTruthy();
        expect(tagsField.errors).toBeNull();
    });

    it('MaxLength: value is NULL', () => {
        const value = null,
            tagsField = component.form.controls['tagsField'];

        tagsField.setValue(value);

        expect(component.form.valid).toBeTruthy();
        expect(tagsField.valid).toBeTruthy();
        expect(tagsField.errors).toBeNull();
    });

    it('MinLength: validation failed', () => {
        const value = [],
            expectedResult = { requiredLength: 1, actualLength: 0, value: value },
            tagsField = component.form.controls['tagsField'];

        tagsField.setValue(value);

        expect(component.form.valid).toBeFalsy();
        expect(tagsField.valid).toBeFalsy();
        expect(tagsField.errors['minLength']).toEqual(expectedResult);
    });

    it('MinLength: validation success', () => {
        const value = ['test1'],
            tagsField = component.form.controls['tagsField'];

        tagsField.setValue(value);

        expect(component.form.valid).toBeTruthy();
        expect(tagsField.valid).toBeTruthy();
        expect(tagsField.errors).toBeNull();
    });

    it('MinLength: value is NOT an array', () => {
        const value = 1,
            tagsField = component.form.controls['tagsField'];

        tagsField.setValue(value);

        expect(component.form.valid).toBeTruthy();
        expect(tagsField.valid).toBeTruthy();
        expect(tagsField.errors).toBeNull();
    });

    it('MinLength: value is NULL', () => {
        const value = null,
            tagsField = component.form.controls['tagsField'];

        tagsField.setValue(value);

        expect(component.form.valid).toBeTruthy();
        expect(tagsField.valid).toBeTruthy();
        expect(tagsField.errors).toBeNull();
    });
});