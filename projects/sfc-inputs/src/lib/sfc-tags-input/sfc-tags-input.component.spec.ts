import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';
import { TagsInputComponent } from './sfc-tags-input.component';

describe('Component: TagsInputComponent', () => {

    let component: TagsInputComponent;
    let fixture: ComponentFixture<TagsInputComponent>;
    let el: DebugElement;
    let labelEl: any;
    let textInputEl: any;
    let debugTextInputEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TagsInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugTextInputEl = el.query(By.css('input[type="text"]'));
            textInputEl = debugTextInputEl.nativeElement;            
            labelEl = fixture.nativeElement.querySelector('label');

            fixture.detectChanges();
        });
    }));

    it("TagsInputComponent: should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Container: should exist parent container", async(() => {
        const containerEl = fixture.nativeElement.querySelector('div.input-tags-container');
        expect(containerEl).toBeTruthy();
    }));

    it("Container: click event", async(() => {
        const containerEl = el.query(By.css('div.input-tags-container'));
        containerEl.triggerEventHandler('click', { target: containerEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type="text"]')).toEqual(document.activeElement);
    }));

    it("Container: when component disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();
        const containerEl = el.query(By.css('div.input-tags-container'));

        expect(containerEl.nativeElement.className).toContain('disabled');
    }));

    it("Tag's chips: empty value", async(() => {
        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(0);
    }));

    it("Tag's chips: value NOT empty", async(() => {
        setTags();
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(2);
    }));

    it("Tag's chips: disabled", async(() => {
        component.disabled = true;
        setTags();
        fixture.detectChanges();

        el.queryAll(By.css('sfc-tags-chip')).forEach(chip => {
            expect(chip.componentInstance.disabled).toBeTruthy();
        })
    }));

    it("Tag's chips: display value", async(() => {
        setTags();
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        for (let index = 0; index < chips.length; index++) {
            expect(chips[index].componentInstance.displayValue).toEqual('test' + (index + 1))
        }
    }));

    it("Tag's chips: click remove", async(() => {
        setTags();
        fixture.detectChanges();

        const chipsBeforeRemove = el.queryAll(By.css('sfc-tags-chip'));
        expect(chipsBeforeRemove.length).toEqual(2);

        const chipToRemove = chipsBeforeRemove[0].query(By.css('i.close'));
        chipToRemove.triggerEventHandler('click', { target: chipToRemove.nativeElement });
        fixture.detectChanges();

        const chipsAfterRemove = el.queryAll(By.css('sfc-tags-chip'));
        expect(chipsAfterRemove.length).toEqual(1);
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

    it("Icon: when component is focused", () => {
        component.icon = 'fa fa-user';
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
        expect(icon.className).toContain(StyleClass.Active);
    });

    it("Text Input: should create input element", () => {
        expect(textInputEl).toBeDefined();
    });

    it("Text Input: default id value", () => {
        expect(textInputEl.id).toEqual('sfc-');
    });

    it("Text Input: id value", () => {
        component.id = 'test-id';
        fixture.detectChanges();

        expect(textInputEl.id).toEqual('sfc-test-id');
    });

    it("Text Input: default type value", () => {
        expect(textInputEl.type).toEqual('text');
    });

    it("Text Input: permanent class value", () => {
        expect(fixture.nativeElement.querySelector('input.sfc-input.input-text-input')).toBeDefined();
    });

    it("Text Input: placeholder value if value not defined", () => {
        expect(textInputEl.placeholder).toEqual('');
    });

    it("Text Input: placeholder value", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(textInputEl.placeholder).toEqual(placeholderAssertValue);
    });

    it("Text Input: placeholder with value and focused", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        expect(textInputEl.placeholder).toEqual('');
    });

    it("Text Input: placeholder and value NOT empty and new-tag-placeholder is NOT defined", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        setTags();
        fixture.detectChanges();

        expect(textInputEl.placeholder).toEqual(CommonConstants.TAGS_INPUT.NEW_TAG_PLACEHOLDER_DEFAULT);
    });

    it("Text Input: placeholder and value NOT empty and new-tag-placeholder is defined", () => {
        const newTagPlaceholderAssertValue = 'New tag placeholder';
        component._placeholder = 'test placeholder';
        component.newTagPlaceholder = newTagPlaceholderAssertValue
        setTags();
        fixture.detectChanges();

        expect(textInputEl.placeholder).toEqual(newTagPlaceholderAssertValue);
    });

    it("Text Input: default input value", () => {
        expect(textInputEl.value).toEqual('');
    });

    it("Text Input: disabled default value", () => {
        expect(textInputEl.disabled).toBeFalsy();
    });

    it("Text Input: set disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(textInputEl.disabled).toBeTruthy();
    });

    it("Text Input: add new tag", () => {
        const assertValue = 'test value';
        debugTextInputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(1);
    });

    it("Text Input: try to add empty value", () => {
        const assertValue = '';
        debugTextInputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(0);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Empty value');
    });

    it("Text Input: try to add duplicate value", () => {
        const assertValue = 'test1';
        debugTextInputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(1);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Duplicate value');
        expect(debugTextInputEl.nativeElement.value).toEqual(assertValue);
    });

    it("Text Input: try to add duplicate value(extra spaces)", () => {
        const assertValue = 'test1',
            extraSpacesValue = assertValue + '   ';

        debugTextInputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('input', { target: { value: extraSpacesValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(1);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Duplicate value');
        expect(debugTextInputEl.nativeElement.value).toEqual(extraSpacesValue);
    });

    it("Text Input: try to add empty and than duplicate value", () => {
        const assertValue = 'test1';
        setTags();
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('input', { target: { value: '' } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Empty value');
        expect(debugTextInputEl.nativeElement.value).toEqual('');

        debugTextInputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(2);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Duplicate value');
        expect(debugTextInputEl.nativeElement.value).toEqual(assertValue);
    });

    it("Text Input: try to add empty and than valid value", () => {
        const assertValue = 'test3';
        setTags();
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('input', { target: { value: '' } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Empty value');
        expect(debugTextInputEl.nativeElement.value).toEqual('');

        debugTextInputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(3);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('');
        expect(debugTextInputEl.nativeElement.value).toEqual('');
    });

    it("Text Input: on blur event", () => {
        const assertValue = 'test2';
        setTags();
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        debugTextInputEl.triggerEventHandler('keyup.enter', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Duplicate value');
        expect(debugTextInputEl.nativeElement.value).toEqual(assertValue);

        debugTextInputEl.triggerEventHandler('blur', { target: { target: debugTextInputEl.nativeElement } });
        fixture.detectChanges();

        const chips = el.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(2);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('');
        expect(debugTextInputEl.nativeElement.value).toEqual(assertValue);
    });

    it("Text Input: focus event (label)", () => {
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Text Input: focus event (placeholder)", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(textInputEl.placeholder).toEqual(placeholderAssertValue);

        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        expect(textInputEl.placeholder).toEqual('');
    });

    it("Text Input: blur event", () => {
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        debugTextInputEl.triggerEventHandler('blur', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual('');
    });

    it("Label: default inner text value", () => {
        expect(labelEl.innerText).toEqual('');
    });

    it("Label: inner text value", () => {
        const labelAssertValue = 'test label';
        component.label = labelAssertValue;
        fixture.detectChanges();

        expect(labelEl.innerText).toEqual(labelAssertValue);
    });

    it("Label: label should be linked to input element", () => {
        expect(textInputEl.labels).toBeDefined();
        expect(textInputEl.labels.length).toEqual(1);
        expect(textInputEl.labels[0].htmlFor).toEqual(textInputEl.id);
    });

    it("Label: class value - active, when placeholder exist", () => {
        component._placeholder = 'test placeholder';
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label: class value - active, when input in focus", () => {
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label: class value - active, when value defined", () => {
        setTags();
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label: class value - active, when new tag value defined", () => {
        debugTextInputEl.triggerEventHandler('input', { target: { value: 'test1' } });
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Helper text: should create element with permanent class value", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = 'test helper text';
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    function setTags() {
        const value = ['test1', 'test2'];
        component.writeValue(value);
        component.ngOnInit();
    }
});