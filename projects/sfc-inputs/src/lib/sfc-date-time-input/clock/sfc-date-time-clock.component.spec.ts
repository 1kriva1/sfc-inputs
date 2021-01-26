import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { DateTimeClockComponent } from './sfc-date-time-clock.component';
import { DateTimeViewTypes } from '../../common/constants/common-constants';

describe('Component: DateTimeInputComponent - Clock', () => {

    let component: DateTimeClockComponent;
    let fixture: ComponentFixture<DateTimeClockComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DateTimeClockComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();
        });
    }));

    it("DateTimeClockComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Clock container: should NOT create component when current date is NULL", async(() => {
        expect(el.query(By.css('div.dtp-picker-datetime'))).toBeNull();
    }));

    it("Clock container: should create component when current date is defined", async(() => {
        component.currentDate = new Date();
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-picker-datetime'))).toBeDefined();
    }));

    it("Display time: with default conditions", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-time')).nativeElement.innerText).toEqual('15:15');
    }));

    it("Display time: with default conditions when minutes is less than 10", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 9);
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-time')).nativeElement.innerText).toEqual('15:09');
    }));

    it("Display time: when short time", async(() => {
        component.shortTime = true;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        expect(el.query(By.css('div.dtp-actual-time')).nativeElement.innerText).toEqual('3:15 PM');
    }));

    it("Clock: main components", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        expect(el.query(By.css('circle.clock-circle'))).toBeDefined();
        expect(el.query(By.css('line.minute-hand'))).toBeDefined();
        expect(el.query(By.css('line.hour-hand'))).toBeDefined();
        expect(el.query(By.css('circle.clock-point'))).toBeDefined();
    }));

    it("Clock hands: hour hand is active", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        expect(el.query(By.css('line.minute-hand.active'))).toBeNull();
        expect(el.query(By.css('line.hour-hand.active'))).toBeDefined();
    }));

    it("Clock hands: minute hand is active", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        expect(el.query(By.css('line.minute-hand.active'))).toBeDefined();
        expect(el.query(By.css('line.hour-hand.active'))).toBeNull();
    }));

    it("Clock hands: hour hand styles", async(() => {
        component.currentDate = new Date(1992, 0, 1, 0, 0);
        fixture.detectChanges();

        expect(el.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(0deg)');

        component.currentDate = new Date(1992, 0, 1, 6, 0);
        fixture.detectChanges();

        expect(el.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(180deg)');

        component.currentDate = new Date(1992, 0, 1, 12, 0);
        fixture.detectChanges();

        expect(el.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(360deg)');

        component.currentDate = new Date(1992, 0, 1, 15, 0);
        fixture.detectChanges();

        expect(el.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(450deg)');

        component.currentDate = new Date(1992, 0, 1, 24, 0);
        fixture.detectChanges();

        expect(el.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(0deg)');
    }));

    it("Clock hands: minutes hand styles", async(() => {
        component.currentDate = new Date(1992, 0, 1, 0, 0);
        fixture.detectChanges();

        expect(el.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(0deg)');

        component.currentDate = new Date(1992, 0, 1, 0, 15);
        fixture.detectChanges();

        expect(el.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(90deg)');

        component.currentDate = new Date(1992, 0, 1, 0, 45);
        fixture.detectChanges();

        expect(el.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(270deg)');

        component.currentDate = new Date(1992, 0, 1, 0, 60);
        fixture.detectChanges();

        expect(el.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(0deg)');

        component.currentDate = new Date(1992, 0, 1, 0, 17);
        fixture.detectChanges();

        expect(el.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(102deg)');
    }));

    it("Clock(hour): when current view is hours", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        expect(el.queryAll(By.css('circle.dtp-select-hour')).length).toEqual(24);
        expect(el.queryAll(By.css('text.dtp-select-hour-text')).length).toEqual(24);
    }));

    it("Clock(hour): when current view is hours and short time", async(() => {
        component.shortTime = true;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.queryAll(By.css('circle.dtp-select-hour')).length).toEqual(12);
        expect(el.queryAll(By.css('text.dtp-select-hour-text')).length).toEqual(12);
    }));

    it("Clock(hour): attributes existence", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        const hourCircles = el.queryAll(By.css('circle.dtp-select-hour')),
            hourTexts = el.queryAll(By.css('text.dtp-select-hour-text'));

        for (let i = 0; i < hourCircles.length; i++) {
            expect(hourCircles[i].attributes.cx).toBeDefined();
            expect(hourCircles[i].attributes.cy).toBeDefined();
        }

        for (let i = 0; i < hourTexts.length; i++) {
            expect(hourTexts[i].attributes.x).toBeDefined();
            expect(hourTexts[i].attributes.y).toBeDefined();
        }
    }));

    it("Clock(hour): selected hour", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        const hourCircles = el.queryAll(By.css('circle.dtp-select-hour')),
            hourTexts = el.queryAll(By.css('text.dtp-select-hour-text'));

        for (let i = 0; i < hourCircles.length; i++) {
            if (i == 15)
                expect(hourCircles[i].classes.selected).toBeTruthy();
            else
                expect(hourCircles[i].classes.selected).toBeUndefined();
        }

        for (let i = 0; i < hourTexts.length; i++) {
            if (i == 15)
                expect(hourTexts[i].classes.selected).toBeTruthy();
            else
                expect(hourTexts[i].classes.selected).toBeUndefined();
        }
    }));

    it("Clock(hour): disabled hour by min date (13:00)", async(() => {
        component.minDate = new Date(1992, 0, 1, 13, 0);
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        fixture.detectChanges();

        const hourCircles = el.queryAll(By.css('circle.dtp-select-hour')),
            hourTexts = el.queryAll(By.css('text.dtp-select-hour-text'));

        for (let i = 0; i < hourCircles.length; i++) {
            if (i < 13)
                expect(hourCircles[i].classes.disabled).toBeTruthy();
            else
                expect(hourCircles[i].classes.disabled).toBeUndefined();
        }

        for (let i = 0; i < hourTexts.length; i++) {
            if (i < 13)
                expect(hourTexts[i].classes.disabled).toBeTruthy();
            else
                expect(hourTexts[i].classes.disabled).toBeUndefined();
        }
    }));

    it("Clock(hour): disabled hour by max date (17:00)", async(() => {
        component.maxDate = new Date(1992, 0, 1, 17, 0);
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        fixture.detectChanges();

        const hourCircles = el.queryAll(By.css('circle.dtp-select-hour')),
            hourTexts = el.queryAll(By.css('text.dtp-select-hour-text'));

        for (let i = 0; i < hourCircles.length; i++) {
            if (i > 17)
                expect(hourCircles[i].classes.disabled).toBeTruthy();
            else
                expect(hourCircles[i].classes.disabled).toBeUndefined();
        }

        for (let i = 0; i < hourTexts.length; i++) {
            if (i > 17)
                expect(hourTexts[i].classes.disabled).toBeTruthy();
            else
                expect(hourTexts[i].classes.disabled).toBeUndefined();
        }
    }));

    it("Clock(hour): disabled hour by min date (13:00) and max date (17:00)", async(() => {
        component.minDate = new Date(1992, 0, 1, 13, 0);
        component.maxDate = new Date(1992, 0, 1, 17, 0);
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        fixture.detectChanges();

        const hourCircles = el.queryAll(By.css('circle.dtp-select-hour')),
            hourTexts = el.queryAll(By.css('text.dtp-select-hour-text'));

        for (let i = 0; i < hourCircles.length; i++) {
            if (i < 13 || i > 17)
                expect(hourCircles[i].classes.disabled).toBeTruthy();
            else
                expect(hourCircles[i].classes.disabled).toBeUndefined();
        }

        for (let i = 0; i < hourTexts.length; i++) {
            if (i < 13 || i > 17)
                expect(hourTexts[i].classes.disabled).toBeTruthy();
            else
                expect(hourTexts[i].classes.disabled).toBeUndefined();
        }
    }));

    it("Clock(hour): select hour", async(() => {
        spyOn(component.hourSelected, 'emit').and.callThrough();
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        selectValue(el.queryAll(By.css('circle.dtp-select-hour'))[13]);
        expect(component.hourSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.hourSelected.emit).toHaveBeenCalledWith(13);
    }));

    it("Clock(hour): select hour when short time", async(() => {
        spyOn(component.hourSelected, 'emit').and.callThrough();
        component.shortTime = true;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        component.ngOnInit();
        fixture.detectChanges();

        selectValue(el.queryAll(By.css('circle.dtp-select-hour'))[1]);
        expect(component.hourSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.hourSelected.emit).toHaveBeenCalledWith(13);
    }));

    it("Clock(hour): select hour that already selected", async(() => {
        spyOn(component.hourSelected, 'emit').and.callThrough();
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        selectValue(el.queryAll(By.css('circle.dtp-select-hour'))[15]);
        expect(component.hourSelected.emit).not.toHaveBeenCalled();
    }));

    it("Clock(hour): select same hour twice", async(() => {
        spyOn(component.hourSelected, 'emit').and.callThrough();
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        selectValue(el.queryAll(By.css('circle.dtp-select-hour'))[13], new Date(1992, 0, 1, 13, 15));

        selectValue(el.queryAll(By.css('circle.dtp-select-hour'))[13], new Date(1992, 0, 1, 13, 15));

        expect(component.hourSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.hourSelected.emit).toHaveBeenCalledWith(13);
    }));

    it("Clock(hour): select hour will change active hour", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        selectValue(el.queryAll(By.css('circle.dtp-select-hour'))[13], new Date(1992, 0, 1, 13, 15));

        const hourCircles = el.queryAll(By.css('circle.dtp-select-hour')),
            hourTexts = el.queryAll(By.css('text.dtp-select-hour-text'));

        expect(hourCircles[13].classes.selected).toBeTruthy();
        expect(hourTexts[13].classes.selected).toBeTruthy();
        expect(hourCircles[15].classes.selected).toBeFalsy();
        expect(hourTexts[15].classes.selected).toBeFalsy();
    }));

    it("Clock(hour): hour display values", async(() => {
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        fixture.detectChanges();

        const hourTexts = el.queryAll(By.css('text.dtp-select-hour-text'));

        for (let i = 0; i < hourTexts.length; i++) {
            expect(hourTexts[i].nativeElement.textContent).toEqual(` ${i == 0 ? 12 : i} `);
        }
    }));

    it("Clock(hour): hide meridien when shortTime is false", async(() => {
        component.shortTime = false;
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        fixture.detectChanges();

        expect(el.query(By.css('div.meridien-handler.left a'))).toBeNull();
        expect(el.query(By.css('div.meridien-handler.right a'))).toBeNull();
    }));

    it("Clock(hour): show meridien when shortTime is true", async(() => {
        component.shortTime = true;
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.meridien-handler.left a'))).toBeDefined();
        expect(el.query(By.css('div.meridien-handler.left a')).nativeElement.innerText).toEqual('AM');
        expect(el.query(By.css('div.meridien-handler.right a'))).toBeDefined();
        expect(el.query(By.css('div.meridien-handler.right a')).nativeElement.innerText).toEqual('PM');
    }));

    it("Clock(hour): AM meridien is selected", async(() => {
        component.shortTime = true;
        component.currentDate = new Date(1992, 0, 1, 3, 0);
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.meridien-handler.left a.selected'))).toBeDefined();
        expect(el.query(By.css('div.meridien-handler.right a.selected'))).toBeNull();
    }));

    it("Clock(hour): PM meridien is selected", async(() => {
        component.shortTime = true;
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.meridien-handler.left a.selected'))).toBeNull();
        expect(el.query(By.css('div.meridien-handler.right a.selected'))).toBeDefined();
    }));

    it("Clock(hour): AM meridien is disabled", async(() => {
        component.shortTime = true;
        component.minDate = new Date(1992, 0, 1, 13, 0);
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.meridien-handler.left a.disabled'))).toBeDefined();
    }));

    it("Clock(hour): PM meridien is disabled", async(() => {
        component.shortTime = true;
        component.maxDate = new Date(1992, 0, 1, 11, 0);
        component.currentDate = new Date(1992, 0, 1, 7, 0);
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.query(By.css('div.meridien-handler.right a.disabled'))).toBeDefined();
    }));

    it("Clock(hour): on AM meridien click", async(() => {
        spyOn(component.hourSelected, 'emit').and.callThrough();
        component.shortTime = true;        
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        component.ngOnInit();
        fixture.detectChanges();

        selectValue(el.query(By.css('div.meridien-handler.left a')), new Date(1992, 0, 1, 3, 0));

        expect(component.hourSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.hourSelected.emit).toHaveBeenCalledWith(3);
        expect(el.query(By.css('div.meridien-handler.left a.selected'))).toBeDefined();
        expect(el.query(By.css('div.dtp-actual-time')).nativeElement.innerText).toEqual('3:00 AM');
    }));

    it("Clock(hour): on AM meridien click twice", async(() => {
        spyOn(component.hourSelected, 'emit').and.callThrough();
        component.shortTime = true;        
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        component.ngOnInit();
        fixture.detectChanges();

        selectValue(el.query(By.css('div.meridien-handler.left a')), new Date(1992, 0, 1, 3, 0));

        selectValue(el.query(By.css('div.meridien-handler.left a')), new Date(1992, 0, 1, 3, 0));

        expect(component.hourSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.hourSelected.emit).toHaveBeenCalledWith(3);
    }));

    it("Clock(hour): on PM meridien click", async(() => {
        spyOn(component.hourSelected, 'emit').and.callThrough();
        component.shortTime = true;        
        component.currentDate = new Date(1992, 0, 1, 3, 0);
        component.ngOnInit();
        fixture.detectChanges();

        selectValue(el.query(By.css('div.meridien-handler.right a')), new Date(1992, 0, 1, 15, 0));

        expect(component.hourSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.hourSelected.emit).toHaveBeenCalledWith(15);
        expect(el.query(By.css('div.meridien-handler.right a.selected'))).toBeDefined();
        expect(el.query(By.css('div.dtp-actual-time')).nativeElement.innerText).toEqual('3:00 PM');
    }));

    it("Clock(hour): on PM meridien click twice", async(() => {
        spyOn(component.hourSelected, 'emit').and.callThrough();
        component.shortTime = true;        
        component.currentDate = new Date(1992, 0, 1, 3, 0);
        component.ngOnInit();
        fixture.detectChanges();

        selectValue(el.query(By.css('div.meridien-handler.right a')), new Date(1992, 0, 1, 15, 0));

        selectValue(el.query(By.css('div.meridien-handler.right a')), new Date(1992, 0, 1, 15, 0));

        expect(component.hourSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.hourSelected.emit).toHaveBeenCalledWith(15);
    }));

    it("Clock(minutes): when current view is minutes", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        expect(el.queryAll(By.css('circle.dtp-select-minute')).length).toEqual(108);
        expect(el.queryAll(By.css('circle.dtp-select-minute.point')).length).toEqual(48);
        expect(el.queryAll(By.css('text.dtp-select-minute-text')).length).toEqual(12);
    }));

    it("Clock(minutes): attributes existence", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        const minuteCircles = el.queryAll(By.css('circle.dtp-select-minute')),
            minuteTexts = el.queryAll(By.css('text.dtp-select-minute-text'));

        for (let i = 0; i < minuteCircles.length; i++) {

            if (minuteCircles[i].classes.point)
                expect(minuteCircles[i].attributes.r).toEqual('3');
            else
                expect(minuteCircles[i].attributes.r).toEqual('12');

            expect(minuteCircles[i].attributes.cx).toBeDefined();
            expect(minuteCircles[i].attributes.cy).toBeDefined();
        }

        for (let i = 0; i < minuteTexts.length; i++) {
            expect(minuteTexts[i].attributes.x).toBeDefined();
            expect(minuteTexts[i].attributes.y).toBeDefined();
        }
    }));

    it("Clock(minutes): selected minute", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        const minuteCircles = el.queryAll(By.css('circle.dtp-select-minute')),
            minuteTexts = el.queryAll(By.css('text.dtp-select-minute-text'));

        for (let i = 0; i < minuteCircles.length; i++) {
            if (i == 27) // 15 minute circle
                expect(minuteCircles[i].classes.selected).toBeTruthy();
            else
                expect(minuteCircles[i].classes.selected).toBeUndefined();
        }

        for (let i = 0; i < minuteTexts.length; i++) {
            if (i == 3) // 15 minute text
                expect(minuteTexts[i].classes.selected).toBeTruthy();
            else
                expect(minuteTexts[i].classes.selected).toBeUndefined();
        }
    }));

    it("Clock(minutes): disabled minutes by min date (15:15)", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.minDate = new Date(1992, 0, 1, 15, 15);
        component.currentDate = new Date(1992, 0, 1, 15, 30);
        fixture.detectChanges();

        const minuteCircles = el.queryAll(By.css('circle.dtp-select-minute')),
            minuteTexts = el.queryAll(By.css('text.dtp-select-minute-text'));

        for (let i = 0; i < minuteCircles.length; i++) {
            if (i < 27)
                expect(minuteCircles[i].classes.disabled).toBeTruthy();
            else
                expect(minuteCircles[i].classes.disabled).toBeFalsy();
        }

        for (let i = 0; i < minuteTexts.length; i++) {
            if (i < 3)
                expect(minuteTexts[i].classes.disabled).toBeTruthy();
            else
                expect(minuteTexts[i].classes.disabled).toBeFalsy();
        }
    }));

    it("Clock(minutes): disabled minutes by max date (15:15)", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.maxDate = new Date(1992, 0, 1, 15, 15);
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        fixture.detectChanges();

        const minuteCircles = el.queryAll(By.css('circle.dtp-select-minute')),
            minuteTexts = el.queryAll(By.css('text.dtp-select-minute-text'));

        for (let i = 0; i < minuteCircles.length; i++) {
            if (i > 27)
                expect(minuteCircles[i].classes.disabled).toBeTruthy();
            else
                expect(minuteCircles[i].classes.disabled).toBeFalsy();
        }

        for (let i = 0; i < minuteTexts.length; i++) {
            if (i > 3)
                expect(minuteTexts[i].classes.disabled).toBeTruthy();
            else
                expect(minuteTexts[i].classes.disabled).toBeFalsy();
        }
    }));

    it("Clock(minutes): disabled minute by min date (15:10) and max date (15:15)", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.minDate = new Date(1992, 0, 1, 15, 10);
        component.maxDate = new Date(1992, 0, 1, 15, 15);
        component.currentDate = new Date(1992, 0, 1, 15, 12);
        fixture.detectChanges();

        const minuteCircles = el.queryAll(By.css('circle.dtp-select-minute')),
            minuteTexts = el.queryAll(By.css('text.dtp-select-minute-text'));

        for (let i = 0; i < minuteCircles.length; i++) {
            if (i < 18 || i > 27)
                expect(minuteCircles[i].classes.disabled).toBeTruthy();
            else
                expect(minuteCircles[i].classes.disabled).toBeFalsy();
        }

        for (let i = 0; i < minuteTexts.length; i++) {
            if (i < 2 || i > 3)
                expect(minuteTexts[i].classes.disabled).toBeTruthy();
            else
                expect(minuteTexts[i].classes.disabled).toBeFalsy();
        }
    }));

    it("Clock(minutes): select minute", async(() => {
        spyOn(component.minuteSelected, 'emit').and.callThrough();
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 10);
        fixture.detectChanges();

        let event = selectValue(el.queryAll(By.css('text.dtp-select-minute-text'))[3]);
        expect(component.minuteSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.minuteSelected.emit).toHaveBeenCalledWith({ event: event, value: 15 });
    }));

    it("Clock(minutes): select minute that already selected", async(() => {
        spyOn(component.minuteSelected, 'emit').and.callThrough();
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        selectValue(el.queryAll(By.css('text.dtp-select-minute-text'))[3]);
        expect(component.minuteSelected.emit).not.toHaveBeenCalled();
    }));

    it("Clock(minutes): select same minute twice", async(() => {
        spyOn(component.minuteSelected, 'emit').and.callThrough();
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        let event = selectValue(el.queryAll(By.css('circle.dtp-select-minute'))[29], new Date(1992, 0, 1, 15, 16));

        selectValue(el.queryAll(By.css('circle.dtp-select-minute'))[29], new Date(1992, 0, 1, 15, 16));

        expect(component.minuteSelected.emit).toHaveBeenCalledTimes(1);
        expect(component.minuteSelected.emit).toHaveBeenCalledWith({ event: event, value: 16 });
    }));

    it("Clock(minutes): select hour will change active hour", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 15);
        fixture.detectChanges();

        selectValue(el.queryAll(By.css('circle.dtp-select-minute'))[29], new Date(1992, 0, 1, 15, 16));

        const minuteCircles = el.queryAll(By.css('circle.dtp-select-minute')),
            minuteTexts = el.queryAll(By.css('text.dtp-select-minute-text'));

        expect(minuteCircles[28].classes.selected).toBeTruthy();
        expect(minuteTexts[3].classes.selected).toBeFalsy();
        expect(minuteCircles[27].classes.selected).toBeFalsy();
    }));

    it("Clock(minutes): minute display values", async(() => {
        component.currentView = DateTimeViewTypes.Minutes;
        component.currentDate = new Date(1992, 0, 1, 15, 0);
        fixture.detectChanges();

        const minuteTexts = el.queryAll(By.css('text.dtp-select-minute-text'));

        for (let i = 0; i < minuteTexts.length; i++) {
            expect(minuteTexts[i].nativeElement.textContent).toEqual(` ${i * 5} `);
        }
    }));

    function selectValue(el: DebugElement, value: Date = null): any {
        const event = { target: el.nativeElement, button: 0 };
        el.triggerEventHandler('mousedown', event);
        fixture.detectChanges();

        if (value) {
            component.currentDate = value;
            fixture.detectChanges();
        }

        return event;
    }
});