import { FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import SfcValidators from '../../sfc-input.validators';
import { SfcInputsModule } from '../../../../sfc-inputs.module';
import { getHugeFile } from '../sfc-input-validator-helper';

@Component({
    template: `
        <form [formGroup]="form">
            <sfc-file-input id="demo-input-field" formControlName="fileField"></sfc-file-input>
        </form>
        `
})
export class FileInputReativeFormTestComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            fileField: ['', [SfcValidators.FileMaxSize(1024), SfcValidators.FileMinSize(512), SfcValidators.FileExtensions(["jpg", "jpeg"])]]
        });
    }
}

describe('Validators: FileInput - Reactive form', () => {
    let component: FileInputReativeFormTestComponent;
    let fixture: ComponentFixture<FileInputReativeFormTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [FileInputReativeFormTestComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(FileInputReativeFormTestComponent);
            component = fixture.componentInstance;

            component.ngOnInit();
            fixture.detectChanges();
        });
    }));

    it('FileMaxSize: validation failed', () => {
        const mockFile = getHugeFile('testFile.jpg', 2048),
            expectedResult = { requiredSize: 1024, actualSize: 2048, file: mockFile },
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeFalsy();
        expect(textAreaField.valid).toBeFalsy();
        expect(textAreaField.errors['fileMaxSize']).toEqual(expectedResult);
    });

    it('FileMaxSize: validation success', () => {
        const mockFile = getHugeFile('testFile.jpg', 512),
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });

    it('FileMaxSize: value is NOT a file', () => {
        const mockFile = {test: 1},
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });

    it('FileMaxSize: value is NULL', () => {
        const mockFile = null,
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });

    it('FileMinSize: validation failed', () => {
        const mockFile = getHugeFile('testFile.jpg', 256),
            expectedResult = { requiredSize: 512, actualSize: 256, file: mockFile },
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeFalsy();
        expect(textAreaField.valid).toBeFalsy();
        expect(textAreaField.errors['fileMinSize']).toEqual(expectedResult);
    });

    it('FileMinSize: validation success', () => {
        const mockFile = getHugeFile('testFile.jpg', 1024),
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });

    it('FileMinSize: value is NOT a file', () => {
        const mockFile = {test: 1},
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });

    it('FileMinSize: value is NULL', () => {
        const mockFile = null,
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });

    it('FileExtensions: validation failed', () => {
        const mockFile = getHugeFile('testFile.png', 1024),
            allowedExtensions = ["jpg", "jpeg"],
            expectedResult = { allowedExtensions: allowedExtensions, actualExtension: 'png', file: mockFile },
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeFalsy();
        expect(textAreaField.valid).toBeFalsy();
        expect(textAreaField.errors['fileExtension']).toEqual(expectedResult);
    });

    it('FileExtensions: validation success', () => {
        const mockFile = getHugeFile('testFile.jpg', 1024),
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });

    it('FileExtensions: value is NOT a file', () => {
        const mockFile = {test: 1},
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });

    it('FileExtensions: value is NULL', () => {
        const mockFile = null,
            textAreaField = component.form.controls['fileField'];
        textAreaField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(textAreaField.valid).toBeTruthy();
        expect(textAreaField.errors).toBeNull();
    });
});