import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { InputPosition, StyleClass } from '../common/constants/common-constants';
import { StarRatingInputComponent } from './sfc-star-rating-input.component';

describe('Component: StarRatingInputComponent', () => {

    let component: StarRatingInputComponent;
    let fixture: ComponentFixture<StarRatingInputComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let labelEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(StarRatingInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugInputEl = el.query(By.css('input.sfc-input'));
            labelEl = fixture.nativeElement.querySelector('label.main-label');

            fixture.detectChanges();
        });
    }));

    it("StarRatingInputComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Container: default classes", () => {
        expect(fixture.nativeElement.querySelector('div.input-star-rating-container.horizontal')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('div.input-star-rating-container.vertical')).toBeNull();
    });

    it("Container: vertical position", () => {
        component.position = InputPosition.Vertical;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.input-star-rating-container.vertical')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('div.input-star-rating-container.horizontal')).toBeNull();
    });

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
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
        expect(icon.className).toContain(StyleClass.Active);
    });

    it("Input: should create input element", () => {
        expect(debugInputEl.nativeElement).toBeDefined();
    });

    it("Input: default id value", () => {
        expect(debugInputEl.nativeElement.id).toEqual('sfc-');
    });

    it("Input: id value", () => {
        component.id = 'test-id';
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.id).toEqual('sfc-test-id');
    });

    it("Input: default type value", () => {
        expect(debugInputEl.nativeElement.type).toEqual('number');
    });

    it("Input: default input value", () => {
        expect(debugInputEl.nativeElement.value).toEqual('');
    });

    it("Input: set input value", () => {
        const assertValue = 4;
        initItems(assertValue);
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual(assertValue.toString());
    });

    it("Input: disabled default value", () => {
        expect(debugInputEl.nativeElement.disabled).toBeFalsy();
    });

    it("Input: set disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.disabled).toBeTruthy();
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
        expect(debugInputEl.nativeElement.labels).toBeDefined();
        expect(debugInputEl.nativeElement.labels.length).toEqual(1);
        expect(debugInputEl.nativeElement.labels[0].htmlFor).toEqual(debugInputEl.nativeElement.id);
    });

    it("Stars: without items", () => {
        const stars = el.queryAll(By.css('sfc-star'));
        expect(stars.length).toEqual(0);
    });

    it("Stars: with 4 items", () => {
        initItems();
        fixture.detectChanges();

        const stars = el.queryAll(By.css('sfc-star'));
        expect(stars.length).toEqual(component.items.length);
    });

    it("Stars: items without sorting(in ASC way)", () => {        
        initItems(null, [3, 1, 4, 2]);
        component.ngOnInit();
        fixture.detectChanges();

        const stars = el.queryAll(By.css('sfc-star')),
            firstStarAttributes = stars[0].attributes,
            lasrStarAttributes = stars[3].attributes;

        expect(firstStarAttributes['ng-reflect-value']).toEqual('1');
        expect(lasrStarAttributes['ng-reflect-value']).toEqual('4');
    });

    it("Stars: default attributes", () => {
        initItems();
        fixture.detectChanges();

        const stars = el.queryAll(By.css('sfc-star')),
            firstStarAttributes = stars[0].attributes;

        expect(firstStarAttributes['ng-reflect-value']).toEqual('1');
        expect(firstStarAttributes['ng-reflect-id']).toEqual('sfc--1');
        expect(firstStarAttributes['ng-reflect-disabled']).toBeNull();
        expect(firstStarAttributes['ng-reflect-highlighted']).toEqual('false');
        expect(firstStarAttributes['ng-reflect-highlighted-min']).toEqual('false');
        expect(firstStarAttributes['ng-reflect-highlighted-max']).toEqual('false');
    });

    it("Stars: disabled stars", () => {
        component.disabled = true;
        initItems();
        fixture.detectChanges();

        const stars = el.queryAll(By.css('sfc-star')),
            firstStarAttributes = stars[0].attributes;

        expect(firstStarAttributes['ng-reflect-disabled']).toBeTruthy();
    });

    it("Stars: select first star", () => {
        initItems();
        fixture.detectChanges();

        const firstStarBefore = el.queryAll(By.css('sfc-star'))[0].query(By.css('input'));

        firstStarBefore.triggerEventHandler('click', { target: firstStarBefore.nativeElement });
        fixture.detectChanges();

        const firstStarAfter = el.queryAll(By.css('sfc-star'))[0],
            firstStarAfterAttributes = firstStarAfter.attributes;

        expect(firstStarAfterAttributes['ng-reflect-highlighted']).toEqual('true');
        expect(firstStarAfterAttributes['ng-reflect-highlighted-min']).toEqual('true');
        expect(firstStarAfterAttributes['ng-reflect-highlighted-max']).toEqual('false');
        expect(debugInputEl.nativeElement.value).toEqual('1');
    });

    it("Stars: select last star", () => {
        initItems();
        fixture.detectChanges();

        const firstStarBefore = el.queryAll(By.css('sfc-star'))[3].query(By.css('input'));

        firstStarBefore.triggerEventHandler('click', { target: firstStarBefore.nativeElement });
        fixture.detectChanges();

        const firstStarAfter = el.queryAll(By.css('sfc-star'))[3],
            firstStarAfterAttributes = firstStarAfter.attributes;

        expect(firstStarAfterAttributes['ng-reflect-highlighted']).toEqual('true');
        expect(firstStarAfterAttributes['ng-reflect-highlighted-min']).toEqual('false');
        expect(firstStarAfterAttributes['ng-reflect-highlighted-max']).toEqual('true');
        expect(debugInputEl.nativeElement.value).toEqual('4');
    });

    it("Stars: select middle star", () => {
        initItems();
        fixture.detectChanges();

        const firstStarBefore = el.queryAll(By.css('sfc-star'))[1].query(By.css('input'));

        firstStarBefore.triggerEventHandler('click', { target: firstStarBefore.nativeElement });
        fixture.detectChanges();

        const firstStarAfter = el.queryAll(By.css('sfc-star'))[1],
            firstStarAfterAttributes = firstStarAfter.attributes;

        expect(firstStarAfterAttributes['ng-reflect-highlighted']).toEqual('true');
        expect(firstStarAfterAttributes['ng-reflect-highlighted-min']).toEqual('false');
        expect(firstStarAfterAttributes['ng-reflect-highlighted-max']).toEqual('false');
        expect(debugInputEl.nativeElement.value).toEqual('2');
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

    it("Action container: default classes", () => {
        expect(fixture.nativeElement.querySelector('div.action-container.active')).toBeNull();
    });

    it("Action container: with defined value", () => {
        initItems(1);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.action-container.active')).toBeNull();
    });

    it("Action container: with defined value and show counter is ON", () => {
        component.showCounter = true;
        initItems(1);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.action-container.active')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('div.counter-container')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('span.reset-button')).toBeNull();
    });

    it("Action container: with defined value and reset button is ON", () => {
        component.showReset = true;
        initItems(1);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.action-container.active')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('span.reset-button')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('div.counter-container')).toBeNull();
    });

    it("Action container: with defined value and reset button is ON and disabled component", () => {
        component.showReset = true;
        component.disabled = true;
        initItems(1);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.action-container.active')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('span.reset-button')).toBeNull();
        expect(fixture.nativeElement.querySelector('div.counter-container')).toBeNull();
    });

    it("Stars counter: empty items", () => {
        component.showCounter = true;
        initItems(1, []);
        fixture.detectChanges();

        const counterSpan = fixture.nativeElement.querySelector('div.counter-container span:last-child');
        expect(counterSpan.innerText).toEqual('/0');
    });

    it("Stars counter: 4 stars count", () => {
        component.showCounter = true;
        initItems(1);
        fixture.detectChanges();

        const counterSpan = fixture.nativeElement.querySelector('div.counter-container span:last-child');
        expect(counterSpan.innerText).toEqual('/4');
    });

    it("Stars index: empty items", () => {
        component.showCounter = true;
        initItems(1, []);
        fixture.detectChanges();

        const counterSpan = fixture.nativeElement.querySelector('div.counter-container span:first-child');
        expect(counterSpan.innerText).toEqual('');
    });

    it("Stars index: selected star", () => {
        component.showCounter = true;
        initItems(3);
        fixture.detectChanges();

        const counterSpan = fixture.nativeElement.querySelector('div.counter-container span:first-child');
        expect(counterSpan.innerText).toEqual('3');
    });

    it("Reset button: click event", () => {
        component.showReset = true;
        initItems(1);
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual('1');

        const resetButton = el.query(By.css('span.reset-button'));
        resetButton.triggerEventHandler('click', { target: resetButton.nativeElement });
        fixture.detectChanges();

        expect(debugInputEl.nativeElement.value).toEqual('');
    });

    function initItems(value: number = null, items: number[] = null) {
        component.items = items || [1, 2, 3, 4];

        if (value)
            component.writeValue(value);        
    }

});