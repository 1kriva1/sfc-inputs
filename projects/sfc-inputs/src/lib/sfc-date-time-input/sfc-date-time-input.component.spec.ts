import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';
import { DateTimeInputComponent } from './sfc-date-time-input.component';
import { formatDate } from '@angular/common';

describe('Component: DateTimeInputComponent', () => {

    let component: DateTimeInputComponent;
    let fixture: ComponentFixture<DateTimeInputComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let inputEl: any;
    let labelEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DateTimeInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugInputEl = el.query(By.css('input[type="text"].sfc-input'));
            inputEl = fixture.nativeElement.querySelector('input[type="text"].sfc-input');
            labelEl = fixture.nativeElement.querySelector('div.input-date-time-container > label');

            fixture.detectChanges();
        });
    }));

    it("DateTimeInputComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('div.input-date-time-container > i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.input-date-time-container > i.icon')).toBeDefined();
    });

    it("Icon: should add class to icon element", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('div.input-date-time-container > i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
    });

    it("Icon: when component is focused", () => {
        component.icon = 'fa fa-user';
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('div.input-date-time-container > i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
        expect(icon.className).toContain(StyleClass.Active);
    });

    it("Input: should create input element", () => {
        expect(inputEl).toBeDefined();
    });

    it("Input: default id value", () => {
        expect(inputEl.id).toEqual('sfc-');
    });

    it("Input: id value", () => {
        component.id = 'test-id';
        fixture.detectChanges();

        expect(inputEl.id).toEqual('sfc-test-id');
    });

    it("Input: permanent class value", () => {
        expect(fixture.nativeElement.querySelector('input[type="text"].input-text-input')).toBeDefined();
    });

    it("Input: placeholder value if value not defined", () => {
        expect(inputEl.placeholder).toEqual('');
    });

    it("Input: placeholder value", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual(placeholderAssertValue);
    });

    it("Input: placeholder with value and focused", () => {
        const placeholderAssertValue = "test placeholder";
        component._placeholder = placeholderAssertValue;
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual('');
    });

    it("Input: default input value", () => {
        expect(inputEl.value).toEqual('');
    });

    it("Input: default input value after ok click", () => {
        const now = new Date();
        component.time = false;
        fixture.detectChanges();

        clickOk();

        expect(inputEl.value).toEqual(formatDate(now, 'd/M/yyyy', component.locale));
    });

    it("Input: input value with defined after ok click", () => {
        component.time = false;
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        expect(inputEl.value).toEqual('10/1/2021');
    });

    it("Input: set input value", () => {
        component.writeValue(new Date(2021, 0, 10, 20, 42));
        fixture.detectChanges();

        expect(inputEl.value).toEqual('10/1/2021, 20:42');
    });

    it("Input: disabled default value", () => {
        expect(inputEl.disabled).toBeFalsy();
    });

    it("Input: set disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(inputEl.disabled).toBeTruthy();
    });

    it("Input: focus event (label)", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Input: focus event (placeholder)", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual(placeholderAssertValue);

        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(inputEl.placeholder).toEqual('');
    });

    it("Input: blur event", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        debugInputEl.triggerEventHandler('blur', { target: debugInputEl.nativeElement });
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
        expect(inputEl.labels).toBeDefined();
        expect(inputEl.labels.length).toEqual(1);
        expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    it("Label: class value - active, when placeholder exist", () => {
        component._placeholder = 'test placeholder';
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label: class value - active, when input in focus", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    });

    it("Label: class value - active, when value defined", () => {
        component.writeValue(new Date());
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

    it("Container: hidden when not focused", () => {
        expect(el.query(By.css('div.dtp')).properties.hidden).toBeTruthy();
    });

    it("Container: visible when focused", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp')).properties.hidden).toBeFalsy();
    });

    it("Header: display date - when date", () => {
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-day')).nativeElement.innerText).toEqual('Sunday');
    });

    it("Header: display date - when time", () => {
        component.date = false;
        component.writeValue(new Date(2021, 0, 10, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-day')).nativeElement.innerText).toEqual('');
    });

    it("Header: display date - when year only", () => {
        component.date = false;
        component.time = false;
        component.writeValue(new Date(2021, 0, 10, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-day')).nativeElement.innerText).toEqual('Sunday, January 10, 2021 at 3:15:00 PM GMT+02:00');
    });

    it("Header: close icon exist", () => {
        expect(el.query(By.css('div.dtp-close > a > i.fa.fa-times'))).toBeTruthy();
    });

    it("Header: close container", () => {
        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp')).properties.hidden).toBeFalsy();

        const closeIconEl = el.query(By.css('div.dtp-close'));
        closeIconEl.triggerEventHandler('mousedown', new MouseEvent('MouseEvent', { buttons: 0 }));
        debugInputEl.triggerEventHandler('blur', { target: debugInputEl.nativeElement }); // without implicit blure not working in test
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp')).properties.hidden).toBeTruthy();
    });

    it("Date container: show when date", () => {
        expect(el.query(By.css('div.dtp-date'))).toBeTruthy();
    });

    it("Date container: show when not date and not time, but year", () => {
        component.date = false;
        component.time = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-date'))).toBeTruthy();
    });

    it("Date container: show when not date, time and year", () => {
        component.date = false;
        component.time = false;
        component.year = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-date'))).toBeNull();
    });

    it("Date container: show when not date, but with time", () => {
        component.date = false;
        component.time = true;
        component.year = true;
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-date'))).toBeNull();
    });

    it("Month: when date icons exist", () => {
        expect(el.query(By.css('div.month-handlers div.dtp-select-period-handler.before a i.fa.fa-chevron-left'))).toBeTruthy();
        expect(el.query(By.css('div.month-handlers div.dtp-select-period-handler.after a i.fa.fa-chevron-right'))).toBeTruthy();
        expect(el.query(By.css('div.dtp-actual-month'))).toBeTruthy();
    });

    it("Month: when not date, icons will not exist", () => {
        component.date = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.month-handlers div.dtp-select-period-handler.before a i.fa.fa-chevron-left'))).toBeNull();
        expect(el.query(By.css('div.month-handlers div.dtp-select-period-handler.after a i.fa.fa-chevron-right'))).toBeNull();
        expect(el.query(By.css('div.dtp-actual-month'))).toBeNull();
    });

    it("Month: icons not invisible witout restrictions", () => {
        expect(el.query(By.css('div.month-handlers div.dtp-select-period-handler.before a.invisible'))).toBeNull();
        expect(el.query(By.css('div.month-handlers div.dtp-select-period-handler.after a.invisible'))).toBeNull();
    });

    it("Month: before icon is invisible", () => {
        component.minDate = new Date(2021, 0, 9);
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.month-handlers div.dtp-select-period-handler.before a.invisible'))).toBeTruthy();
    });

    it("Month: after icon is invisible", () => {
        component.maxDate = new Date(2021, 0, 11);
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.month-handlers div.dtp-select-period-handler.after a.invisible'))).toBeTruthy();
    });

    it("Month: on month before click", () => {
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-month')).nativeElement.innerText).toEqual('Jan');

        const monthBeforeEl = el.query(By.css('div.month-handlers div.dtp-select-period-handler.before a'));
        monthBeforeEl.triggerEventHandler('mousedown', { target: monthBeforeEl.nativeElement, button: 0 });
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-month')).nativeElement.innerText).toEqual('Dec');
    });

    it("Month: on month after click", () => {
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-month')).nativeElement.innerText).toEqual('Jan');

        const monthBeforeEl = el.query(By.css('div.month-handlers div.dtp-select-period-handler.after a'));
        monthBeforeEl.triggerEventHandler('mousedown', { target: monthBeforeEl.nativeElement, button: 0 });
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-month')).nativeElement.innerText).toEqual('Feb');
    });

    it("Day number: when not date", () => {
        component.date = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-num'))).toBeNull();
    });

    it("Day number: when date", () => {
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-num'))).toBeDefined();
        expect(el.query(By.css('div.dtp-actual-num')).nativeElement.innerText).toEqual('10');
    });

    it("Year: when date", () => {
        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.before a i.fa.fa-chevron-left'))).toBeTruthy();
        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.after a i.fa.fa-chevron-right'))).toBeTruthy();
        expect(el.query(By.css('div.dtp-actual-year'))).toBeTruthy();
    });

    it("Year: when not date, but time", () => {
        component.date = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.before a i.fa.fa-chevron-left'))).toBeNull();
        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.after a i.fa.fa-chevron-right'))).toBeNull();
        expect(el.query(By.css('div.dtp-actual-year'))).toBeNull();
    });

    it("Year: when year only", () => {
        component.date = false;
        component.time = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.before a i.fa.fa-chevron-left'))).toBeTruthy();
        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.after a i.fa.fa-chevron-right'))).toBeTruthy();
        expect(el.query(By.css('div.dtp-actual-year'))).toBeTruthy();
    });

    it("Year: icons not invisible witout restrictions", () => {
        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.before a.invisible'))).toBeNull();
        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.after a.invisible'))).toBeNull();
    });

    it("Year: before icon is invisible", () => {
        component.minDate = new Date(2020, 0, 10);
        component.writeValue(new Date(2020, 0, 11));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.before a.invisible'))).toBeTruthy();
    });

    it("Year: after icon is invisible", () => {
        component.maxDate = new Date(2021, 0, 11);
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.year-handlers div.dtp-select-period-handler.after a.invisible'))).toBeTruthy();
    });

    it("Year: on year before click", () => {
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-year')).nativeElement.innerText).toEqual('2021');

        const yearBeforeEl = el.query(By.css('div.year-handlers div.dtp-select-period-handler.before a'));
        yearBeforeEl.triggerEventHandler('mousedown', { target: yearBeforeEl.nativeElement, button: 0 });
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-year')).nativeElement.innerText).toEqual('2020');
    });

    it("Year: on year after click", () => {
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-year')).nativeElement.innerText).toEqual('2021');

        const yearBeforeEl = el.query(By.css('div.year-handlers div.dtp-select-period-handler.after a'));
        yearBeforeEl.triggerEventHandler('mousedown', { target: yearBeforeEl.nativeElement, button: 0 });
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-year')).nativeElement.innerText).toEqual('2022');
    });

    it("Year: year picker not disabled", () => {
        expect(el.query(By.css('div.dtp-actual-year.disabled'))).toBeNull();
    });

    it("Year: year picker disabled when not year", () => {
        component.year = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-year.disabled'))).toBeTruthy();
    });

    it("Year: on show year list click", () => {
        expect(el.query(By.css('sfc-date-time-year')).properties.hidden).toBeTruthy();

        clickShowYears();

        expect(el.query(By.css('sfc-date-time-year')).properties.hidden).toBeFalsy();
    });

    it("Year: on show year list click and click cancel", () => {
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();

        clickShowYears();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();

        clickCancel();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();
    });

    it("Time: default state", () => {
        expect(el.query(By.css('div.dtp-time'))).toBeNull();
    });

    it("Time: when not date", () => {
        component.date = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-time'))).toBeTruthy();
    });

    it("Time: display value with default conditions", () => {
        component.date = false;
        component.writeValue(new Date(2021, 0, 10, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-maxtime')).nativeElement.innerText).toEqual('15:15');
    });

    it("Time: display value with default conditions when minutes is less than 10", () => {
        component.date = false;
        component.writeValue(new Date(2021, 0, 10, 15, 9));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-maxtime')).nativeElement.innerText).toEqual('15:09');
    });

    it("Time: display value when short time", () => {
        component.date = false;
        component.shortTime = true;
        component.writeValue(new Date(2021, 0, 10, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-maxtime')).nativeElement.innerText).toEqual('3:15 PM');
    });

    it("View: initial view when date and time", () => {
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();
    });

    it("View: initial view when only date", () => {
        component.time = false;
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();
    });

    it("View: initial view when only time", () => {
        component.date = false;
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-clock dtp-select-hour'))).toBeDefined();
    });

    it("Calendar: default state", () => {
        component.disabledDays = [new Date(2021, 0, 7)];
        component.minDate = new Date(2021, 0, 8);
        component.maxDate = new Date(2021, 0, 9);
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        const calendar = el.query(By.css('sfc-date-time-calendar'));
        expect(calendar.properties.hidden).toBeFalsy();
        expect(calendar.attributes['ng-reflect-min-date']).toEqual('Fri Jan 08 2021 00:00:00 GMT+0');
        expect(calendar.attributes['ng-reflect-max-date']).toEqual('Sat Jan 09 2021 00:00:00 GMT+0');
        expect(calendar.attributes['ng-reflect-disabled-days']).toEqual('Thu Jan 07 2021 00:00:00 GMT+0');
        expect(calendar.attributes['ng-reflect-week-start']).toEqual('1');
        expect(calendar.attributes['ng-reflect-current-date']).toEqual('Sun Jan 10 2021 00:00:00 GMT+0');
        expect(calendar.attributes['ng-reflect-locale']).toEqual('en-US');
    });

    it("Calendar: when move to clock view", () => {
        const calendar = el.query(By.css('sfc-date-time-calendar'));

        expect(calendar.properties.hidden).toBeFalsy();

        clickOk();

        expect(calendar.properties.hidden).toBeTruthy();
    });

    it("Calendar: on select date", () => {
        spyOn<any>(component, 'onSelectDate').and.callThrough();
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        const calendarFirstDateEl = el.queryAll(By.css('sfc-date-time-calendar a'))[0],
            event = { target: calendarFirstDateEl.nativeElement, button: 0 };
        calendarFirstDateEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        expect(component['onSelectDate']).toHaveBeenCalled();
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();
    });

    it("Calendar: on select date with switch on click", () => {
        component.switchOnClick = true;
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        const calendarFirstDateEl = el.queryAll(By.css('sfc-date-time-calendar a'))[0];
        calendarFirstDateEl.triggerEventHandler('mousedown', { target: calendarFirstDateEl.nativeElement, button: 0 });
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();
    });

    it("Clock: default state", () => {
        component.shortTime = true;
        component.minDate = new Date(2021, 0, 8, 15, 15);
        component.maxDate = new Date(2021, 0, 9, 15, 16);
        component.writeValue(new Date(2021, 0, 10, 15, 17));
        component.ngOnInit();
        fixture.detectChanges();

        const clock = el.query(By.css('sfc-date-time-clock'));
        expect(clock.properties.hidden).toBeTruthy();
        expect(clock.attributes['ng-reflect-min-date']).toEqual('Fri Jan 08 2021 15:15:00 GMT+0');
        expect(clock.attributes['ng-reflect-max-date']).toEqual('Sat Jan 09 2021 15:16:00 GMT+0');
        expect(clock.attributes['ng-reflect-short-time']).toEqual('true');
        expect(clock.attributes['ng-reflect-current-view']).toEqual('0');
        expect(clock.attributes['ng-reflect-current-date']).toEqual('Sun Jan 10 2021 15:17:00 GMT+0');
        expect(clock.attributes['ng-reflect-locale']).toEqual('en-US');
    });

    it("Clock: when move to clock view", () => {
        const clock = el.query(By.css('sfc-date-time-clock'));

        expect(clock.properties.hidden).toBeTruthy();

        clickOk();

        expect(clock.properties.hidden).toBeFalsy();
    });

    it("Clock: on select hour", () => {
        spyOn<any>(component, 'onSelectHour').and.callThrough();
        component.writeValue(new Date(2021, 0, 10, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeTruthy();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();

        const clockHourEl = el.queryAll(By.css('sfc-date-time-clock .dtp-select-hour-text'))[16],
            event = { target: clockHourEl.nativeElement, button: 0 };
        clockHourEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        expect(component['onSelectHour']).toHaveBeenCalledWith(16);
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
    });

    it("Clock: on select hour with switch on click", () => {
        component.switchOnClick = true;
        component.writeValue(new Date(2021, 0, 10, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeTruthy();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeNull();

        const clockFirstDateEl = el.queryAll(By.css('sfc-date-time-clock .dtp-select-hour-text'))[16],
            event = { target: clockFirstDateEl.nativeElement, button: 0 };
        clockFirstDateEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeDefined();
    });

    it("Clock: on select minute", () => {
        spyOn<any>(component, 'onSelectMinute').and.callThrough();
        component.writeValue(new Date(2021, 0, 10, 15, 14));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        clickOk();

        const clockMinuteEl = el.queryAll(By.css('sfc-date-time-clock .dtp-select-minute-text'))[3], // 15 minutes
            event = { target: clockMinuteEl.nativeElement, button: 0 };
        clockMinuteEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        expect(component['onSelectMinute']).toHaveBeenCalledWith({ value: 15, event: event });
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
    });

    it("Clock: on select minute with switch on click", () => {
        component.switchOnClick = true;
        component.writeValue(new Date(2021, 0, 10, 15, 14));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        clickOk();

        expect(inputEl.value).toEqual('10/1/2021, 15:14');

        const clockMinuteEl = el.queryAll(By.css('sfc-date-time-clock .dtp-select-minute-text'))[3], // 15 minutes
            event = { target: clockMinuteEl.nativeElement, button: 0 };
        clockMinuteEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeTruthy();
        expect(inputEl.value).toEqual('10/1/2021, 15:15');
    });

    it("Year: default state", () => {
        component.minDate = new Date(2021, 0, 8);
        component.maxDate = new Date(2021, 0, 9);
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        const yearEl = el.query(By.css('sfc-date-time-year'));
        expect(yearEl.properties.hidden).toBeTruthy();
        expect(yearEl.attributes['ng-reflect-min-date']).toEqual('Fri Jan 08 2021 00:00:00 GMT+0');
        expect(yearEl.attributes['ng-reflect-max-date']).toEqual('Sat Jan 09 2021 00:00:00 GMT+0');
        expect(yearEl.attributes['ng-reflect-current-date']).toEqual('Sun Jan 10 2021 00:00:00 GMT+0');
        expect(yearEl.attributes['ng-reflect-locale']).toEqual('en-US');
    });

    it("Year: when move to years list", () => {
        const yearEl = el.query(By.css('sfc-date-time-year'));

        expect(yearEl.properties.hidden).toBeTruthy();

        clickShowYears();

        expect(yearEl.properties.hidden).toBeFalsy();
    });

    it("Year: on select year", () => {
        spyOn<any>(component, 'onSelectYear').and.callThrough();
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        clickShowYears();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();

        const yearEl = el.queryAll(By.css('sfc-date-time-year .year-picker-item'))[0], // 2018
            event = { target: yearEl.nativeElement, button: 0 };
        yearEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        expect(component['onSelectYear']).toHaveBeenCalledWith(2018);
        expect(el.query(By.css('sfc-date-time-year')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();
    });

    it("Year: on select year from hours picker", () => {
        component.writeValue(new Date(2021, 0, 10, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();

        clickShowYears();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeTruthy();

        const yearEl = el.queryAll(By.css('sfc-date-time-year .year-picker-item'))[0], // 2018
            event = { target: yearEl.nativeElement, button: 0 };
        yearEl.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-year')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
    });

    it("Now button: not exist by default", () => {
        expect(el.query(By.css('sfc-button.button-now'))).toBeNull();
    });

    it("Now button: should exist", () => {
        component.showNowButton = true;
        fixture.detectChanges();

        const nowBtn = el.query(By.css('sfc-button.button-now'));
        expect(nowBtn).toBeDefined();
        expect(nowBtn.attributes.text).toEqual('Now');
    });

    it("Now button: click now on calendar", () => {
        component.showNowButton = true;
        component.writeValue(new Date(2020, 1, 9, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-month')).nativeElement.innerText).toEqual('Feb');
        expect(el.query(By.css('div.dtp-actual-num')).nativeElement.innerText).toEqual('9');
        expect(el.query(By.css('div.dtp-actual-year')).nativeElement.innerText).toEqual('2020');

        clickNow();

        const now = new Date();

        expect(el.query(By.css('div.dtp-actual-month')).nativeElement.innerText).toEqual(formatDate(now, 'LLL', component.locale));
        expect(el.query(By.css('div.dtp-actual-num')).nativeElement.innerText).toEqual(formatDate(now, 'd', component.locale));
        expect(el.query(By.css('div.dtp-actual-year')).nativeElement.innerText).toEqual(formatDate(now, 'y', component.locale));
    });

    it("Now button: click now on clock", () => {
        component.showNowButton = true;
        component.date = false;
        component.writeValue(new Date(2020, 1, 9, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-maxtime')).nativeElement.innerText).toEqual('15:15');

        clickNow();

        const now = new Date();

        expect(el.query(By.css('div.dtp-actual-maxtime')).nativeElement.innerText)
            .toEqual(`${formatDate(now, 'HH', component.locale)}:${formatDate(now, 'mm', component.locale)}`);
    });

    it("Now button: click now on year picker", () => {
        component.showNowButton = true;
        component.date = false;
        component.time = false;
        component.writeValue(new Date(2020, 1, 9, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-year')).nativeElement.innerText).toEqual('2020');

        clickNow();

        const now = new Date();

        expect(el.query(By.css('div.dtp-actual-year')).nativeElement.innerText).toEqual(formatDate(now, 'y', component.locale));
    });

    it("Clear button: not exist by default", () => {
        expect(el.query(By.css('sfc-button.button-clear'))).toBeNull();
    });

    it("Clear button: should exist", () => {
        component.showClearButton = true;
        fixture.detectChanges();

        const clearBtn = el.query(By.css('sfc-button.button-clear'));
        expect(clearBtn).toBeDefined();
        expect(clearBtn.attributes.text).toEqual('Clear');
    });

    it("Clear button: on click clear", () => {
        component.showClearButton = true;
        component.writeValue(new Date(2021, 0, 10, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        expect(inputEl.value).toEqual('10/1/2021, 15:15');

        clickClear();

        expect(inputEl.value).toEqual('');
    });

    it("Cancel button: should exist by default", () => {
        const cancelBtn = el.query(By.css('sfc-button.button-cancel'));
        expect(cancelBtn).toBeDefined();
        expect(cancelBtn.attributes.text).toEqual('Cancel');
    });

    it("Cancel button: cancel click from calendar", () => {
        expect(el.query(By.css('div.dtp')).properties.hidden).toBeTruthy();

        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp')).properties.hidden).toBeFalsy();

        clickCancel();

        debugInputEl.triggerEventHandler('blur', { target: debugInputEl.nativeElement }); // manualy blur for test
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp')).properties.hidden).toBeTruthy();
    });

    it("Cancel button: cancel click from hours", () => {
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();

        clickOk();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();

        clickCancel();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeTruthy();
    });

    it("Cancel button: cancel click from hours when not date", () => {
        component.date = false;
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp')).properties.hidden).toBeTruthy();

        debugInputEl.triggerEventHandler('focus', { target: debugInputEl.nativeElement });
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp')).properties.hidden).toBeFalsy();

        clickCancel();

        debugInputEl.triggerEventHandler('blur', { target: debugInputEl.nativeElement }); // manualy blur for test
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp')).properties.hidden).toBeTruthy();
    });

    it("Cancel button: cancel click from minutes", () => {
        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeNull();
        expect(el.query(By.css('sfc-date-time-clock dtp-select-hour'))).toBeDefined();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeDefined();
        expect(el.query(By.css('sfc-date-time-clock dtp-select-hour'))).toBeNull();

        clickCancel();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeNull();
        expect(el.query(By.css('sfc-date-time-clock dtp-select-hour'))).toBeDefined();
    });

    it("Cancel button: cancel click from years (before hours)", () => {
        clickOk();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();

        clickShowYears();

        expect(el.query(By.css('sfc-date-time-year')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeTruthy();

        clickCancel();

        expect(el.query(By.css('sfc-date-time-year')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();
    });

    it("Ok button: should exist by default", () => {
        const cancelBtn = el.query(By.css('sfc-button.button-ok'));
        expect(cancelBtn).toBeDefined();
        expect(cancelBtn.attributes.text).toEqual('Ok');
    });

    it("Ok button: click OK", () => {
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeTruthy();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();
        expect(inputEl.value).toEqual('');
    });

    it("Ok button: click OK when not time", () => {
        component.time = false;
        fixture.detectChanges();

        expect(inputEl.value).toEqual('');

        const calendarFirstDateEl = el.queryAll(By.css('sfc-date-time-calendar a'))[0];
        calendarFirstDateEl.triggerEventHandler('mousedown', { target: calendarFirstDateEl.nativeElement, button: 0 });
        fixture.detectChanges();

        clickOk();

        expect(inputEl.value).toEqual('1/1/2021');
    });

    it("Ok button: click OK from hours", () => {
        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeNull();
        expect(el.query(By.css('sfc-date-time-clock dtp-select-hour'))).toBeDefined();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeDefined();
        expect(el.query(By.css('sfc-date-time-clock dtp-select-hour'))).toBeNull();
    });

    it("Ok button: click OK from minutes", () => {
        clickOk();

        expect(inputEl.value).toEqual('');

        clickOk();

        expect(inputEl.value).toEqual('');

        clickOk();

        expect(inputEl.value).not.toEqual('');
    });

    it("Ok button: click OK from years", () => {
        clickOk();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();

        clickShowYears();

        expect(el.query(By.css('sfc-date-time-year')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeTruthy();

        clickOk();

        expect(el.query(By.css('sfc-date-time-year')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeTruthy();
        expect(el.query(By.css('sfc-date-time-clock')).properties.hidden).toBeFalsy();
    });

    it("Ok button: not disabled without restrictions", () => {
        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeFalsy();
    });

    it("Ok button: disabled by min date for date only", () => {
        component.minDate = new Date();
        component.time = false;
        component.writeValue(new Date(2021, 0, 10));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeTruthy();
    });

    it("Ok button: disabled by max date for date only", () => {
        component.maxDate = new Date(2021, 0, 11);
        component.time = false;
        component.writeValue(new Date(2021, 0, 12));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeTruthy();
    });

    it("Ok button: disabled by max and min date for date only", () => {
        component.minDate = new Date(2021, 0, 10);
        component.maxDate = new Date(2021, 0, 10);
        component.time = false;
        component.writeValue(new Date(2021, 0, 11));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeTruthy();
    });

    it("Ok button: disabled by max date when minute view", () => {
        component.maxDate = new Date(2021, 0, 11, 15, 15);
        component.writeValue(new Date(2021, 0, 11, 15, 16));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeDefined();
        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeTruthy();
    });

    it("Ok button: disabled by min date when minute view", () => {
        component.minDate = new Date(2021, 0, 11, 15, 15);
        component.writeValue(new Date(2021, 0, 11, 15, 14));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeDefined();
        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeTruthy();
    });

    it("Ok button: not disabled by max date when minute view", () => {
        component.maxDate = new Date(2021, 0, 11, 15, 15);
        component.writeValue(new Date(2021, 0, 11, 15, 15));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeDefined();
        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeFalsy();
    });

    it("Ok button: not disabled by max date when minute view", () => {
        component.maxDate = new Date(2021, 0, 11, 15, 15);
        component.writeValue(new Date(2021, 0, 11, 15, 14));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-minute'))).toBeDefined();
        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeFalsy();
    });

    it("Ok button: not disabled by max and min date when calendar view and time", () => {
        component.minDate = new Date(2021, 0, 10);
        component.maxDate = new Date(2021, 0, 10);
        component.writeValue(new Date(2021, 0, 11));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('sfc-date-time-calendar')).properties.hidden).toBeFalsy();
        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeFalsy();
    });

    it("Ok button: not disabled by max and min date when hours view", () => {
        component.minDate = new Date(2021, 0, 10);
        component.maxDate = new Date(2021, 0, 10);
        component.writeValue(new Date(2021, 0, 11));
        component.ngOnInit();
        fixture.detectChanges();

        clickOk();

        expect(el.query(By.css('sfc-date-time-clock dtp-select-hour'))).toBeDefined();
        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeFalsy();
    });

    it("Ok button: not disabled", () => {
        component.time = false;
        component.minDate = new Date(2021, 0, 10);
        component.maxDate = new Date(2021, 0, 12);
        component.writeValue(new Date(2021, 0, 11));
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('sfc-button.button-ok')).classes.disabled).toBeFalsy();
    });

    it("Formats: default when date and time", () => {
        component.writeValue(new Date(2021, 0, 10, 20, 42));
        fixture.detectChanges();

        expect(inputEl.value).toEqual('10/1/2021, 20:42');
    });

    it("Formats: default when date only", () => {
        component.time = false;
        component.writeValue(new Date(2021, 0, 10, 20, 42));
        fixture.detectChanges();

        expect(inputEl.value).toEqual('10/1/2021');
    });

    it("Formats: default when time only", () => {
        component.date = false;
        component.writeValue(new Date(2021, 0, 10, 20, 42));
        fixture.detectChanges();

        expect(inputEl.value).toEqual('20:42');
    });

    it("Formats: default when time only and short time", () => {
        component.shortTime = true;
        component.date = false;
        component.writeValue(new Date(2021, 0, 10, 20, 42));
        fixture.detectChanges();

        expect(inputEl.value).toEqual('8:42 PM');
    });

    it("Formats: default when year only", () => {
        component.time = false;
        component.date = false;
        component.writeValue(new Date(2021, 0, 10, 20, 42));
        fixture.detectChanges();

        expect(inputEl.value).toEqual('Sunday, January 10, 2021 at 8:42:00 PM GMT+02:00');
    });

    it("Formats: custom", () => {
        component.format = 'MMMM d, y, H:mm';
        component.writeValue(new Date(2021, 0, 10, 20, 42));
        fixture.detectChanges();

        expect(inputEl.value).toEqual('January 10, 2021, 20:42');
    });

    function clickShowYears() {
        const yearEl = el.query(By.css('div.dtp-actual-year'));
        yearEl.triggerEventHandler('mousedown', { target: yearEl.nativeElement, button: 0 });
        fixture.detectChanges();
    }

    function clickCancel() {
        const cancelBtn = el.query(By.css('sfc-button.button-cancel'));
        cancelBtn.triggerEventHandler('mousedown', { target: cancelBtn.nativeElement, button: 0 });
        fixture.detectChanges();
    }

    function clickOk() {
        const cancelBtn = el.query(By.css('sfc-button.button-ok'));
        cancelBtn.triggerEventHandler('mousedown', { target: cancelBtn.nativeElement, button: 0 });
        fixture.detectChanges();
    }

    function clickNow() {
        const cancelBtn = el.query(By.css('sfc-button.button-now'));
        cancelBtn.triggerEventHandler('mousedown', { target: cancelBtn.nativeElement, button: 0 });
        fixture.detectChanges();
    }

    function clickClear() {
        const cancelBtn = el.query(By.css('sfc-button.button-clear'));
        cancelBtn.triggerEventHandler('mousedown', { target: cancelBtn.nativeElement, button: 0 });
        fixture.detectChanges();
    }
});