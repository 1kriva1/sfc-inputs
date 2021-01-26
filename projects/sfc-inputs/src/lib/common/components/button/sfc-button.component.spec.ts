import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { ButtonComponent } from './sfc-button.component';

describe('Component: ButtonComponent', () => {

    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ButtonComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("ButtonComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Main element: should exist", async(() => {
        expect(el.query(By.css('a.hbtn'))).toBeDefined();
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
    
    it("Text: empty by default", () => {
        expect(el.query(By.css('a.hbtn')).nativeElement.innerText).toEqual('');
    });

    it("Text: defined value", () => {
        component.text = 'Button text';
        fixture.detectChanges();

        expect(el.query(By.css('a.hbtn')).nativeElement.innerText).toEqual('Button text');
    });

    it("Disabled: by default should be not disabled", async(() => {
        expect(el.classes.disabled).toBeFalsy();
    }));

    it("Disabled: disabled when input parameter is true", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(el.classes.disabled).toBeTruthy();

        component.disabled = false;
        fixture.detectChanges();

        expect(el.classes.disabled).toBeFalsy();
    }));
});