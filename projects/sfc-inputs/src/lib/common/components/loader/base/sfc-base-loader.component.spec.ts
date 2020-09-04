import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcInputsModule } from 'projects/sfc-inputs/src/lib/sfc-inputs.module';
import { CircleLoaderComponent } from '../circle/sfc-circle-loader.component';
import { ComponentSizeType, CommonConstants } from '../../../constants/common-constants';
import { LoaderService } from './sfc-loader.service';
import { UIUtils } from '../../../utils/ui-utils';

describe('Component: Loader', () => {

    let component: CircleLoaderComponent;
    let fixture: ComponentFixture<CircleLoaderComponent>;
    let el: DebugElement;
    const loaderService = new LoaderService();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: [],
            providers: [{ provide: LoaderService, useValue: loaderService }]
        }).compileComponents();
    }));

    it("LoaderComponent: Should create component", async(() => {
        initLoaderTest();
        expect(component).toBeTruthy();
    }));

    it("Preloader: should not exist", async(() => {
        initLoaderTest();
        component.id = 'my-loader-3';
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.secondary.my-loader-3');
        expect(preloaderEl).toBeFalsy();
    }));

    it("Preloader: should exist", async(() => {
        initLoaderTest();
        registerAndShow();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Preloader: global id", async(() => {
        initLoaderTest();
        registerAndShow();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.global');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Preloader: secondary id", async(() => {
        initLoaderTest();
        component.id = 'my-loader';
        registerAndShow(component.id);
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.secondary');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Preloader: background by default", async(() => {
        initLoaderTest();
        registerAndShow();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.background');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Preloader: without background", async(() => {
        initLoaderTest();
        component.background = false;
        registerAndShow();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.background');
        expect(preloaderEl).toBeFalsy();
    }));

    it("Preloader: start = True", async(() => {
        initLoaderTest();
        component.id = 'my-loader-2';
        component.start = true;
        component.ngOnInit();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.secondary');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Loader: loading class", async(() => {
        initLoaderTest();
        registerAndShow();
        fixture.detectChanges();

        expect(fixture.nativeElement.classList.contains('loading')).toBeTruthy();
    }));

    it("Loader: size - default value", async(() => {
        initLoaderTest();
        registerAndShow();
        fixture.detectChanges();

        const loaderEl = fixture.nativeElement.querySelector('div.preloader div.medium');
        expect(loaderEl).toBeTruthy();
    }));

    it("Loader: size - small", async(() => {
        initLoaderTest();
        component.size = ComponentSizeType.Small;
        registerAndShow();
        fixture.detectChanges();

        const loaderEl = fixture.nativeElement.querySelector('div.preloader div.small');
        expect(loaderEl).toBeTruthy();
    }));

    it("Loader: size - medium", async(() => {
        initLoaderTest();
        component.size = ComponentSizeType.Medium;
        registerAndShow();
        fixture.detectChanges();

        const loaderEl = fixture.nativeElement.querySelector('div.preloader div.medium');
        expect(loaderEl).toBeTruthy();
    }));

    it("Loader: size - large", async(() => {
        initLoaderTest();
        component.size = ComponentSizeType.Large;
        registerAndShow();
        fixture.detectChanges();

        const loaderEl = fixture.nativeElement.querySelector('div.preloader div.large');
        expect(loaderEl).toBeTruthy();
    }));

    it("Loader: size - custom", async(() => {
        initLoaderTest();
        component.customSize = { width: 100, height: 100 };
        component.size = ComponentSizeType.Small;
        registerAndShow();
        fixture.detectChanges();

        const loaderEl = fixture.nativeElement.querySelector('div.preloader div.small');
        expect(loaderEl).toBeFalsy();
    }));

    it("Loader: size - custom - value check", async(() => {
        initLoaderTest();
        component.customSize = { width: 100, height: 80 };
        registerAndShow();
        fixture.detectChanges();

        const loaderEl = fixture.nativeElement.querySelector('div.preloader div');
        expect(loaderEl.offsetWidth).toEqual(component.customSize.width);
        expect(loaderEl.offsetHeight).toEqual(component.customSize.height);
    }));

    it("Loader: show global loader", async(() => {
        initLoaderTest();
        registerAndShow();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.global');
        expect(preloaderEl).toBeTruthy();
        expect(document.body.classList.contains(CommonConstants.CSS_CLASS_FIXED)).toBeTruthy();

        loaderService.hideLoader();
        fixture.detectChanges();
    }));

    it("Loader: hide global loader", async(() => {
        initLoaderTest();
        registerAndShow();
        fixture.detectChanges();

        loaderService.hideLoader();
        fixture.detectChanges();

        const preloaderAfterHideEl = fixture.nativeElement.querySelector('div.preloader.global');
        expect(preloaderAfterHideEl).toBeFalsy();
        expect(document.body.classList.contains(CommonConstants.CSS_CLASS_FIXED)).toBeFalsy();
    }));

    it("Loader: show and hide global loader with scroll down", async(() => {
        initLoaderTest();
        document.body.insertAdjacentHTML('beforeend', '<div style="height: 1500px;"></div>');
        window.scrollTo(0, document.body.scrollHeight);
        let documentScrollTop = document.documentElement.scrollTop,
            documentScrollTopPx = UIUtils.getCssLikePx(-document.documentElement.scrollTop);

        registerAndShow();
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.global');
        expect(preloaderEl).toBeTruthy();
        expect(document.body.classList.contains(CommonConstants.CSS_CLASS_FIXED)).toBeTruthy();
        expect(document.body.style.top).toEqual(documentScrollTopPx);

        loaderService.hideLoader();
        fixture.detectChanges();

        const preloaderAfterHideEl = fixture.nativeElement.querySelector('div.preloader.global');
        expect(preloaderAfterHideEl).toBeNull();
        expect(document.body.classList.contains(CommonConstants.CSS_CLASS_FIXED)).toBeFalsy();
        expect(document.body.style.top).toEqual('');
        expect(document.documentElement.scrollTop).toEqual(documentScrollTop);
    }));

    it("Loader: show secondary(not global) loader", async(() => {
        initLoaderTest();

        component.id = 'my-loader';
        fixture.detectChanges();

        registerAndShow('my-loader');
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.secondary');
        expect(preloaderEl).toBeTruthy();
    }));

    it("Loader: hide secondary(not global) loader", async(() => {
        initLoaderTest();

        component.id = 'my-loader';
        registerAndShow('my-loader');
        fixture.detectChanges();

        loaderService.hideLoader('my-loader');
        fixture.detectChanges();

        const preloaderEl = fixture.nativeElement.querySelector('div.preloader.secondary');
        expect(preloaderEl).toBeFalsy();
    }));

    function initLoaderTest() {
        fixture = TestBed.createComponent(CircleLoaderComponent);
        el = fixture.debugElement;
        component = el.componentInstance;
    }

    function registerAndShow(loaderId = CommonConstants.GLOBAL_LOADER_ID) {
        loaderService.registerLoader({ id: loaderId, status: false });
        loaderService.showLoader(loaderId);
    }
})