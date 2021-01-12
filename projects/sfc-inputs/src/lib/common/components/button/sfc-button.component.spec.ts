import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { LocationType, TooltipType } from '../../constants/common-constants';
import { CommonUtils } from '../../utils/common-utils';
import { ButtonComponent } from './sfc-button.component';


describe('Component: BaseInputComponent', () => {

    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [ButtonComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ButtonComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    
});