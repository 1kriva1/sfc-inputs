import { SelectInputComponent } from "./sfc-select-input.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { By } from '@angular/platform-browser';
import { StyleClass, CommonConstants } from '../common/constants/common-constants';
import ISelectData from '../common/interfaces/ISelectData';


describe('Component: SelectInputComponent', () => {

    let component: SelectInputComponent;
    let fixture: ComponentFixture<SelectInputComponent>;
    let el: DebugElement;
    let debugTextInputEl: DebugElement;
    let labelEl: HTMLLabelElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SelectInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugTextInputEl = el.query(By.css('input.input-select'));
            labelEl = fixture.nativeElement.querySelector('label');

            fixture.detectChanges();
        });
    }));

    it("Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Label: should exist", async(() => {
        expect(labelEl).toBeTruthy();
    }));

    it("Label: 'for' attribute default value", async(() => {
        let expectedValue = "sfc-";
        expect(labelEl.htmlFor).toEqual(expectedValue)
    }));

    it("Label: 'for' attribute value", async(() => {
        let expectedValue = "sfc-test-id";
        component.id = "test-id";
        fixture.detectChanges();

        expect(labelEl.htmlFor).toEqual(expectedValue)
    }));

    it("Label: html text value default", async(() => {
        expect(labelEl.innerText).toEqual("")
    }));

    it("Label: html text value default", async(() => {
        let expectedValue = "test label";
        component.label = expectedValue;
        fixture.detectChanges();

        expect(labelEl.innerText).toEqual(expectedValue);
    }));

    it("Label: CSS classes default", async(() => {
        expect(labelEl.className).toEqual("")
    }));

    it("Label: CSS classes with placeholder", async(() => {
        component._placeholder = "test placeholder";
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active)
    }));

    it("Label: CSS classes with defined value", async(() => {
        setOptionData(2);
        expect(labelEl.className).toEqual(StyleClass.Active)
    }));

    it("Label: CSS classes with icon", async(() => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.WithIcon)
    }));

    it("Label: CSS classes when focused", async(() => {
        focusTextInput();

        expect(labelEl.classList).not.toBeNull();
        expect(labelEl.classList).not.toBeUndefined();
        expect(labelEl.classList.length).toEqual(2);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(labelEl.classList.contains("isFocus")).toBeTruthy();
    }));

    xit("Label: click event", async(() => {
        component.label = "test label";
        component.data = [{ key: 1, value: "option 1" }, { key: 2, value: "option 2" }];
        component.ngOnInit();
        fixture.detectChanges();

        let labelDebugEl: DebugElement = el.query(By.css('label'));
        labelDebugEl.triggerEventHandler('click', { target: labelDebugEl.nativeElement });

        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');

        expect(labelEl.classList.length).toEqual(2);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(labelEl.classList.contains("isFocus")).toBeTruthy();
        expect(component.dropdownClasses).toEqual(StyleClass.Active);
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: CSS classes default", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains("fa")).toBeTruthy();
        expect(iconEl.classList.contains("fa-user")).toBeTruthy();
    });

    it("Icon: CSS classes when focuse", () => {
        component.icon = "fa fa-user";
        focusTextInput();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl.classList.length).toEqual(5);
        expect(iconEl.classList.contains("isFocus")).toBeTruthy();
    });

    xit("Icon: click event", async(() => {
        debugger;
        component.icon = "fa fa-user";
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');
        iconEl.click();
        fixture.detectChanges();

        expect(iconEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(iconEl.classList.contains("isFocus")).toBeTruthy();
        expect(component.dropdownClasses).toEqual(StyleClass.Active);
    }));

    it("Data: check if data empty with default", async(() => {
        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toBeGreaterThan(0);
        expect(liElements.length).toEqual(1);

        expect(optionsElements.length).toBeGreaterThan(0);
        expect(optionsElements.length).toEqual(1);
    }));

    it("Data: check if data empty without default", async(() => {
        component.showDefaultOption = false;
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(0);
        expect(optionsElements.length).toEqual(0);
    }));

    it("Data: check if data empty with custom default option", async(() => {
        let defaultOptionValue = "Choose your custom option";
        component.defaultDisplayValue = { value: defaultOptionValue, key: -2 };
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toBeGreaterThan(0);
        expect(liElements.length).toEqual(1);
        expect(liElements[0].nativeElement.innerText).toEqual(defaultOptionValue);

        expect(optionsElements.length).toBeGreaterThan(0);
        expect(optionsElements.length).toEqual(1);
        expect(optionsElements[0].nativeElement.innerText).toEqual(defaultOptionValue);
    }));

    it("Text Input: should create element", async(() => {
        expect(debugTextInputEl).toBeTruthy();
    }));

    it("Text Input: value not defined", async(() => {
        expect(debugTextInputEl.nativeElement.value).toEqual("");
    }));

    it("Text Input: value defined", async(() => {
        setOptionData(2);
        expect(debugTextInputEl.nativeElement.value).toEqual("option 2");
    }));

    it("Text Input: Multiple - value defined", async(() => {
        component.isMultiple = true;
        setOptionData([1, 2]);

        expect(debugTextInputEl.nativeElement.value).toEqual("option 1, option 2");
    }));

    it("Text Input: OptGroup - value defined", async(() => {
        setOptOptionData({ key: 1, groupKey: 2 });

        expect(debugTextInputEl.nativeElement.value).toEqual("option 1 2");
    }));

    it("Text Input: NOT disabled", async(() => {
        expect(debugTextInputEl.nativeElement.disabled).toBeFalsy();
    }));

    it("Text Input: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.disabled).toBeTruthy();
    }));

    it("Placeholder: empty value", async(() => {
        expect(debugTextInputEl.nativeElement.placeholder).toEqual("");
    }));

    it("Placeholder: defined value", async(() => {
        let expectedPlaceholder = "test placeholder"
        component._placeholder = expectedPlaceholder;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.placeholder).toEqual(expectedPlaceholder);
    }));

    it("Ul-Dropdown: should create element", async(() => {
        let dropdownEl = el.queryAll(By.css('ul.select-dropdown.scrollbar'));
        expect(dropdownEl).toBeTruthy();
    }));

    it("Ul-Dropdown: CSS classes default", async(() => {
        let dropdownEl = el.query(By.css('ul.select-dropdown.scrollbar'));
        expect(dropdownEl.nativeElement.classList.contains(StyleClass.Active)).toBeFalsy();
    }));

    it("Ul-Dropdown: CSS classes when focus", async(() => {
        focusTextInput();
        let dropdownEl = el.query(By.css('ul.select-dropdown.scrollbar'));
        expect(dropdownEl.nativeElement.classList.contains(StyleClass.Active)).toBeTruthy();
    }));

    it("Ul-Dropdown: CSS styles default", async(() => {
        let dropdownEl = el.query(By.css('ul.select-dropdown.scrollbar'));
        expect(dropdownEl.nativeElement.style[CommonConstants.CSS_WIDTH]).toEqual("");
        expect(dropdownEl.nativeElement.style[CommonConstants.CSS_LEFT]).toEqual("");
    }));

    it("Ul-Dropdown: CSS styles  when focus", async(() => {
        focusTextInput();
        let dropdownEl = el.query(By.css('ul.select-dropdown.scrollbar'));

        expect(dropdownEl.nativeElement.style[CommonConstants.CSS_WIDTH]).not.toEqual("");
        expect(dropdownEl.nativeElement.style[CommonConstants.CSS_LEFT]).not.toEqual("");
    }));

    it("Ul-Dropdown: li - value is undefined", async(() => {
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));
        expect(liElements.length).toEqual(0);
    }));

    it("Ul-Dropdown: li - value is defined", async(() => {
        setOptionData(2);
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));

        expect(liElements.length).toEqual(1);
    }));

    it("Ul-Dropdown: Multiple - li - value is defined", async(() => {
        component.isMultiple = true;
        setOptionData([1, 2]);

        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected')),
            liDisabledElements = el.queryAll(By.css('ul.select-dropdown li.disabled'));

        expect(liElements.length).toEqual(2);
        expect(liDisabledElements.length).toEqual(1);
    }));

    it("Ul-Dropdown: OptGroup - li - value is defined", async(() => {
        setOptOptionData({ key: 1, groupKey: 2 });
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));

        expect(liElements.length).toEqual(1);
    }));

    it("Ul-Dropdown: li - set option value", async(() => {
        setOptionData();

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            secondOption = liElements[2],
            selectEl = el.query(By.css('select'));
        secondOption.triggerEventHandler('mousedown', { target: secondOption.nativeElement });
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual("option 2");
        expect(selectEl.nativeElement.value).toEqual("2");
    }));

    it("Ul-Dropdown: Multiple - li - set option value", async(() => {
        component.isMultiple = true;
        setOptionData([-1]);

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            firstOption = liElements[1],
            secondOption = liElements[2];

        firstOption.triggerEventHandler('mousedown', { target: firstOption.nativeElement });
        secondOption.triggerEventHandler('mousedown', { target: secondOption.nativeElement });
        fixture.detectChanges();

        let liDisabledElements = el.queryAll(By.css('ul.select-dropdown li.disabled')),
            selectEl = el.queryAll(By.css('select option')).filter(m => m.attributes["selected"] === "selected");

        expect(debugTextInputEl.nativeElement.value).toEqual("option 1, option 2");
        expect(selectEl.length).toEqual(2);
        expect(liDisabledElements.length).toEqual(1);
    }));

    it("Ul-Dropdown: OptGroup - li - set option value", async(() => {
        setOptOptionData();

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            firstOption = liElements[2];

        firstOption.triggerEventHandler('mousedown', { target: firstOption.nativeElement });
        fixture.detectChanges();

        let selectEl = el.queryAll(By.css('select option')).filter(m => m.attributes["selected"] === "selected");

        expect(debugTextInputEl.nativeElement.value).toEqual("option 1 2");
        expect(selectEl.length).toEqual(1);
    }));

    it("Ul-Dropdown: IMG - not defined", async(() => {
        let imgElements = el.queryAll(By.css('ul.select-dropdown li img'));
        expect(imgElements.length).toEqual(0);
    }));

    it("Ul-Dropdown: IMG - defined", async(() => {
        setOptionData(2, [{ key: 1, value: "option 1", imagePath: "testImg.jpg" }, { key: 2, value: "option 2" }]);

        let imgElements = el.queryAll(By.css('ul.select-dropdown li img'));
        expect(imgElements.length).toEqual(1);
        expect(imgElements[0].nativeElement.src.indexOf("testImg.jpg")).not.toEqual(-1);
    }));

    it("Ul-Dropdown: li - default  text", async(() => {
        let liSpanEl = el.queryAll(By.css('ul.select-dropdown li span span')),
            expectedValue = "Choose your option";
        expect(liSpanEl.length).toEqual(1);
        expect(liSpanEl[0].nativeElement.innerText).toEqual(expectedValue);
    }));

    it("Caret: should create element", async(() => {
        let caretEl = el.query(By.css('i.caret.fa.fa-caret-down'));
        expect(caretEl).toBeTruthy();
    }));

    it("Select: should create element", async(() => {
        let selectEl = el.query(By.css('select'));
        expect(selectEl).toBeTruthy();
    }));

    it("Select: check id value", async(() => {
        component.id = "test-id";
        fixture.detectChanges();
        let selectEl = el.query(By.css('select')),
            expectedValue = "sfc-test-id";

        expect(selectEl.nativeElement.id).toEqual(expectedValue)
    }));

    it("Select: check value", async(() => {
        setOptionData(2);
        let selectEl = el.query(By.css('select'));

        expect(selectEl.nativeElement.value).toEqual("2")
    }));

    it("Select: option attributes", async(() => {
        setOptionData();
        let optionsElements = el.queryAll(By.css('select option')),
            expectedValue = "Choose your option";

        expect(optionsElements.length).toBeGreaterThan(0);
        expect(optionsElements[0].nativeElement.value).toEqual("-1");
        expect(optionsElements[0].nativeElement.innerText).toEqual(expectedValue);
    }));

    it("Helper text: should create element", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = "test helper text";
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });


    // Private functions

    function setOptionData(value?: number | Array<number>, data?: ISelectData[]) {
        component.data = data || [{ key: 1, value: "option 1" }, { key: 2, value: "option 2" }]

        if (value) {
            component.writeValue(value);
        }

        component.ngOnInit();
        fixture.detectChanges();
    }

    function setOptOptionData(value?: any) {
        component.data = [
            {
                key: 1,
                value: "group one",
                options: [{
                    key: 1,
                    value: "option 1 2"
                },
                {
                    key: 2,
                    value: "option 2 2"
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
                }]
            }
        ]

        if (value != null && value != undefined) {
            component.writeValue(value);
        }

        component.ngOnInit();
        fixture.detectChanges();
    }

    function focusTextInput() {
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();
    }

    // END Private functions

});