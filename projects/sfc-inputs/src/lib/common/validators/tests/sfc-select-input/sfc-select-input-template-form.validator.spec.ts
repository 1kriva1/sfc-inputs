import { FormsModule, FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../../../sfc-inputs.module';
import { EqualOrInclude } from '../../sfc-include.validator';
import ISelectData from '../../../interfaces/ISelectData';
import ISelectDataGroup from '../../../interfaces/ISelectDataGroup';


@Component({
    template: `
      <form>
        <sfc-select-input 
            id="select-input"
            name="select-input" 
            [data]="data"
            ngModel
            [equal-or-include]="[1,3]">
        </sfc-select-input>

        <sfc-select-input 
            id="select-input-opt-group"
            name="select-input-opt-group" 
            [data]="datagroup"
            ngModel
            [equal-or-include]="[{key: 1, groupKey: 1},{key: 1, groupKey: 2}]">
        </sfc-select-input>
      </form>
    `
})
class SelectInputFormTemplateTestComponent {
    private data: ISelectData[];
    private datagroup: ISelectDataGroup[];

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
    }
}

describe('Validators: SelectInput - Template form', () => {

    let fixture: ComponentFixture<SelectInputFormTemplateTestComponent>;
    let el: DebugElement;
    let debugSelectInputEl: DebugElement;
    let debugSelectOptGroupInputEl: DebugElement;
    let form: NgForm;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [SelectInputFormTemplateTestComponent, EqualOrInclude],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SelectInputFormTemplateTestComponent);
            el = fixture.debugElement;

            fixture.detectChanges();

            debugSelectInputEl = el.query(By.css('#sfc-select-input'));
            debugSelectOptGroupInputEl = el.query(By.css('#select-input-opt-group'));
            form = el.children[0].injector.get(NgForm);
        });
    }));

    it('EqualOrInclude: single - not object - validation failed', (() => {
        const templateSelectInputControl = form.control.get('select-input');
        debugSelectInputEl.componentInstance.ngControl.control.setValue(2);
        fixture.detectChanges();

        expect(templateSelectInputControl.hasError('equalOrInclude')).toBeTruthy();
        expect(templateSelectInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('EqualOrInclude: single - not object - validation success', (() => {
        const templateSelectInputControl = form.control.get('select-input');
        debugSelectInputEl.componentInstance.ngControl.control.setValue(1);
        fixture.detectChanges();

        expect(templateSelectInputControl.hasError('equalOrInclude')).toBeFalsy();
        expect(templateSelectInputControl.errors).toBeNull();
        expect(templateSelectInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));

    it('EqualOrInclude: single - object - validation failed', (() => {
        const templateSelectInputControl = form.control.get('select-input-opt-group');
        debugSelectOptGroupInputEl.componentInstance.ngControl.control.setValue({key: 2, groupKey: 1});
        fixture.detectChanges();

        expect(templateSelectInputControl.hasError('equalOrInclude')).toBeTruthy();
        expect(templateSelectInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('EqualOrInclude: single - object - validation success', (() => {
        const templateSelectInputControl = form.control.get('select-input-opt-group');
        debugSelectOptGroupInputEl.componentInstance.ngControl.control.setValue({key: 1, groupKey: 1});
        fixture.detectChanges();

        expect(templateSelectInputControl.hasError('equalOrInclude')).toBeFalsy();
        expect(templateSelectInputControl.errors).toBeNull();
        expect(templateSelectInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));

    it('EqualOrInclude: multiple - not object - validation failed', (() => {
        const templateSelectInputControl = form.control.get('select-input');
        debugSelectInputEl.componentInstance.ngControl.control.setValue([2, 4]);
        fixture.detectChanges();

        expect(templateSelectInputControl.hasError('equalOrInclude')).toBeTruthy();
        expect(templateSelectInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('EqualOrInclude: multiple - not object - validation success', (() => {
        const templateSelectInputControl = form.control.get('select-input');
        debugSelectInputEl.componentInstance.ngControl.control.setValue([1, 3]);
        fixture.detectChanges();

        expect(templateSelectInputControl.hasError('equalOrInclude')).toBeFalsy();
        expect(templateSelectInputControl.errors).toBeNull();
        expect(templateSelectInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));

    it('EqualOrInclude: multiple - object - validation failed', (() => {
        const templateSelectInputControl = form.control.get('select-input-opt-group');
        debugSelectOptGroupInputEl.componentInstance.ngControl.control.setValue([{key: 1, groupKey: 2}, {key: 2, groupKey: 2}]);
        fixture.detectChanges();

        expect(templateSelectInputControl.hasError('equalOrInclude')).toBeTruthy();
        expect(templateSelectInputControl.valid).toBeFalsy();
        expect(form.control.valid).toBeFalsy();
    }));

    it('EqualOrInclude: multiple - object - validation success', (() => {
        const templateSelectInputControl = form.control.get('select-input-opt-group');
        debugSelectOptGroupInputEl.componentInstance.ngControl.control.setValue([{key: 1, groupKey: 2}, {key: 1, groupKey: 1}]);
        fixture.detectChanges();

        expect(templateSelectInputControl.hasError('equalOrInclude')).toBeFalsy();
        expect(templateSelectInputControl.errors).toBeNull();
        expect(templateSelectInputControl.valid).toBeTruthy();
        expect(form.control.valid).toBeTruthy();
    }));
});