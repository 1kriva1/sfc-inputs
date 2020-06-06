import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { TextInputComponent } from '../../sfc-text-input/sfc-text-input.component';

@Component({
    template: `<form>
                    <sfc-text-input name="text-input" ngModel required minlength="2" maxlength="5"></sfc-text-input>
               </form>`
})
class TestTextInputInFormComponent {

    @ViewChild(TextInputComponent, { static: false })
    public textInputComponent: TextInputComponent;
}

describe('Component: BaseTextInputComponent', () => {

    let component: TestTextInputInFormComponent;
    let fixture: ComponentFixture<TestTextInputInFormComponent>;
    let el: DebugElement;
    let debugInputEl: DebugElement;
    let inputEl: any;
    let labelEl: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [TestTextInputInFormComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TestTextInputInFormComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            inputEl = fixture.nativeElement.querySelector('input');
            debugInputEl = el.query(By.css('input'));
            labelEl = fixture.nativeElement.querySelector('label');

            fixture.detectChanges();
        });
    }));

    it("Required Length: default value (NULL)", () => {
        expect(fixture.nativeElement.querySelector('span.character-counter').hidden).toBeTruthy();
    });

    it("Required Length: valid value", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: 'test' } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').hidden).toBeTruthy();
    });

    it("Required Length: invalid value, but NOT related to length validation", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: '' } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').hidden).toBeTruthy();
    });

    it("Required Length: invalid value, min length validation", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: 't' } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').hidden).toBeFalsy();
    });

    it("Required Length: invalid value, max length validation", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: 'test test' } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').hidden).toBeFalsy();
    });

    it("Char Counter Value: default value ('')", () => {
        expect(fixture.nativeElement.querySelector('span.character-counter').innerText).toEqual('');
    });

    it("Char Counter Value: valid value", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: 'test' } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText).toEqual('');
    });

    it("Char Counter Value: invalid value, min length validation", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: 't' } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText).toEqual('1/2');
    });

    it("Char Counter Value: invalid value, max length validation", () => {
        debugInputEl.triggerEventHandler('input', { target: { nativeElement: debugInputEl.nativeElement, value: 'test test' } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText).toEqual('9/5');
    });
});