import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { DebugElement } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe("Component: AppComponent", () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [AppComponent],
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