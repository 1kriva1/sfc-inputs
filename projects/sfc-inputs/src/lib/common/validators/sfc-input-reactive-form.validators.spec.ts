import { FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TextAreaRequired } from './sfc-text-area-required.validator';
import SfcValidators from './sfc-input.validators';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../sfc-inputs.module';

@Component({
    template: `
        <form [formGroup]="form">
            <sfc-text-area-input name="text-area-input" label="First Name" formControlName="textAreaField">
            </sfc-text-area-input>   
        </form>
        `
})
export class ReativeFormTestComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            textAreaField: ['', [SfcValidators.TextAreaRequired]]
        });
    }
}

describe('Validators: Reactive form', () => {
    let component: ReativeFormTestComponent;
    let fixture: ComponentFixture<ReativeFormTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [ReativeFormTestComponent, TextAreaRequired],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ReativeFormTestComponent);
            component = fixture.componentInstance;           

            component.ngOnInit();
            fixture.detectChanges();
        });
    }));

    it('Validator (Reactive form): TextAreaRequired validation failed', () => {
        const invalidValue = '\n\n\n';
        let textAreaField = component.form.controls['textAreaField'];
        textAreaField.setValue(invalidValue);

        expect(component.form.valid).toBeFalsy();
        expect(textAreaField.valid).toBeFalsy();
        expect(textAreaField.errors['textAreaRequired']).toBeTruthy();
    });

    it('Validator (Reactive form): TextAreaRequired validation success', () => {
        const validValue = 'firstline \n second line';
        let textAreaField = component.form.controls['textAreaField'];
        textAreaField.setValue(validValue);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });
});