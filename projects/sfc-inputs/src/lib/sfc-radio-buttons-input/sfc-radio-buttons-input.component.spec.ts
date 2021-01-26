import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { RadioButtonsInputComponent } from './sfc-radio-buttons-input.component';
import { InputPosition, RadioButtonsInputLabelType } from '../common/constants/common-constants';
import IRadioButtonsData from '../common/interfaces/radio-buttons/IRadioButtonsData';
import { Observable } from 'rxjs';

describe('Component: RadioButtonsInputComponent', () => {

    let component: RadioButtonsInputComponent;
    let fixture: ComponentFixture<RadioButtonsInputComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(RadioButtonsInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();
        });
    }));

    it("RadioButtonsInputComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: should add class to icon element", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
    });

    it("RadioButtons container: data is empty - show loader", () => {
        const radioButtonContainer = el.query(By.css('div.radio-buttons-wrapper')),
            loaderEl = el.query(By.css('app-bounce-loader'));

        expect(radioButtonContainer).toBeNull();
        expect(loaderEl).toBeDefined();
    });

    it("RadioButtons container: data is empty - loader attributes", () => {
        component.id = 'test-id';
        fixture.detectChanges();
        const loaderEl = el.query(By.css('app-bounce-loader'));

        expect(loaderEl).toBeDefined();
        // expect(loaderEl.attributes['ng-reflect-background']).toEqual('true');
        expect(loaderEl.attributes['ng-reflect-id']).toEqual(component.id);
        expect(loaderEl.attributes['ng-reflect-size']).toEqual('small');
        // expect(loaderEl.attributes['ng-reflect-start']).toEqual('true');
    });

    it("RadioButtons container: data is NOT empty - show container", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioButtonContainer = el.query(By.css('div.radio-buttons-wrapper')),
            loaderEl = el.query(By.css('app-bounce-loader'));

        expect(radioButtonContainer).toBeDefined();
        expect(loaderEl).toBeNull();
    });

    it("RadioButtons container: data (async) is NOT empty - before and after container existance", () => {
        const radioButtonContainerBefore = el.query(By.css('div.radio-buttons-wrapper')),
            loaderElBefore = el.query(By.css('app-bounce-loader'));

        expect(radioButtonContainerBefore).toBeNull();
        expect(loaderElBefore).toBeDefined();

        component.data = mockObservable();
        component.ngOnInit();
        fixture.detectChanges();

        const radioButtonContainerAfter = el.query(By.css('div.radio-buttons-wrapper')),
            loaderElAfter = el.query(By.css('app-bounce-loader'));

        expect(radioButtonContainerAfter).toBeDefined();
        expect(loaderElAfter).toBeNull();
    });

    it("RadioButtons container: default position type", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioButtonContainer = el.query(By.css('div.radio-buttons-wrapper'));

        expect(radioButtonContainer.nativeElement.classList.contains(InputPosition.Vertical)).toBeTruthy();
    });

    it("RadioButtons container: Horizontal position type", () => {
        component.position = InputPosition.Horizontal;
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioButtonContainer = el.query(By.css('div.radio-buttons-wrapper'));

        expect(radioButtonContainer.nativeElement.classList.contains(InputPosition.Horizontal)).toBeTruthy();
    });

    it("RadioButtons container: radio buttons count", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioButtonsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container'));

        expect(radioButtonsElements).toBeDefined();
        expect(radioButtonsElements.length).toEqual(4);
    });

    it("Inputs: should create input elements", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        expect(radioInputsElements).toBeDefined();
        expect(radioInputsElements.length).toEqual(4);
    });

    it("Inputs: default id value", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        for (let index = 0; index < radioInputsElements.length; index++) {
            let idTest = index + 1;
            expect(radioInputsElements[index].nativeElement.id).toEqual('sfc--' + idTest);
        }
    });

    it("Inputs: id value", () => {
        component.id = 'test-id';
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        for (let index = 0; index < radioInputsElements.length; index++) {
            let idTest = index + 1;
            expect(radioInputsElements[index].nativeElement.id).toEqual('sfc-' + component.id + '-' + idTest);
        }
    });

    it("Inputs: radio type", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        radioInputsElements.forEach(input => {
            expect(input.nativeElement.type).toEqual('radio');
        });
    });

    it("Inputs: values", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        for (let index = 0; index < radioInputsElements.length; index++) {
            let valueTest = index + 1;
            expect(radioInputsElements[index].nativeElement.value).toEqual('' + valueTest);
        }
    });

    it("Inputs: disabled default value", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        radioInputsElements.forEach(input => {
            expect(input.nativeElement.disabled).toBeFalsy();
        });
    });

    it("Inputs: set disabled", () => {
        component.disabled = true;
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        radioInputsElements.forEach(input => {
            expect(input.nativeElement.disabled).toBeTruthy();
        });
    });

    it("Inputs: second item is disabled", () => {
        component.data = getSyncData(true);
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        for (let index = 0; index < radioInputsElements.length; index++) {
            let valueTest = index + 1;
            let input = radioInputsElements[index];

            if (valueTest === 2) {
                expect(input.nativeElement.disabled).toBeTruthy();
            } else {
                expect(input.nativeElement.disabled).toBeFalsy();
            }
        }
    });

    it("Inputs: change event", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();
        const radioInputFirstElement = el.query(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio][value="1"].sfc-input'));

        radioInputFirstElement.triggerEventHandler('input', { target: { nativeElement: radioInputFirstElement.nativeElement, checked: true } });
        fixture.detectChanges();

        expect(radioInputFirstElement.nativeElement.checked).toEqual(true);
    });

    it("Inputs: third item is checked by default", () => {
        component.data = getSyncData(false, true);
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        for (let index = 0; index < radioInputsElements.length; index++) {
            let valueTest = index + 1;
            let input = radioInputsElements[index];

            if (valueTest === 3) {
                expect(input.nativeElement.checked).toBeTruthy();
            } else {
                expect(input.nativeElement.checked).toBeFalsy();
            }
        }
    });

    it("Inputs: third item is checked by default but defined value = 2", () => {
        component.writeValue(2);
        component.data = getSyncData(false, true);
        component.ngOnInit();
        fixture.detectChanges();

        const radioInputsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container input[type=radio].sfc-input'));

        for (let index = 0; index < radioInputsElements.length; index++) {
            let valueTest = index + 1;
            let input = radioInputsElements[index];

            if (valueTest === 2) {
                expect(input.nativeElement.checked).toBeTruthy();
            } else {
                expect(input.nativeElement.checked).toBeFalsy();
            }
        }
    });

    it("Label: for attribute", () => {
        component.id = 'test-id';
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const labelsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container label'));

        for (let index = 0; index < labelsElements.length; index++) {
            let idTest = index + 1;
            expect(labelsElements[index].nativeElement.getAttribute("for")).toEqual('sfc-' + component.id + '-' + idTest);
        }
    });

    it("Label: icon type (default)", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const labelsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container label > div'));

        labelsElements.forEach(input => {
            expect(input.nativeElement.className).toEqual(RadioButtonsInputLabelType.Circle);
        });
    });

    it("Label: icon type - fourth has custom icon", () => {
        component.data = getSyncData(false, false, true);
        component.ngOnInit();
        fixture.detectChanges();

        const labelsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container label > div'));

        for (let index = 0; index < labelsElements.length; index++) {
            let valueTest = index + 1;
            let input = labelsElements[index];

            if (valueTest === 4) {
                expect(input.nativeElement.className).toEqual(RadioButtonsInputLabelType.Icons);
            } else {
                expect(input.nativeElement.className).toEqual(RadioButtonsInputLabelType.Circle);
            }
        }
    });

    it("Label: inner text value", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        const labelsElements = el.queryAll(By.css('div.radio-buttons-wrapper div.radio-container label span.text'));

        for (let index = 0; index < labelsElements.length; index++) {
            let valueTest = index + 1;
            expect(labelsElements[index].nativeElement.innerText).toEqual('option ' + valueTest);
        }
    });

    it("Helper text: not exist if data is not defined", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeNull();
    });

    it("Helper text: should create element with permanent class value", () => {
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = 'test helper text';
        component._helperText = helperTextAssertValue;
        component.data = getSyncData();
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    function getSyncData(secondDisabled: boolean = false, isThirdIsDefault: boolean = false,
        fourthHasCustomIcon: boolean = false): IRadioButtonsData[] {
        return [{
            key: 1,
            value: "option 1"
        },
        {
            key: 2,
            value: "option 2",
            isDisabled: secondDisabled
        },
        {
            key: 3,
            value: "option 3",
            isDefault: isThirdIsDefault
        },
        {
            key: 4,
            value: "option 4",
            icon: fourthHasCustomIcon ? 'fa fa-star' : null
        }];
    }

    function mockObservable() {
        const testData: IRadioButtonsData[] = [{
            key: 1,
            value: "option async 1"
        },
        {
            key: 2,
            value: "option async 2"
        },
        {
            key: 3,
            value: "option async 3"
        },
        {
            key: 4,
            value: "option async 4"
        }];
        return Observable.of<IRadioButtonsData[]>(testData);
    }
});