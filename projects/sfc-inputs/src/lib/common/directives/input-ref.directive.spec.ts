import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { InputRefDirective } from './input-ref.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgControl } from '@angular/forms';


@Component({
    template: `<input type="text" sfcinput>`
})
class TestHoverFocusComponent {

    @ViewChild(InputRefDirective, { static: false })
    private input: InputRefDirective;

    get isFocus() {
        return this.input ? this.input.isOnFocus : false;
    }

    get isTouched() {
        return this.input ? this.input.isTouched : false;
    }

    get hasError() {
        return this.input ? this.input.hasError : false;
    }

    get errorMessages() {
        return this.input ? this.input.errorMessages : null;
    }

    get minLengthError() {
        return this.input ? this.input.minLengthError : null;
    }

    get maxLengthError() {
        return this.input ? this.input.maxLengthError : null;
    }

    get requiredLength() {
        return this.input ? this.input.requiredLength : null;
    }
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

    it('Should create directive', () => {
        expect(component).toBeDefined();
    });

    it('Focus event', () => {
        inputEl.triggerEventHandler('focus', null);
        fixture.detectChanges();
        expect(component.isFocus).toBeTruthy();
    });

    it('Blur event', () => {
        inputEl.triggerEventHandler('focus', null);
        fixture.detectChanges();
        expect(component.isFocus).toBeTruthy();

        inputEl.triggerEventHandler('blur', null);
        fixture.detectChanges();
        expect(component.isFocus).toBeFalsy();
    });

    it('IsTouched', () => {
        expect(component.isTouched).toBeFalsy();
    });

    it('HasError', () => {
        expect(component.hasError).toBeFalsy();
    });

    it('ErrorMessages', () => {
        expect(component.errorMessages).toBeDefined();
        expect(component.errorMessages.length).toEqual(0);
    });

    it('MinLengthError', () => {
        expect(component.minLengthError).toBeUndefined();
    });

    it('MaxLengthError', () => {
        expect(component.maxLengthError).toBeUndefined();
    });

    it('RequiredLength', () => {
        expect(component.maxLengthError).toBeUndefined();
    });
});