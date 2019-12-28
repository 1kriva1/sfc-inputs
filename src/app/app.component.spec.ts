import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CommonModule } from '@angular/common';
import { TextInputComponent } from "../../projects/sfc-inputs/src/lib/sfc-text-input/sfc-text-input.component";
import { DebugElement } from "@angular/core";
import {By} from "@angular/platform-browser";

describe("Component: AppComponent", () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, TextInputComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();
        });
    }));
    
    it("should be defined ", async(() => {
        expect(component).toBeTruthy();
    }));
});