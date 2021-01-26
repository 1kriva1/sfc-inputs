import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { InputRefDirective } from './input-ref.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
    template: `<form>
                    <input sfcinput type="text" name="text-input" ngModel maxlength="5" >
               </form>`
})
class TestHoverFocusComponent {

    @ViewChild(InputRefDirective, { static: false })
    public inputRef: InputRefDirective;
}

describe('Directive: InputRefDirective', () => {

    let component: TestHoverFocusComponent;
    let fixture: ComponentFixture<TestHoverFocusComponent>;
    let inputEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestHoverFocusComponent, InputRefDirective]
        });
        fixture = TestBed.createComponent(TestHoverFocusComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));
        fixture.detectChanges();
    }));

    it('InputRefDirective: Should create directive', () => {
        expect(component.inputRef).toBeDefined();
    });

    it('Focus event', () => {
        inputEl.triggerEventHandler('focus', null);
        fixture.detectChanges();

        expect(component.inputRef.isOnFocus).toBeTruthy();
    });

    it('Blur event', () => {
        inputEl.triggerEventHandler('focus', null);
        fixture.detectChanges();
        expect(component.inputRef.isOnFocus).toBeTruthy();

        inputEl.triggerEventHandler('blur', null);
        fixture.detectChanges();
        expect(component.inputRef.isOnFocus).toBeFalsy();
    });

    it('isDirty property', () => {
        expect(component.inputRef.isDirty).toBeFalsy();
    });

    it('isDirty property after change value', () => {
        inputEl.nativeElement.value = 'test value';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.isDirty).toBeTruthy();
    });

    it('hasValue property', () => {
        expect(component.inputRef.hasValue).toBeFalsy();
    });

    it('hasValue property after change value', () => {
        inputEl.nativeElement.value = 'test value';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.hasValue).toBeTruthy();
    });

    it('hasInvalidValue property', () => {
        expect(component.inputRef.hasInvalidValue).toBeFalsy();
    });

    it('hasInvalidValue property after change to invalid value', () => {
        inputEl.nativeElement.value = 'test value';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.hasInvalidValue).toBeTruthy();
    });

    it('hasInvalidValue property after change to valid value', () => {
        inputEl.nativeElement.value = 'test';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.hasInvalidValue).toBeFalsy();
    });

    it('errors property', () => {
        expect(component.inputRef.errors).toBeNull();
    });

    it('errors property after change to invalid value', () => {
        inputEl.nativeElement.value = 'test value';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.errors).toBeDefined();
        expect(component.inputRef.errors['maxlength']).toBeDefined();
    });

    it('errors property after change to valid value', () => {
        inputEl.nativeElement.value = 'test';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.errors).toBeNull();
    });

    it('isValid property', () => {
        expect(component.inputRef.isValid).toBeUndefined();
    });

    it('isValid property after change to invalid value(dirty input)', () => {
        inputEl.nativeElement.value = 'test value';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.isValid).toBeFalsy();
    });

    it('isValid property after change to valid value(dirty input)', () => {
        inputEl.nativeElement.value = 'test';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.isValid).toBeTruthy();
    });

    it('isInvalid property', () => {
        expect(component.inputRef.isInvalid).toBeFalsy();
    });

    it('isInvalid property after change to invalid value(dirty input)', () => {
        inputEl.nativeElement.value = 'test value';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.isInvalid).toBeTruthy();
    });

    it('isInvalid property after change to valid value(dirty input)', () => {
        inputEl.nativeElement.value = 'test';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.inputRef.isInvalid).toBeFalsy();
    });

});