import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcInputsModule } from 'projects/sfc-inputs/src/lib/sfc-inputs.module';
import { CircleLoaderComponent } from '../circle/sfc-circle-loader.component';
import { ComponentSizeType } from '../../../constants/common-constants';
import { LoaderService } from './sfc-loader.service';
import { CollectionUtils } from '../../../utils/collection-utils';

describe('Component: Loader', () => {

    let component: CircleLoaderComponent;
    let fixture: ComponentFixture<CircleLoaderComponent>;
    let el: DebugElement;
    const loaderService = new LoaderService(new CollectionUtils());

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [],
            providers: [{ provide: LoaderService, useValue: loaderService }]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CircleLoaderComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();
        });
    }));

    it("Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Preloader: should not exist", async(() => {
        const preloaderEl = fixture.nativeElement.querySelector('div.preloader');
        expect(preloaderEl).toBeFalsy();
    }));

    it("Preloader: should exist", async(() => {
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Preloader: global id", async(() => {
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.global');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Preloader: secondary id", async(() => {
        component.id = "my-loader";
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.secondary');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Preloader: background by default", async(() => {
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.background');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Preloader: without background", async(() => {
        component.background = false;
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.background');
        expect(preloaderEl).toBeFalsy();
    }));

    it("Size: default value", async(() => {
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader div.medium');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Size: small size", async(() => {
        component.size = ComponentSizeType.Small;
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader div.small');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Size: custom size", async(() => {
        component.customSize = { width: 100, height: 100 };
        component.size = ComponentSizeType.Small;
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader div.small');
        expect(preloaderEl).toBeFalsy();
    }));

    it("Size: custom size value check", async(() => {
        component.customSize = { width: 100, height: 80 };
        component.show = true;
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader div');
        expect(preloaderEl.offsetWidth).toEqual(component.customSize.width);
        expect(preloaderEl.offsetHeight).toEqual(component.customSize.height);
    }));

    it("Loader service: show global loader", async(() => {

        loaderService.showLoader();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.global');
        expect(preloaderEl).toBeTruthy();

        loaderService.hideLoader();
        fixture.detectChanges();
    }));

    it("Loader service: hide global loader", async(() => {
        component.show = true;
        fixture.detectChanges();

        loaderService.hideLoader();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.global');
        expect(preloaderEl).toBeFalsy();
    }));

    it("Loader service: show loader", async(() => {
        let fixtureSecondaryLoader = TestBed.createComponent(CircleLoaderComponent);
        let elSecondaryLoader = fixtureSecondaryLoader.debugElement;
        let componentSecondaryLoader = elSecondaryLoader.componentInstance;

        componentSecondaryLoader.id = "my-loader";
        fixtureSecondaryLoader.detectChanges();

        loaderService.showLoader("my-loader");
        fixtureSecondaryLoader.detectChanges();

        const preloaderEl = fixtureSecondaryLoader.nativeElement.querySelector('div.preloader.secondary');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Loader service: hide loader", async(() => {
        let fixtureSecondaryLoader = TestBed.createComponent(CircleLoaderComponent);
        let elSecondaryLoader = fixtureSecondaryLoader.debugElement;
        let componentSecondaryLoader = elSecondaryLoader.componentInstance;

        componentSecondaryLoader.id = "my-loader";
        componentSecondaryLoader.show = true;
        fixtureSecondaryLoader.detectChanges();

        loaderService.hideLoader("my-loader");
        fixtureSecondaryLoader.detectChanges();

        const preloaderEl = fixtureSecondaryLoader.nativeElement.querySelector('div.preloader.secondary');
        expect(preloaderEl).toBeFalsy();
    }));

})