import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CommonModule } from '@angular/common';
import { TextInputComponent } from "../../projects/sfc-inputs/src/lib/sfc-text-input/sfc-text-input.component";
import { DebugElement } from "@angular/core";
import { InputRefDirective } from "../../projects/sfc-inputs/src/lib/common/input-ref.directive";
import {By} from "@angular/platform-browser";

describe("Component: AppComponent", () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let el: DebugElement;
    let emailField: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, TextInputComponent, InputRefDirective],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            emailField = el.query(By.css('#email-input'));

            fixture.detectChanges();
        });
    }));
    
    it("should be defined ", async(() => {
        expect(component).toBeTruthy();
    }));

    it("should create a sfc text input", async(() => {
        expect(emailField).toBeTruthy();
    }))

    it("should create an icon inside sfc text input", async(() => {
        //console.log(emailField.nativeElement);
        expect(emailField.query(By.css('i.icon.fa.fa-envelope'))).toBeTruthy();
    }))

    it("should create an input text in sfc text input", async(() => {
        expect(emailField.query(By.css('input.test-class'))).toBeTruthy();
    }))
});