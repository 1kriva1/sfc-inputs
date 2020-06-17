import { SelectInputComponent } from "./sfc-select-input.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { By } from '@angular/platform-browser';
import { StyleClass, CommonConstants } from '../common/constants/common-constants';
import ISelectData from '../common/interfaces/ISelectData';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../common/components/loader/base/sfc-loader.service';
import { ILoadMoreData } from '../common/interfaces/ILoadMoreData';
import ISelectPagedModel from 'src/select-input-app/select-paged.model';
import HttpUtils from '../common/utils/http-utils';


describe('Component: SelectInputComponent', () => {

    let component: SelectInputComponent;
    let fixture: ComponentFixture<SelectInputComponent>;
    let el: DebugElement;
    let debugTextInputEl: DebugElement;
    let labelEl: HTMLLabelElement;

    let loaderServiceInjectedSpy: jasmine.SpyObj<LoaderService>;
    let httpUtilsServiceInjectedSpy: jasmine.SpyObj<HttpUtils<any[]>>;

    beforeEach(async(() => {
        loaderServiceInjectedSpy = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);
        httpUtilsServiceInjectedSpy = jasmine.createSpyObj('HttpUtils', ['getDataByConfig']);

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SfcInputsModule],
            declarations: [],
            providers: [
                { provide: LoaderService, useValue: loaderServiceInjectedSpy },
                { provide: HttpUtils, useValue: httpUtilsServiceInjectedSpy }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SelectInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugTextInputEl = el.query(By.css('input.input-select'));
            labelEl = fixture.nativeElement.querySelector('label');

            fixture.detectChanges();
        });
    }));

    it("Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Label: should exist", async(() => {
        expect(labelEl).toBeTruthy();
    }));

    it("Label: 'for' attribute default value", async(() => {
        let expectedValue = "sfc-";
        expect(labelEl.htmlFor).toEqual(expectedValue);
    }));

    it("Label: 'for' attribute value", async(() => {
        let expectedValue = "sfc-test-id";
        component.id = "test-id";
        fixture.detectChanges();

        expect(labelEl.htmlFor).toEqual(expectedValue);
    }));

    it("Label: html text value default", async(() => {
        expect(labelEl.innerText).toEqual("");
    }));

    it("Label: html text value", async(() => {
        let expectedValue = "test label";
        component.label = expectedValue;
        fixture.detectChanges();

        expect(labelEl.innerText).toEqual(expectedValue);
    }));

    it("Label: CSS classes default", async(() => {
        expect(labelEl.className).toEqual("");
    }));

    it("Label: CSS classes with placeholder", async(() => {
        component._placeholder = "test placeholder";
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    }));

    it("Label: CSS classes with defined value", async(() => {
        setOptionData('2');
        expect(labelEl.className).toEqual(StyleClass.Active);
    }));

    it("Label: CSS classes with icon", async(() => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.WithIcon);
    }));

    it("Label: CSS classes when focused", async(() => {
        focusTextInput();

        expect(labelEl.classList).not.toBeNull();
        expect(labelEl.classList).not.toBeUndefined();
        expect(labelEl.classList.length).toEqual(2);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(labelEl.classList.contains("isFocus")).toBeTruthy();
    }));

    xit("Label: click event", async(() => {
        component.label = "test label";
        component._placeholder = "test placeholder";
        setOptionData(null, [{ key: 1, value: "option 1" }, { key: 2, value: "option 2" }]);

        let labelDebugEl: DebugElement = el.query(By.css('label'));
        labelDebugEl.triggerEventHandler('click', { target: labelDebugEl.nativeElement });
        fixture.detectChanges();

        let labelEl: HTMLLabelElement = fixture.nativeElement.querySelector('label');

        expect(labelEl.classList.length).toEqual(2);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(labelEl.classList.contains("isFocus")).toBeTruthy();
        expect(component.dropdownClasses).toEqual(StyleClass.Active);
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: CSS classes default", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains("fa")).toBeTruthy();
        expect(iconEl.classList.contains("fa-user")).toBeTruthy();
    });

    it("Icon: CSS classes when focuse", () => {
        component.icon = "fa fa-user";
        focusTextInput();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl.classList.length).toEqual(5);
        expect(iconEl.classList.contains("isFocus")).toBeTruthy();
    });

    xit("Icon: click event", async(() => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');
        iconEl.click();
        fixture.detectChanges();

        expect(iconEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(iconEl.classList.contains("isFocus")).toBeTruthy();
        expect(component.dropdownClasses).toEqual(StyleClass.Active);
    }));

    it("Data: check if data empty with default", async(() => {
        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toBeGreaterThan(0);
        expect(liElements.length).toEqual(1);

        expect(optionsElements.length).toBeGreaterThan(0);
        expect(optionsElements.length).toEqual(1);
    }));

    it("Data: check if data empty without default", async(() => {
        component.showDefaultOption = false;
        component.initData([]);
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(0);
        expect(optionsElements.length).toEqual(0);
    }));

    it("Data: check if data NOT empty with default option", async(() => {
        component.initData([{ key: 1, value: "test_1" }, { key: 2, value: "test_2" }]);
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(3);
        expect(optionsElements.length).toEqual(3);
    }));

    it("Data: check if data empty with custom default option", async(() => {
        let defaultOptionValue = "Choose your custom option";
        component.defaultDisplayValue = { value: defaultOptionValue, key: -2 };
        component.initData(component.data);
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toBeGreaterThan(0);
        expect(liElements.length).toEqual(1);
        expect(liElements[0].nativeElement.innerText).toEqual(defaultOptionValue);

        expect(optionsElements.length).toBeGreaterThan(0);
        expect(optionsElements.length).toEqual(1);
        expect(optionsElements[0].nativeElement.innerText).toEqual(defaultOptionValue);
    }));

    it("Data: with observable and loadOnInit = TRUE", async(() => {
        component.showDefaultOption = false;
        component.isLoadOnInit = true;
        component.data = mockObservable();
        component.ngAfterViewInit();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with observable and loadOnInit = FALSE", async(() => {
        component.showDefaultOption = false;
        component.data = mockObservable();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(0);
        expect(optionsElements.length).toEqual(0);
        expect(loaderServiceInjectedSpy.showLoader).not.toHaveBeenCalled();
        expect(loaderServiceInjectedSpy.hideLoader).not.toHaveBeenCalled();
    }));

    it("Data: with observable and loadOnInit = FALSE. Open dropdown.", async(() => {
        component.showDefaultOption = false;
        component.data = mockObservable();

        let selectWrapperDebugEl: DebugElement = el.query(By.css('.select-wrapper'));
        selectWrapperDebugEl.triggerEventHandler('click', { target: selectWrapperDebugEl.nativeElement });
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with observable and loadOnInit = FALSE with defined value.", async(() => {
        component.showDefaultOption = false;
        component.writeValue('2');
        component.data = mockObservable();
        component.ngAfterViewInit();   

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with pageable(infinity scroll) observable and loadOnInit = TRUE", async(() => {
        component.showDefaultOption = false;
        component.isLoadOnInit = true;
        component.loader = mockLoader(false);
        component.ngAfterViewInit();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with pageable(infinity scroll) observable and loadOnInit = FALSE", async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        component.showDefaultOption = false;
        component.loader = mockLoader(false);
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(0);
        expect(optionsElements.length).toEqual(0);
        expect(loaderServiceInjectedSpy.showLoader).not.toHaveBeenCalled();
        expect(loaderServiceInjectedSpy.hideLoader).not.toHaveBeenCalled();
        expect(component.onLoadMore).toHaveBeenCalledTimes(0);
        expect(component.updateData).toHaveBeenCalledTimes(0);
    }));

    it("Data: with pageable(infinity scroll) observable and loadOnInit = FALSE. Open dropdown.", async(() => {
        component.showDefaultOption = false;
        component.loader = mockLoader(false);

        let selectWrapperDebugEl: DebugElement = el.query(By.css('.select-wrapper'));
        selectWrapperDebugEl.triggerEventHandler('click', { target: selectWrapperDebugEl.nativeElement });
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with pageable(infinity scroll) observable and loadOnInit = FALSE with defined value", async(() => {
        component.showDefaultOption = false;
        component.writeValue('2');
        component.loader = mockLoader(false);
        component.ngAfterViewInit();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with pageable(infinity scroll) observable. Load more than one time.", async(() => {
        component.showDefaultOption = false;
        component.isLoadOnInit = true;
        component.loader = mockLoader(true, 8);
        component.ngAfterViewInit();

        focusTextInput();
        scroll();

        fixture.detectChanges();        

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(16);
        expect(optionsElements.length).toEqual(16);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(2);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(2);
    }));

    it("Data: with pageable(infinity scroll) observable. Try to load more, but data is full.", async(() => {
        component.showDefaultOption = false;
        component.isLoadOnInit = true;
        component.loader = mockLoader(false, 8);
        component.ngAfterViewInit();

        focusTextInput();
        scroll();

        fixture.detectChanges();        

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(8);
        expect(optionsElements.length).toEqual(8);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with pageable(show more button) observable and loadOnInit = TRUE", async(() => {
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.isLoadOnInit = true;
        component.loader = mockLoader(false);
        component.ngAfterViewInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));
        const moreButtonEl = el.query(By.css('load-more-button'));

        expect(moreButtonEl).toBeTruthy();
        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with pageable(show more button) observable and loadOnInit = FALSE", async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.loader = mockLoader(false);
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));
        const moreButtonEl = el.query(By.css('load-more-button'));

        expect(moreButtonEl).toBeTruthy();
        expect(liElements.length).toEqual(0);
        expect(optionsElements.length).toEqual(0);
        expect(loaderServiceInjectedSpy.showLoader).not.toHaveBeenCalled();
        expect(loaderServiceInjectedSpy.hideLoader).not.toHaveBeenCalled();
        expect(component.onLoadMore).toHaveBeenCalledTimes(0);
        expect(component.updateData).toHaveBeenCalledTimes(0);
    }));

    it("Data: with pageable(show more button) observable and loadOnInit = FALSE. Click show more button.", async(() => {
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.loader = mockLoader(false);
        fixture.detectChanges();

        const moreButtonEl = el.query(By.css('load-more-button'));
        moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with pageable(show more button) observable and loadOnInit = FALSE and defined value", async(() => {
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.writeValue('2');
        component.loader = mockLoader(false);
        component.ngAfterViewInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));
        const moreButtonEl = el.query(By.css('load-more-button'));

        expect(moreButtonEl).toBeTruthy();
        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with pageable(show more button) observable. Load more than one time.", async(() => {
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.isLoadOnInit = true;
        component.loader = mockLoader(true, 8);
        component.ngAfterViewInit();

        const moreButtonEl = el.query(By.css('load-more-button'));
        moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();       

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(moreButtonEl).toBeTruthy();
        expect(liElements.length).toEqual(16);
        expect(optionsElements.length).toEqual(16);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(2);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(2);
    }));

    it("Data: with pageable(show more button) observable. Try to load more, but data is full.", async(() => {
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.isLoadOnInit = true;
        component.loader = mockLoader(false, 8);
        component.ngAfterViewInit();

        const moreButtonEl = el.query(By.css('load-more-button'));
        moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();       

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(moreButtonEl).toBeTruthy();
        expect(liElements.length).toEqual(8);
        expect(optionsElements.length).toEqual(8);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Data: with http config (infinity scroll) and loadOnInit = TRUE", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockObservable());
        component.showDefaultOption = false;
        component.isLoadOnInit = true;
        component.httpConfig = mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
        expect(httpUtilsServiceInjectedSpy.getDataByConfig).toHaveBeenCalledTimes(1);
    }));

    it("Data: with http config (infinity scroll) and loadOnInit = FALSE", async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockObservable());
        component.showDefaultOption = false;
        component.httpConfig = mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(0);
        expect(optionsElements.length).toEqual(0);
        expect(loaderServiceInjectedSpy.showLoader).not.toHaveBeenCalled();
        expect(loaderServiceInjectedSpy.hideLoader).not.toHaveBeenCalled();
        expect(component.onLoadMore).toHaveBeenCalledTimes(0);
        expect(component.updateData).toHaveBeenCalledTimes(0);
    }));

    it("Data: with http config (infinity scroll) and loadOnInit = FALSE. Open dropdown.", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockObservable());
        component.showDefaultOption = false;
        component.httpConfig = mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        let selectWrapperDebugEl: DebugElement = el.query(By.css('.select-wrapper'));
        selectWrapperDebugEl.triggerEventHandler('click', { target: selectWrapperDebugEl.nativeElement });
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
        expect(httpUtilsServiceInjectedSpy.getDataByConfig).toHaveBeenCalledTimes(1);
    }));

    it("Data: with http config (infinity scroll) and loadOnInit = FALSE with defined value.", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockObservable());
        component.showDefaultOption = false;
        component.writeValue('2');
        component.httpConfig = mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
        expect(httpUtilsServiceInjectedSpy.getDataByConfig).toHaveBeenCalledTimes(1);
    }));

    it("Data: with http config (infinity scroll) observable. Load more than one time.", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockLoader(true, 8)());
        component.showDefaultOption = false;
        component.isLoadOnInit = true;
        component.httpConfig = mockLoadMoreConfig();
        component.ngOnInit();

        focusTextInput();
        scroll();
        fixture.detectChanges();        

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(16);
        expect(optionsElements.length).toEqual(16);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(2);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(2);
    }));

    it("Data: with http config (infinity scroll) observable. Try to load more, but data is full.", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockLoader(false, 8)());
        component.showDefaultOption = false;
        component.isLoadOnInit = true;
        component.httpConfig = mockLoadMoreConfig();
        component.ngOnInit();

        focusTextInput();
        scroll();
        fixture.detectChanges();        

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(8);
        expect(optionsElements.length).toEqual(8);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    xit("Data: with http config (load more button) and loadOnInit = TRUE", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockObservable());
        component.showDefaultOption = false;
        component.isLoadOnInit = true;
        component.loadMoreButton = true;
        component.httpConfig = mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
        expect(httpUtilsServiceInjectedSpy.getDataByConfig).toHaveBeenCalledTimes(1);
    }));

    it("Data: with http config (load more button) and loadOnInit = FALSE", async(() => {
        spyOn(component, 'onLoadMore');
        spyOn(component, 'updateData');
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockObservable());
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.httpConfig = mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(0);
        expect(optionsElements.length).toEqual(0);
        expect(loaderServiceInjectedSpy.showLoader).not.toHaveBeenCalled();
        expect(loaderServiceInjectedSpy.hideLoader).not.toHaveBeenCalled();
        expect(component.onLoadMore).toHaveBeenCalledTimes(0);
        expect(component.updateData).toHaveBeenCalledTimes(0);
    }));

    it("Data: with http config (load more button) and loadOnInit = FALSE. Click show more button.", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockObservable());
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.httpConfig = mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        const moreButtonEl = el.query(By.css('load-more-button'));
        moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();    

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
        expect(httpUtilsServiceInjectedSpy.getDataByConfig).toHaveBeenCalledTimes(1);
    }));

    xit("Data: with http config (load more button) and loadOnInit = FALSE with defined value.", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockObservable());
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.writeValue('2');
        component.httpConfig = mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(2);
        expect(optionsElements.length).toEqual(2);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
        expect(httpUtilsServiceInjectedSpy.getDataByConfig).toHaveBeenCalledTimes(1);
    }));

    it("Data: with http config (load more button) observable. Load more than one time.", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockLoader(true, 8)());
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.httpConfig = mockLoadMoreConfig();
        component.ngOnInit();
        fixture.detectChanges();

        const moreButtonEl = el.query(By.css('load-more-button'));
        moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();   
        
        moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(16);
        expect(optionsElements.length).toEqual(16);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(2);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(2);
    }));

    it("Data: with http config (load more button) observable. Try to load more, but data is full.", async(() => {
        httpUtilsServiceInjectedSpy.getDataByConfig.and.returnValue(mockLoader(false, 8)());
        component.showDefaultOption = false;
        component.loadMoreButton = true;
        component.httpConfig = mockLoadMoreConfig();
        component.ngOnInit();
        fixture.detectChanges();

        const moreButtonEl = el.query(By.css('load-more-button'));
        moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();   
        
        moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();        

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(8);
        expect(optionsElements.length).toEqual(8);
        expect(optionsElements[0].nativeElement.text).toEqual("test_1");
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it("Text Input: should create element", async(() => {
        expect(debugTextInputEl).toBeTruthy();
    }));

    it("Text Input: value not defined", async(() => {
        expect(debugTextInputEl.nativeElement.value).toEqual("");
    }));

    it("Text Input: value defined", async(() => {
        setOptionData('2');
        expect(debugTextInputEl.nativeElement.value).toEqual("option 2");
    }));

    it("Text Input: Multiple - value defined", async(() => {
        component.multiple = true;
        setOptionData(['1', '2']);

        expect(debugTextInputEl.nativeElement.value).toEqual("option 1, option 2");
    }));

    it("Text Input: OptGroup - value defined", async(() => {
        setOptOptionData({ key: 1, groupKey: 2 });

        expect(debugTextInputEl.nativeElement.value).toEqual("option 1 2");
    }));

    it("Text Input: NOT disabled", async(() => {
        expect(debugTextInputEl.nativeElement.disabled).toBeFalsy();
    }));

    it("Text Input: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.disabled).toBeTruthy();
    }));

    it("Placeholder: empty value", async(() => {
        expect(debugTextInputEl.nativeElement.placeholder).toEqual("");
    }));

    it("Placeholder: defined value", async(() => {
        let expectedPlaceholder = "test placeholder"
        component._placeholder = expectedPlaceholder;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.placeholder).toEqual(expectedPlaceholder);
    }));

    it("Ul-Dropdown container: should create element", async(() => {
        let dropdownEl = el.queryAll(By.css('div.select-dropdown-container'));
        expect(dropdownEl).toBeTruthy();
    }));

    it("Ul-Dropdown container: CSS classes default", async(() => {
        let dropdownEl = el.query(By.css('div.select-dropdown-container'));
        expect(dropdownEl.nativeElement.classList.contains(StyleClass.Active)).toBeFalsy();
    }));

    it("Ul-Dropdown container: CSS classes when focus", async(() => {
        focusTextInput();
        let dropdownEl = el.query(By.css('div.select-dropdown-container'));
        expect(dropdownEl.nativeElement.classList.contains(StyleClass.Active)).toBeTruthy();
    }));

    it("Ul-Dropdown container: CSS styles default", async(() => {
        let dropdownEl = el.query(By.css('div.select-dropdown-container'));
        expect(dropdownEl.nativeElement.style[CommonConstants.CSS_WIDTH]).toEqual("");
        expect(dropdownEl.nativeElement.style[CommonConstants.CSS_LEFT]).toEqual("");
    }));

    it("Ul-Dropdown container: CSS styles  when focus", async(() => {
        focusTextInput();
        let dropdownEl = el.query(By.css('div.select-dropdown-container'));

        expect(dropdownEl.nativeElement.style[CommonConstants.CSS_WIDTH]).not.toEqual("");
        expect(dropdownEl.nativeElement.style[CommonConstants.CSS_LEFT]).not.toEqual("");
    }));

    it("Ul-Dropdown: li - value is undefined", async(() => {
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));
        expect(liElements.length).toEqual(0);
    }));

    it("Ul-Dropdown: li - value is defined", async(() => {
        setOptionData('2');
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));

        expect(liElements.length).toEqual(1);
    }));

    it("Ul-Dropdown: Multiple - li - value is defined", async(() => {
        component.multiple = true;
        setOptionData(['1', '2']);

        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected')),
            liDisabledElements = el.queryAll(By.css('ul.select-dropdown li.disabled'));

        expect(liElements.length).toEqual(2);
        expect(liDisabledElements.length).toEqual(1);
    }));

    it("Ul-Dropdown: OptGroup - li - value is defined", async(() => {
        setOptOptionData({ key: 1, groupKey: 2 });
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));

        expect(liElements.length).toEqual(1);
    }));

    it("Ul-Dropdown: li - set option value", async(() => {
        setOptionData();

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            secondOption = liElements[2],
            selectEl = el.query(By.css('select'));
        secondOption.triggerEventHandler('mousedown', { target: secondOption.nativeElement });
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual("option 2");
        expect(selectEl.nativeElement.value).toEqual("2");
    }));

    it("Ul-Dropdown: Multiple - li - set option value", async(() => {
        component.multiple = true;
        setOptionData(['-1']);

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            firstOption = liElements[1],
            secondOption = liElements[2];

        firstOption.triggerEventHandler('mousedown', { target: firstOption.nativeElement });
        secondOption.triggerEventHandler('mousedown', { target: secondOption.nativeElement });
        fixture.detectChanges();

        let liDisabledElements = el.queryAll(By.css('ul.select-dropdown li.disabled')),
            selectEl = el.queryAll(By.css('select option')).filter(m => m.attributes["selected"] === "selected");

        expect(debugTextInputEl.nativeElement.value).toEqual("option 1, option 2");
        expect(selectEl.length).toEqual(2);
        expect(liDisabledElements.length).toEqual(1);
    }));

    it("Ul-Dropdown: OptGroup - li - set option value", async(() => {
        setOptOptionData();

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            firstOption = liElements[2];

        firstOption.triggerEventHandler('mousedown', { target: firstOption.nativeElement });
        fixture.detectChanges();

        let selectEl = el.queryAll(By.css('select option')).filter(m => m.attributes["selected"] === "selected");

        expect(debugTextInputEl.nativeElement.value).toEqual("option 1 2");
        expect(selectEl.length).toEqual(1);
    }));

    it("Ul-Dropdown: IMG - not defined", async(() => {
        let imgElements = el.queryAll(By.css('ul.select-dropdown li img'));
        expect(imgElements.length).toEqual(0);
    }));

    it("Ul-Dropdown: IMG - defined", async(() => {
        setOptionData('2', [{ key: 1, value: "option 1", imagePath: "testImg.jpg" }, { key: 2, value: "option 2" }]);

        let imgElements = el.queryAll(By.css('ul.select-dropdown li img'));
        expect(imgElements.length).toEqual(1);
        expect(imgElements[0].nativeElement.src.indexOf("testImg.jpg")).not.toEqual(-1);
    }));

    it("Ul-Dropdown: li - default  text", async(() => {
        let liSpanEl = el.queryAll(By.css('ul.select-dropdown li span span')),
            expectedValue = "Choose your option";
        expect(liSpanEl.length).toEqual(1);
        expect(liSpanEl[0].nativeElement.innerText).toEqual(expectedValue);
    }));

    it("Caret: should create element", async(() => {
        let caretEl = el.query(By.css('i.caret.fa.fa-caret-down'));
        expect(caretEl).toBeTruthy();
    }));

    it("Select: should create element", async(() => {
        let selectEl = el.query(By.css('select'));
        expect(selectEl).toBeTruthy();
    }));

    it("Select: check id value", async(() => {
        component.id = "test-id";
        fixture.detectChanges();
        let selectEl = el.query(By.css('select')),
            expectedValue = "sfc-test-id";

        expect(selectEl.nativeElement.id).toEqual(expectedValue)
    }));

    it("Select: check value", async(() => {
        setOptionData('2');
        let selectEl = el.query(By.css('select'));

        expect(selectEl.nativeElement.value).toEqual("2")
    }));

    it("Select: option attributes", async(() => {
        setOptionData();
        let optionsElements = el.queryAll(By.css('select option')),
            expectedValue = "Choose your option";

        expect(optionsElements.length).toBeGreaterThan(0);
        expect(optionsElements[0].nativeElement.value).toEqual("-1");
        expect(optionsElements[0].nativeElement.innerText).toEqual(expectedValue);
    }));

    it("Helper text: should create element", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = "test helper text";
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });


    // Private functions

    function setOptionData(value?: string | Array<string>, data?: ISelectData[]) {
        component.updateData(data || [{ key: 1, value: "option 1" }, { key: 2, value: "option 2" }]);

        if (value) {
            component.writeValue(value);
        }

        fixture.detectChanges();
    }

    function setOptOptionData(value?: any) {
        const mockData = [
            {
                key: 1,
                value: "group one",
                options: [{
                    key: 1,
                    value: "option 1 2"
                },
                {
                    key: 2,
                    value: "option 2 2"
                }]
            },
            {
                key: 2,
                value: "group two",
                options: [{
                    key: 1,
                    value: "option 1 2"
                },
                {
                    key: 2,
                    value: "option 2 2"
                }]
            }
        ]
        component.initData(mockData);

        if (value != null && value != undefined) {
            component.writeValue(value);
        }

        fixture.detectChanges();
    }

    function focusTextInput() {
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();
    }

    function mockObservable() {
        const testData: ISelectData[] = [{ key: 1, value: "test_1" }, { key: 2, value: "test_2" }];
        return Observable.of<ISelectData[]>(testData);
    }

    function mockLoader(hasNext, count:number = 2 ) {

        let data = [];

        for (let index = 1; index <= count; index++) {
            data.push({ key: index, value: "test_" + index });            
        }

        return (): Observable<any> => {
            const testData: any = { HasNext: hasNext, Items: data }
            return Observable.of<any>(testData);
        };
    }

    function mockConfig() {
        return {
            url: 'http://test',
            mapper: site => {
                return site;
            }
        };
    }

    function mockLoadMoreConfig() {
        return {
            url: 'http://test',
            mapper: resp => {
                return { Items: resp.Items.map((s: any) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            }
        };
    }

    function scroll(scrollTopPosition = null) {
        // required dispatch 2 scroll evnts because infinityscroller directive use pairwise operator
        let scrollContainer = el.query(By.css('.select-dropdown'));
        scrollContainer.nativeElement.dispatchEvent(new Event('scroll'));
        scrollToBottom(scrollTopPosition);
        scrollContainer.nativeElement.dispatchEvent(new Event('scroll'));
    }

    function scrollToBottom(scrollPercentage: number = null): void {
        let scrollContainer = el.query(By.css('.select-dropdown'));
        scrollContainer.nativeElement.scrollTop = scrollPercentage
            ? ((scrollContainer.nativeElement.scrollHeight - scrollContainer.nativeElement.offsetHeight) / 100) * scrollPercentage
            : scrollContainer.nativeElement.scrollHeight;
    }

    // END Private functions

});