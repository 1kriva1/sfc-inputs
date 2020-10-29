import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { TagsChipComponent } from './sfc-tags-chip.component';
import { StyleClass } from '../../common/constants/common-constants';

describe('Component: TagsChipComponent', () => {

    let component: TagsChipComponent;
    let fixture: ComponentFixture<TagsChipComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TagsChipComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();
        });
    }));

    it("TagsChipComponent: should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Container: should exist", async(() => {
        expect(el.query(By.css('div.chip'))).toBeTruthy();
    }));

    it("Image: not created if image value not defined", () => {
        expect(fixture.nativeElement.querySelector('img')).toBeNull();
    });

    it("Image: should create icon element if icon value defined", () => {
        component.image = 'test-image';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('img')).toBeDefined();
    });

    it("Image: should has correct src value", () => {
        component.image = 'test-image';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('img').attributes['src'].value).toEqual(component.image);
    });

    it("Display value: default value", () => {
        expect(el.query(By.css('div.chip')).nativeElement.innerText).toEqual('');
    });

    it("Display value: should has value", () => {
        component.displayValue = 'test value';
        fixture.detectChanges();

        expect(el.query(By.css('div.chip')).nativeElement.innerText).toEqual(component.displayValue);
    });

    it("Remove button: should exist", () => {
        expect(el.query(By.css('i.close'))).toBeTruthy();
    });

    it("Remove button: permanent classes", () => {
        const removeButton = fixture.nativeElement.querySelector('i.close');

        expect(removeButton.className).toContain('fa');
        expect(removeButton.className).toContain('fa-times');
    });

    it("Disabled: has NOT disabled chip", () => {
        expect(fixture.nativeElement.className).not.toContain(StyleClass.Disabled);
    });

    it("Disabled: has disabled chip", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(StyleClass.Disabled);
    });

    it("Remove event: was called", () => {
        spyOn(component.removed, 'emit');

        const removeBtn = el.query(By.css('i.close'));
        removeBtn.triggerEventHandler('click', { target: removeBtn.nativeElement });
        fixture.detectChanges();

        expect(component.removed.emit).toHaveBeenCalled();
    });

    it("Remove event: was called with value", () => {
        spyOn(component.removed, 'emit');
        component.displayValue = 'test value';        
        fixture.detectChanges();

        const removeBtn = el.query(By.css('i.close'));
        removeBtn.triggerEventHandler('click', { target: removeBtn.nativeElement });
        fixture.detectChanges();

        expect(component.removed.emit).toHaveBeenCalledWith(component.displayValue);
    });
});