import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import SfcValidators from '../../sfc-input.validators';
import { SfcInputsModule } from '../../../../sfc-inputs.module';
import ISelectData from '../../../interfaces/select-input/ISelectData';
import ISelectDataGroup from '../../../interfaces/select-input/ISelectDataGroup';
import { HttpClientModule } from '@angular/common/http';

@Component({
    template: `
        <form [formGroup]="form">
            <sfc-select-input id="select-input" formControlName="selectField" [data]="data"></sfc-select-input>
            <sfc-select-input id="select-input-opt-group" formControlName="selectOptGroupField" [data]="datagroup"></sfc-select-input>
        </form>
        `
})
export class SelectInputReativeFormTestComponent {
    form: FormGroup;
    private data: ISelectData[];
    private datagroup: ISelectDataGroup[];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.data = [{
            key: 1,
            value: "option 1"
        },
        {
            key: 2,
            value: "option 2"
        },
        {
            key: 3,
            value: "option 3"
        },
        {
            key: 4,
            value: "option 4"
        },
        {
            key: 5,
            value: "option 5"
        }];

        this.datagroup = [
            {
                key: 1,
                value: "group one",
                options: [{
                    key: 1,
                    value: "option 1"
                },
                {
                    key: 2,
                    value: "option 2"
                },
                {
                    key: 3,
                    value: "option 3"
                },
                {
                    key: 4,
                    value: "option 4"
                },
                {
                    key: 5,
                    value: "option 5"
                }]
            },
            {
                key: 2,
                value: "group two",
                options: [{
                    key: 1,
                    value: "option 1 2"
                },
                {
                    key: 2,
                    value: "option 2 2"
                },
                {
                    key: 3,
                    value: "option 3 2"
                },
                {
                    key: 4,
                    value: "option 4 2"
                },
                {
                    key: 5,
                    value: "option 5 2"
                }]
            }
        ];
        this.form = this.fb.group({
            selectField: ['', [SfcValidators.EqualOrInclude([1, 3])]],
            selectOptGroupField: ['', [SfcValidators.EqualOrInclude([{
                key: 1,
                groupKey: 1
            }, {
                key: 1,
                groupKey: 2
            }])]]
        });
    }
}

describe('Validators: FileInput - Reactive form', () => {
    let component: SelectInputReativeFormTestComponent;
    let fixture: ComponentFixture<SelectInputReativeFormTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SfcInputsModule],
            declarations: [SelectInputReativeFormTestComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SelectInputReativeFormTestComponent);
            component = fixture.componentInstance;

            component.ngOnInit();
            fixture.detectChanges();
        });
    }));

    it('EqualOrInclude: single - not object - validation failed', () => {
        const selectField = component.form.controls['selectField'];
        selectField.setValue(2);

        expect(selectField.valid).toBeFalsy();
        expect(selectField.errors['equalOrInclude']).toBeTruthy();
    });

    it('EqualOrInclude: single - not object - validation success', () => {        
        const selectField = component.form.controls['selectField'];
        selectField.setValue(1);

        expect(selectField.valid).toBeTruthy();
        expect(selectField.errors).toBeNull();
    });

    it('EqualOrInclude: single - object - validation failed', () => {
        const selectField = component.form.controls['selectOptGroupField'];
        selectField.setValue({key: 2, groupKey: 1});

        expect(selectField.valid).toBeFalsy();
        expect(selectField.errors['equalOrInclude']).toBeTruthy();
    });

    it('EqualOrInclude: single - object - validation success', () => {
        const selectField = component.form.controls['selectOptGroupField'];
        selectField.setValue({key: 1, groupKey: 1});

        expect(selectField.valid).toBeTruthy();
        expect(selectField.errors).toBeNull();
    });

    it('EqualOrInclude: multiple - not object - validation failed', () => {
        const selectField = component.form.controls['selectField'];
        selectField.setValue([2, 1]);

        expect(selectField.valid).toBeFalsy();
        expect(selectField.errors['equalOrInclude']).toBeTruthy();
    });

    it('EqualOrInclude: multiple - not object - validation success', () => {
        const selectField = component.form.controls['selectField'];
        selectField.setValue([3, 1]);

        expect(selectField.valid).toBeTruthy();
        expect(selectField.errors).toBeNull();
    });

    it('EqualOrInclude: multiple - object - validation failed', (() => {
        const selectField = component.form.controls['selectOptGroupField'];
        selectField.setValue([{key: 2, groupKey: 1}, {key: 1, groupKey: 1}]);

        expect(selectField.valid).toBeFalsy();
        expect(selectField.errors['equalOrInclude']).toBeTruthy();
    }));

    it('EqualOrInclude: multiple - object - validation success', (() => {
        const selectField = component.form.controls['selectOptGroupField'];
        selectField.setValue([{key: 1, groupKey: 1}, {key: 1, groupKey: 2}]);

        expect(selectField.valid).toBeTruthy();
        expect(selectField.errors).toBeNull();
    }));
});