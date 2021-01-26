import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { Component } from '@angular/core';
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
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeFalsy();
        expect(fileField.valid).toBeFalsy();
        expect(fileField.errors['fileMaxSize']).toEqual(expectedResult);
    });

    it('FileMaxSize: validation success', () => {
        const mockFile = getHugeFile('testFile.jpg', 512),
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });

    it('FileMaxSize: value is NOT a file', () => {
        const mockFile = {test: 1},
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });

    it('FileMaxSize: value is NULL', () => {
        const mockFile = null,
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });

    it('FileMinSize: validation failed', () => {
        const mockFile = getHugeFile('testFile.jpg', 256),
            expectedResult = { requiredSize: 512, actualSize: 256, file: mockFile },
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeFalsy();
        expect(fileField.valid).toBeFalsy();
        expect(fileField.errors['fileMinSize']).toEqual(expectedResult);
    });

    it('FileMinSize: validation success', () => {
        const mockFile = getHugeFile('testFile.jpg', 1024),
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });

    it('FileMinSize: value is NOT a file', () => {
        const mockFile = {test: 1},
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });

    it('FileMinSize: value is NULL', () => {
        const mockFile = null,
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });

    it('FileExtensions: validation failed', () => {
        const mockFile = getHugeFile('testFile.png', 1024),
            allowedExtensions = ["jpg", "jpeg"],
            expectedResult = { allowedExtensions: allowedExtensions, actualExtension: 'png', file: mockFile },
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeFalsy();
        expect(fileField.valid).toBeFalsy();
        expect(fileField.errors['fileExtension']).toEqual(expectedResult);
    });

    it('FileExtensions: validation success', () => {
        const mockFile = getHugeFile('testFile.jpg', 1024),
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });

    it('FileExtensions: value is NOT a file', () => {
        const mockFile = {test: 1},
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });

    it('FileExtensions: value is NULL', () => {
        const mockFile = null,
            fileField = component.form.controls['fileField'];
        fileField.setValue(mockFile);

        expect(component.form.valid).toBeTruthy();
        expect(fileField.valid).toBeTruthy();
        expect(fileField.errors).toBeNull();
    });
});