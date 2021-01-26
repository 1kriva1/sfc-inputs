import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { InputModalComponent } from './sfc-modal.component';

describe('Component: InputModalComponent', () => {

    let component: InputModalComponent;
    let fixture: ComponentFixture<InputModalComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(InputModalComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("InputModalComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Main elements: should exist", async(() => {
        expect(el.query(By.css('div.modal-overlay'))).toBeDefined();
        expect(el.query(By.css('div.modal'))).toBeDefined();
        expect(el.query(By.css('div.modal-header'))).toBeDefined();
        expect(el.query(By.css('div.modal-body'))).toBeDefined();
        expect(el.query(By.css('div.modal-footer'))).toBeDefined();
    }));

    it("Show/Hide: by default should be hide", async(() => {
        expect(el.classes.active).toBeFalsy();
    }));

    it("Show/Hide: show when input parameter is true", async(() => {
        component.show = true;
        fixture.detectChanges();

        expect(el.classes.active).toBeTruthy();

        component.show = false;
        fixture.detectChanges();

        expect(el.classes.active).toBeFalsy();
    }));

    it("Close button: should exist", async(() => {
        expect(el.query(By.css('i.button-close'))).toBeDefined();
    }));

    it("Close button: icon value", async(() => {
        const closeBtnEl = el.query(By.css('i.button-close')).nativeElement;

        expect(closeBtnEl.className).toContain('fa');
        expect(closeBtnEl.className).toContain('fa-times');
    }));

    it("Close button: on close click", async(() => {
        spyOn(component.closed, 'emit').and.callThrough();

        expect(component.closed.emit).not.toHaveBeenCalled();

        const closeBtnEl = el.query(By.css('i.button-close'));
        closeBtnEl.triggerEventHandler('click', { target: closeBtnEl.nativeElement });
        fixture.detectChanges();

        expect(component.closed.emit).toHaveBeenCalledTimes(1);
    }));

    it("Footer buttons: should be two", async(() => {
        expect(el.queryAll(By.css('sfc-button')).length).toEqual(2);
    }));

    it("Footer buttons: text value", async(() => {
        const footerBtns = el.queryAll(By.css('sfc-button'));
        expect(footerBtns[0].nativeElement.attributes.text.textContent).toEqual('Cancel');
        expect(footerBtns[1].nativeElement.attributes.text.textContent).toEqual('Ok');
    }));

    it("Cancel button: on click", async(() => {
        spyOn(component.closed, 'emit').and.callThrough();

        expect(component.closed.emit).not.toHaveBeenCalled();

        const cancelBtnEl = el.query(By.css('sfc-button.button-calcel'));
        cancelBtnEl.triggerEventHandler('click', { target: cancelBtnEl.nativeElement });
        fixture.detectChanges();

        expect(component.closed.emit).toHaveBeenCalledTimes(1);
    }));

    it("Ok button: on click", async(() => {
        spyOn(component.ok, 'emit').and.callThrough();

        expect(component.ok.emit).not.toHaveBeenCalled();

        const okBtnEl = el.query(By.css('sfc-button.button-ok'));
        okBtnEl.triggerEventHandler('click', { target: okBtnEl.nativeElement });
        fixture.detectChanges();

        expect(component.ok.emit).toHaveBeenCalledTimes(1);
    }));
});