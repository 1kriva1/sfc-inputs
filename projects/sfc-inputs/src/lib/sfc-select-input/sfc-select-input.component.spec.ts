import { SelectInputComponent } from './sfc-select-input.component';
import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { By } from '@angular/platform-browser';
import { StyleClass, CommonConstants } from '../common/constants/common-constants';
import ISelectData from '../common/interfaces/select-input/ISelectData';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../common/components/loader/base/sfc-loader.service';
import { ILoadMoreData } from '../common/interfaces/ILoadMoreData';
import HttpUtils from '../common/utils/http-utils';
import { HttpConfig } from '../common/utils/http-config';
import ValidationConstants from '../common/constants/validation-constants';


describe('Component: SelectInputComponent', () => {

    let component: SelectInputComponent;
    let fixture: ComponentFixture<SelectInputComponent>;
    let el: DebugElement;
    let debugTextInputEl: DebugElement;
    let labelEl: HTMLLabelElement;

    let httpUtilsServiceInjectedSpy: HttpUtils;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SfcInputsModule],
            declarations: []
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SelectInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugTextInputEl = el.query(By.css('input.sfc-input.input-text-input'));
            labelEl = fixture.nativeElement.querySelector('div.select-wrapper > label');
            httpUtilsServiceInjectedSpy = fixture.debugElement.injector.get(HttpUtils);
            fixture.detectChanges();
        });
    }));

    it('Should create component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('Icon: not created if icon value not defined', () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it('Icon: should create icon element if icon value defined', () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it('Icon: CSS classes default', () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains('fa')).toBeTruthy();
        expect(iconEl.classList.contains('fa-user')).toBeTruthy();
    });

    it('Icon: CSS classes when focus', () => {
        component.icon = 'fa fa-user';
        focusTextInput();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl.classList.length).toEqual(4);
        expect(iconEl.classList.contains(StyleClass.Active)).toBeTruthy();
    });

    it('Icon: click event', async(() => {
        spyOn(debugTextInputEl.nativeElement, 'focus');

        component.icon = 'fa fa-user';
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');
        iconEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.focus).toHaveBeenCalled();
    }));

    it('Icon: click event (focus manualy)', async(() => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');
        focusTextInput();

        let dropdownStyles = getComputedStyle(el.query(By.css('ul.select-dropdown')).nativeElement);
        expect(iconEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(dropdownStyles.display).toEqual('block');
        expect(dropdownStyles.opacity).toEqual('1');
    }));

    it('Text Input: should create element', async(() => {
        expect(debugTextInputEl).toBeTruthy();
    }));

    it("Text Input: default type value", () => {
        expect(debugTextInputEl.nativeElement.type).toEqual('text');
    });

    it('Text Input: value not defined', async(() => {
        expect(debugTextInputEl.nativeElement.value).toEqual('');
    }));

    it('Text Input: value defined', async(() => {
        setValue(2);
        setStaticData();

        expect(debugTextInputEl.nativeElement.value).toEqual('option 2');
    }));

    it('Text Input: Multiple - value defined', async(() => {
        component.multiple = true;
        setValue([1, 2]);
        setStaticData();

        expect(debugTextInputEl.nativeElement.value).toEqual('option 1, option 2');
    }));

    it('Text Input: OptGroup - value defined', async(() => {
        setValue({ key: 1, groupKey: 2 });
        setOptGroupStaticData();

        expect(debugTextInputEl.nativeElement.value).toEqual('option 1 2');
    }));

    it('Text Input: NOT disabled', async(() => {
        expect(debugTextInputEl.nativeElement.disabled).toBeFalsy();
    }));

    it('Text Input: disabled', async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.disabled).toBeTruthy();
    }));

    it('Text Input: focus', async(() => {
        spyOn<any>(component, 'openDropdown').and.callThrough();
        setOptGroupStaticData();
        focusTextInput();

        expect(component['openDropdown']).toHaveBeenCalledTimes(1);
    }));

    it('Text Input: readonly always', async(() => {
        expect(debugTextInputEl.nativeElement.getAttribute('readonly')).toBeTruthy();
    }));

    it('Placeholder: empty value', async(() => {
        expect(debugTextInputEl.nativeElement.placeholder).toEqual('');
    }));

    it('Placeholder: defined value', async(() => {
        const expectedPlaceholder = 'test placeholder'
        component._placeholder = expectedPlaceholder;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.placeholder).toEqual(expectedPlaceholder);
    }));

    it("Placeholder: component focused", () => {
        const placeholderAssertValue = 'test placeholder';
        component._placeholder = placeholderAssertValue;
        fixture.detectChanges();

        focusTextInput();

        expect(debugTextInputEl.nativeElement.placeholder).toEqual('');
    });

    it('Label: should exist', async(() => {
        expect(labelEl).toBeTruthy();
    }));

    it('Label: "for" attribute default value', async(() => {
        const expectedValue = 'sfc-';
        expect(labelEl.htmlFor).toEqual(expectedValue);
    }));

    it('Label: "for" attribute value', async(() => {
        const expectedValue = 'sfc-test-id';
        component.id = 'test-id';
        fixture.detectChanges();

        expect(labelEl.htmlFor).toEqual(expectedValue);
    }));

    it('Label: html text value default', async(() => {
        expect(labelEl.innerText).toEqual('');
    }));

    it('Label: html text value', async(() => {
        const expectedValue = 'test label';
        component.label = expectedValue;
        fixture.detectChanges();

        expect(labelEl.innerText).toEqual(expectedValue);
    }));

    it('Label: CSS classes default', async(() => {
        expect(labelEl.className).toEqual('');
    }));

    it('Label: CSS classes with placeholder', async(() => {
        component._placeholder = 'test placeholder';
        fixture.detectChanges();

        expect(labelEl.className).toEqual(StyleClass.Active);
    }));

    it('Label: CSS classes with defined value', async(() => {
        setValue(2);
        expect(labelEl.className).toEqual(StyleClass.Active);
    }));

    it('Label: CSS classes when focused', async(() => {
        focusTextInput();

        expect(labelEl.classList).not.toBeNull();
        expect(labelEl.classList).not.toBeUndefined();
        expect(labelEl.classList.length).toEqual(1);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
    }));

    it('Label: click event', async(() => {
        spyOn(debugTextInputEl.nativeElement, 'focus');
        component._placeholder = 'test placeholder';
        component.label = 'test label';
        fixture.detectChanges();

        labelEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.focus).toHaveBeenCalled();
    }));

    it('Label: click event (focus manualy)', async(() => {
        component._placeholder = 'test placeholder';
        component.label = 'test label';
        fixture.detectChanges();

        focusTextInput();

        let dropdownStyles = getComputedStyle(el.query(By.css('ul.select-dropdown')).nativeElement);
        expect(labelEl.classList.length).toEqual(1);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
        expect(dropdownStyles.display).toEqual('block');
        expect(dropdownStyles.opacity).toEqual('1');
    }));

    it('Helper text: should create element', () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it('Helper text: inner text value', () => {
        const helperTextAssertValue = 'test helper text';
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    it('Load more dropdown: default class', async(() => {
        expect(el.query(By.css('load-more-dropdown.uppon'))).toBeTruthy();
    }));

    it('Load more dropdown: scrollToSelected function not called without defined value', async(() => {
        spyOn<any>(component, 'scrollToSelected').and.callThrough();
        setStaticData();
        focusTextInput();

        expect(component['scrollToSelected']).not.toHaveBeenCalled();
    }));

    it('Load more dropdown: scrollToSelected function was called when value defined', async(() => {
        spyOn<any>(component, 'scrollToSelected').and.callThrough();
        setStaticData();
        setValue(2);
        focusTextInput();

        expect(component['scrollToSelected']).toHaveBeenCalled();
    }));

    it('Load more dropdown: scrollToSelected function was called only once after was executed', async(() => {
        spyOn<any>(component, 'scrollToSelected').and.callThrough();
        setValue(2);
        setStaticData();
        focusTextInput();        

        expect(component['scrollToSelected']).toHaveBeenCalledTimes(1);

        selectItem(1);
        focusTextInput();

        expect(component['scrollToSelected']).toHaveBeenCalledTimes(1);
    }));

    it('Load more dropdown: load data only when load-on-init is true', async(() => {
        setStaticData();

        expectItems(1);
    }));

    it('Load more dropdown: data only loaded when open dropdown', async(() => {
        setStaticData();
        expectItems(1);
        focusTextInput();

        expectItems(3);
    }));

    it('Load more dropdown: data loaded on init', async(() => {
        component.isLoadOnInit = true;
        setStaticData();

        expectItems(3);
    }));

    it('Load more dropdown: data loaded on init when value defined', async(() => {
        setValue(2);
        setStaticData();

        expectItems(3);
    }));

    it('Load more dropdown: data loaded on init when multiple value defined', async(() => {
        component.multiple = true;
        setValue([1, 2]);
        setStaticData();

        expectItems(3);
    }));

    it('Load more dropdown: data not loaded on init when multiple value is empty array', async(() => {
        component.multiple = true;
        setValue([]);
        setStaticData();

        expectItems(1);
    }));

    it('Select items: multiple', async(() => {
        component.multiple = true;
        setStaticData();
        focusTextInput();

        expectItems(3);
    }));

    it('Select items: opt group', async(() => {
        component.multiple = true;
        setOptGroupStaticData();
        focusTextInput();

        expectItems(7);
    }));

    it('Select items: set option value', async(() => {
        spyOn<any>(component, 'onChange').and.callThrough();
        setStaticData();
        focusTextInput();

        selectItem(2);

        expect(debugTextInputEl.nativeElement.value).toEqual('option 2');
        expect(component['onChange']).toHaveBeenCalledWith(2);
    }));

    it('Select items: Multiple - set option value', async(() => {
        spyOn<any>(component, 'onChange').and.callThrough();
        component.multiple = true;
        setStaticData();
        focusTextInput();

        selectItem(1);
        selectItem(2);

        expect(debugTextInputEl.nativeElement.value).toEqual('option 1, option 2');
        expect(component['onChange']).toHaveBeenCalledTimes(2);
        expect(component['onChange']).toHaveBeenCalledWith([1]);
        expect(component['onChange']).toHaveBeenCalledWith([1, 2]);
    }));

    it('Select items: OptGroup - set option value', async(() => {
        spyOn<any>(component, 'onChange').and.callThrough();
        setOptGroupStaticData();
        focusTextInput();

        selectItem(2);

        expect(debugTextInputEl.nativeElement.value).toEqual('option 1 2');
        expect(component['onChange']).toHaveBeenCalledWith({ key: 1, groupKey: 1 });
    }));

    it('Select items: with default item', async(() => {
        setStaticData(0);
        focusTextInput();

        expectItems(1);
    }));

    it('Select items: without default item', async(() => {
        component.showDefaultOption = false;
        setStaticData(0);
        focusTextInput();

        expectItems(0);
    }));

    it('Select items: default item display value', async(() => {
        setStaticData(0);
        focusTextInput();
        selectItem(0);

        expect(debugTextInputEl.nativeElement.value).toEqual(CommonConstants.SELECT_INPUT.DEFAULT_OPTION_VALUE);
    }));

    it('Select items: default item value', async(() => {
        spyOn<any>(component, 'onChange').and.callThrough();
        setStaticData(0);
        focusTextInput();
        selectItem(0);

        expect(component['onChange']).toHaveBeenCalledWith(-1);
    }));

    it('Select items: with custom default item', async(() => {
        spyOn<any>(component, 'onChange').and.callThrough();
        component.defaultDisplayValue = { key: 100, value: 'custom default' }
        setStaticData(0);
        focusTextInput();
        selectItem(0);

        expectItems(1);
        expect(component['onChange']).toHaveBeenCalledWith(100);
        expect(debugTextInputEl.nativeElement.value).toEqual('custom default');
    }));

    it('Caret: should create element', async(() => {
        expect(el.query(By.css('i.caret.fa.fa-caret-down'))).toBeTruthy();
    }));

    it('Data: check when data empty with default', async(() => {
        spyDataHandlers();
        focusTextInput();

        expectItems(1);
        expect(component['handleSuccess']).not.toHaveBeenCalled();
    }));

    it('Data: check if data empty without default', async(() => {
        spyDataHandlers();
        component.showDefaultOption = false;
        component.ngOnInit();
        focusTextInput();

        expectItems(0);
        expect(component['handleSuccess']).not.toHaveBeenCalled();
    }));

    it('Data: check if data NOT empty with default option', async(() => {
        spyDataHandlers();
        setStaticData();
        focusTextInput();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data: error while fetch data', fakeAsync(() => {
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        spyOn<any>(component, 'handleError').and.callThrough();
        spyOn<any>(component, 'toggleInnerErrors').and.callThrough();
        component.data = Observable.create(observer => observer.error());
        fixture.detectChanges();

        focusTextInput();

        expect(component['handleSuccess']).not.toHaveBeenCalled();
        expect(component['handleError']).toHaveBeenCalledTimes(1);
        expect(component['toggleInnerErrors']).toHaveBeenCalledWith(CommonConstants.DATA_VALIDATOR_KEY, true);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DATA_VALIDATION["sfc-data"]);
    }));

    it('Data (static): loadOnInit = true', async(() => {
        spyDataHandlers();
        component.isLoadOnInit = true;
        setStaticData();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (static): loadOnInit = false', async(() => {
        spyDataHandlers();
        setStaticData();

        expectItems(1);
        expect(component['handleSuccess']).not.toHaveBeenCalled();
    }));

    it('Data (static): loadOnInit = false and than open dropdown', async(() => {
        spyDataHandlers();
        setStaticData();
        focusTextInput();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (static): loadOnInit = false with defined value', async(() => {
        spyDataHandlers();
        setValue(2);
        setStaticData();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (observable): loadOnInit = true', async(() => {
        spyDataHandlers();
        component.isLoadOnInit = true;
        setObservableData();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (observable): loadOnInit = false', async(() => {
        spyDataHandlers();
        setObservableData();

        expectItems(1);
        expect(component['handleSuccess']).not.toHaveBeenCalled();
    }));

    it('Data (observable): loadOnInit = false and than open dropdown', async(() => {
        spyDataHandlers();
        setObservableData();
        focusTextInput();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (observable): loadOnInit = false with defined value', async(() => {
        spyDataHandlers();
        setValue(2);
        setObservableData();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (loader): loadOnInit = true', async(() => {
        spyDataHandlers();
        component.isLoadOnInit = true;
        setLoaderData();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (loader): loadOnInit = false', async(() => {
        spyDataHandlers();
        setLoaderData();

        expectItems(1);
        expect(component['handleSuccess']).not.toHaveBeenCalled();
    }));

    it('Data (loader): loadOnInit = false and than open dropdown', async(() => {
        spyDataHandlers();
        setLoaderData();
        focusTextInput();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (loader): loadOnInit = false with defined value', async(() => {
        spyDataHandlers();
        setValue(2);
        setLoaderData();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (loader - infinity scroll): load more data', async(() => {
        spyDataHandlers();
        setLoaderData(true, 8);
        focusTextInput();

        loadMoreWithInfinityScroll();

        expectItems(17);
        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);
    }));

    it('Data (loader - infinity scroll): try to load more, but data is full', async(() => {
        spyDataHandlers();
        setLoaderData(false, 8);
        focusTextInput();

        loadMoreWithInfinityScroll();

        expectItems(9);
        expectSuccessHandlerResult(1, false, 1, 8);
        expectUpdateHandlerResult(0);
    }));

    it('Data (loader - infinity scroll): scroll when scroll only to half of dropdown', fakeAsync(() => {
        spyDataHandlers();
        setLoaderData(true, 8);
        focusTextInput();

        loadMoreWithInfinityScroll(50);

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(0);

        expectItems(9);
    }));

    it('Data (loader - infinity scroll): scroll only to half of dropdown and than to the end', fakeAsync(() => {
        spyDataHandlers();
        setLoaderData(true, 8);
        focusTextInput();

        loadMoreWithInfinityScroll(50);

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(0);

        loadMoreWithInfinityScroll(100);

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);

        expectItems(17);
    }));

    it('Data (loader - infinity scroll): load more data twice', async(() => {
        spyDataHandlers();
        setLoaderData(true, 8);
        focusTextInput();

        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);

        setLoaderData(false, 1);
        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(2, false, 1, 1);

        expectItems(18);
    }));

    it('Data (loader - load more button): load more data', async(() => {
        component.loadMoreButton = true;
        spyDataHandlers();
        setLoaderData(true, 8);
        focusTextInput();

        loadMoreWithLoadMoreButton();

        expectItems(17);
        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);
    }));

    it('Data (loader - load more button): try to load more, but data is full', async(() => {
        component.loadMoreButton = true;
        spyDataHandlers();
        setLoaderData(false, 8);
        focusTextInput();

        loadMoreWithLoadMoreButton();

        expectItems(9);
        expectSuccessHandlerResult(1, false, 1, 8);
        expectUpdateHandlerResult(0);
    }));    

    it('Data (loader - load more button): load more data twice', async(() => {
        component.loadMoreButton = true;
        spyDataHandlers();
        setLoaderData(true, 8);
        focusTextInput();

        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);

        setLoaderData(false, 1);
        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(2, false, 1, 1);

        expectItems(18);
    }));

    it('Data (config): loadOnInit = true', async(() => {
        spyDataHandlers();
        component.isLoadOnInit = true;
        setConfigData();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (config): loadOnInit = false', async(() => {
        spyDataHandlers();
        setConfigData();

        expectItems(1);
        expect(component['handleSuccess']).not.toHaveBeenCalled();
    }));

    it('Data (config): loadOnInit = false and than open dropdown', async(() => {
        spyDataHandlers();
        setConfigData();
        focusTextInput();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (config): loadOnInit = false with defined value', async(() => {
        spyDataHandlers();
        setValue(2);
        setConfigData();

        expectItems(3);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (config - infinity scroll): load more data', async(() => {
        spyDataHandlers();
        setConfigData(true, 8);
        focusTextInput();

        loadMoreWithInfinityScroll();

        expectItems(17);
        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);
    }));

    it('Data (config - infinity scroll): try to load more, but data is full', async(() => {
        spyDataHandlers();
        setConfigData(false, 8);
        focusTextInput();

        loadMoreWithInfinityScroll();

        expectItems(9);
        expectSuccessHandlerResult(1, false, 1, 8);
        expectUpdateHandlerResult(0);
    }));

    it('Data (config - infinity scroll): scroll when scroll only to half of dropdown', fakeAsync(() => {
        spyDataHandlers();
        setConfigData(true, 8);
        focusTextInput();

        loadMoreWithInfinityScroll(50);

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(0);

        expectItems(9);
    }));

    it('Data (config - infinity scroll): scroll only to half of dropdown and than to the end', fakeAsync(() => {
        spyDataHandlers();
        setConfigData(true, 8);
        focusTextInput();

        loadMoreWithInfinityScroll(50);

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(0);

        loadMoreWithInfinityScroll(100);

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);

        expectItems(17);
    }));

    it('Data (config - infinity scroll): load more data twice', async(() => {
        let configSpy = spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig').and.returnValue(mockObservable(true, 8));
        spyDataHandlers();
        setConfigData(true, 8, configSpy);
        focusTextInput();

        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);

        setConfigData(false, 1, configSpy);
        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(2, false, 1, 1);

        expectItems(18);
    }));

    it('Data (config - load more button): load more data', async(() => {
        component.loadMoreButton = true;
        spyDataHandlers();
        setConfigData(true, 8);
        focusTextInput();

        loadMoreWithLoadMoreButton();

        expectItems(17);
        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);
    }));

    it('Data (config - load more button): try to load more, but data is full', async(() => {
        component.loadMoreButton = true;
        spyDataHandlers();
        setConfigData(false, 8);
        focusTextInput();

        loadMoreWithLoadMoreButton();

        expectItems(9);
        expectSuccessHandlerResult(1, false, 1, 8);
        expectUpdateHandlerResult(0);
    }));    

    it('Data (config - load more button): load more data twice', async(() => {
        let configSpy = spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig').and.returnValue(mockObservable(true, 8));
        component.loadMoreButton = true;
        spyDataHandlers();
        setConfigData(true, 8, configSpy);
        focusTextInput();

        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(1, true, 1, 8);

        setConfigData(false, 1, configSpy);
        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 8);
        expectUpdateHandlerResult(2, false, 1, 1);

        expectItems(18);
    }));

    // Private functions

    function expectItems(count: number){
        const itemsEl = el.queryAll(By.css('sfc-select-item'));
        expect(itemsEl.length).toEqual(count);
    }

    function expectSuccessHandlerResult(times: number, hasNext: boolean = false, from: number = 0, to: number = 0) {
        expect(component['handleSuccess']).toHaveBeenCalledTimes(times);
        if (times > 0) {
            expect(component['handleSuccess']).toHaveBeenCalledWith({
                HasNext: hasNext, Items: getDataByLimits(from, to)
            });
        }
    }

    function expectUpdateHandlerResult(times: number, hasNext: boolean = false, from: number = 0, to: number = 0) {
        expect(component['handleUpdate']).toHaveBeenCalledTimes(times);

        if (times > 0) {
            expect(component['handleUpdate']).toHaveBeenCalledWith({
                HasNext: hasNext, Items: getDataByLimits(from, to)
            });
        }
    }

    function spyDataHandlers() {
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        spyOn<any>(component, 'handleUpdate').and.callThrough();
    }

    function setValue(value?: any | Array<any>) {
        component.writeValue(value);
        fixture.detectChanges();
    }

    function setStaticData(count: number = 2) {
        component.data = getDataByLimits(1, count);
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();
    }

    function setObservableData(count: number = 2) {
        component.data = mockObservable(false, count);
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();
    }

    function setLoaderData(hasNext: boolean = false, count: number = 2) {
        component.loader = mockLoader(hasNext, count);
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();
    }

    function setConfigData(hasNext: boolean = false, count: number = 2, configSpy: any = null) {   
        
        if(configSpy){
            configSpy.and.returnValue(mockObservable(hasNext, count));
        }else{
            spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig').and.returnValue(mockObservable(hasNext, count));
        }

        component.httpConfig = mockConfig();
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();
    }

    function setOptGroupStaticData() {
        const mockData = [
            {
                key: 1,
                value: 'group one',
                options: [{
                    key: 1,
                    value: 'option 1 2'
                },
                {
                    key: 2,
                    value: 'option 2 2'
                }]
            },
            {
                key: 2,
                value: 'group two',
                options: [{
                    key: 1,
                    value: 'option 1 2'
                },
                {
                    key: 2,
                    value: 'option 2 2'
                }]
            }
        ]

        component.data = mockData;
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();
    }

    function mockObservable(hasNext: boolean, count: number) {
        const testData: ISelectData[] = getDataByLimits(1, count);
        return Observable.of<ILoadMoreData<ISelectData>>({ HasNext: hasNext, Items: testData });
    }

    function getDataByLimits(from: number, to: number) {
        let data = [];

        for (let index = from; index <= to; index++) {
            data.push({ key: index, value: 'option ' + index });
        }

        return data;
    }

    function mockLoader(hasNext, count: number = 2) {
        return (): Observable<any> => {
            return mockObservable(hasNext, count);
        };
    }

    function mockConfig() {
        let config = new HttpConfig<ILoadMoreData<ISelectData>>('http://test')
            .setMapper(site => {
                return { Items: site.Items.map((s: any) => { return { key: s.Id, value: s.Value } }), HasNext: site.HasNext };
            });

        return config;
    }

    function focusTextInput() {
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();
    }

    function selectItem(itemIndex: number) {
        let liElements = el.queryAll(By.css('sfc-select-item')),
            firstOption = liElements[itemIndex].children[0];

        firstOption.triggerEventHandler('mousedown', { target: firstOption.nativeElement });
        fixture.detectChanges();
    }    

    function loadMoreWithLoadMoreButton() {
        const moreButtonEl = el.query(By.css('load-more-button div.btn div'));

        if (moreButtonEl) {
            moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();
        }
    }

    function loadMoreWithInfinityScroll(scrollTopPosition = null) {
        scroll(scrollTopPosition);
        fixture.detectChanges();
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