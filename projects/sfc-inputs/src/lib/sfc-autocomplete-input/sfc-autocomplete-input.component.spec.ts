import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteInputComponent } from './sfc-autocomplete-input.component';
import { SfcInputsModule } from '../sfc-inputs.module';
import { By } from '@angular/platform-browser';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';
import IAutoCompleteData from '../common/interfaces/autocomplete-input/IAutoCompleteData';
import { ILoadMoreData } from '../common/interfaces/ILoadMoreData';
import { Observable } from 'rxjs';
import IAutoCompleteParameters from '../common/interfaces/autocomplete-input/IAutoCompleteParameters';
import IAutoCompleteValue from '../common/interfaces/autocomplete-input/IAutoCompleteValue';
import ValidationConstants from '../common/constants/validation-constants';
import { LoadMoreUtils } from '../common/utils/load-more-utils';
import { CommonUtils } from '../common/utils/common-utils';


describe('Component: AutoCompleteInputComponent', () => {

    let component: AutoCompleteInputComponent;
    let fixture: ComponentFixture<AutoCompleteInputComponent>;
    let el: DebugElement;
    let debugTextInputEl: DebugElement;
    let labelEl: HTMLLabelElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SfcInputsModule],
            declarations: []
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AutoCompleteInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            debugTextInputEl = el.query(By.css('input.sfc-input.input-text-input'));
            labelEl = fixture.nativeElement.querySelector('div.input-autocomplete-container > label');

            fixture.detectChanges();
        });
    }));

    it('Should create component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('Container: default class', async(() => {
        expect(fixture.nativeElement.querySelector('div.input-autocomplete-container')).toBeTruthy();
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

        let iconElAfetr = fixture.nativeElement.querySelector('i.icon');

        expect(iconElAfetr.classList.length).toEqual(4);
        expect(iconElAfetr.classList.contains(StyleClass.Active)).toBeTruthy();
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

    it('Icon: dropdown state when focus text input', async(() => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        let loadMoreDropdown = el.query(By.css('load-more-dropdown'));

        expect(loadMoreDropdown.classes.open).toEqual(false);

        focusTextInput();

        expect(loadMoreDropdown.classes.open).toEqual(true);
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

    it('Text Input: value defined', fakeAsync(() => {
        typeValue('auto_1');
        expect(debugTextInputEl.nativeElement.value).toEqual('auto_1');
    }));

    it('Text Input: NOT disabled', async(() => {
        expect(debugTextInputEl.nativeElement.disabled).toBeFalsy();
    }));

    it('Text Input: disabled', async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.disabled).toBeTruthy();
    }));

    it('Text Input: NOT readonly', async(() => {
        expect(debugTextInputEl.properties.readOnly).toBeFalsy();
    }));

    it('Text Input: readonly', fakeAsync(() => {
        component.data = Observable.create(observer => observer.complete());
        fixture.detectChanges();

        typeValue('a');

        expect(debugTextInputEl.properties.readOnly).toBeTruthy();
    }));

    it('Text input event: default chars-to-call', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData();

        typeValue('a');
        
        expect(debugTextInputEl.nativeElement.value).toEqual('a');
        expect(component['onChangeValue']).toHaveBeenCalledWith('a', null);
        expectItems(2);
    }));

    it('Text input event: chars-to-call less then value', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        component.charCounter = 2
        setStaticData();
        fixture.detectChanges();

        typeValue('a');

        expectItems(0);
    }));

    it('Text input event: chars-to-call more or equal then value', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        component.charCounter = 2
        setStaticData();
        fixture.detectChanges();

        typeValue('au');

        expectItems(2);
    }));

    it('Text input event: default debounce-time', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData();

        typeValue('a');

        expect(debugTextInputEl.nativeElement.value).toEqual('a');
        expect(component['onChangeValue']).toHaveBeenCalledWith('a', null);
    }));

    it('Text input event: debounce-time - time not passed', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData();

        typeValue('a', 0);

        expect(component['onChangeValue']).not.toHaveBeenCalled();

        tick(component.debounceTime);

        expect(component['onChangeValue']).toHaveBeenCalled();
    }));

    it('Text input event: debounce-time - time passed', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData();

        typeValue('a', component.debounceTime);

        expect(component['onChangeValue']).toHaveBeenCalled();
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
        setStaticData({ key: 1, displayValue: 'auto_1' });
        expect(labelEl.className).toEqual(StyleClass.Active);
    }));

    it('Label: CSS classes when focused', async(() => {
        focusTextInput();

        expect(labelEl.classList).not.toBeNull();
        expect(labelEl.classList).not.toBeUndefined();
        expect(labelEl.classList.length).toEqual(1);
        expect(labelEl.classList.contains(StyleClass.Active)).toBeTruthy();
    }));

    it('Label: active class when value key is defined', async(() => {
        setStaticData({ key: 1, displayValue: null });
        expect(labelEl.className).toEqual(StyleClass.Active);
    }));

    it('Label: active class when value displayValue is defined', async(() => {
        setStaticData({ key: null, displayValue: 'auto_1' });
        expect(labelEl.className).toEqual(StyleClass.Active);
    }));

    it('Label: active class when key and displayValue not defined', async(() => {
        setStaticData({ key: null, displayValue: null });
        expect(labelEl.className).not.toEqual(StyleClass.Active);
    }));

    it('Helper text: should create element', () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it('Helper text: should create element when text input focused but any items', () => {
        focusTextInput();

        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it('Helper text: should create element when has items, but input not focused', fakeAsync(() => {
        setStaticData();
        typeValue('a');

        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    }));

    it('Helper text: should not create element when text input focused and has items in dropdown', fakeAsync(() => {
        setStaticData();
        focusTextInput();
        typeValue('a');

        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeNull();
    }));

    it('Helper text: inner text value', () => {
        const helperTextAssertValue = 'test helper text';
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    it('Load more dropdown: when any items and text input not focused', () => {
        let dropdown = fixture.nativeElement.querySelector('load-more-dropdown');
        expect(dropdown.className).toEqual('uppon');
    });

    it('Load more dropdown: when any items but text input focused', () => {
        focusTextInput();

        let dropdown = fixture.nativeElement.querySelector('load-more-dropdown');
        expect(dropdown.className).not.toEqual('uppon');
    });

    it('Load more dropdown: when has items but text input not focused', fakeAsync(() => {
        setStaticData();
        typeValue('a');

        let dropdown = fixture.nativeElement.querySelector('load-more-dropdown');
        expect(dropdown.className).not.toEqual('uppon');
    }));

    it('Load more dropdown: when has items and text input focused', fakeAsync(() => {
        setStaticData();
        focusTextInput();
        typeValue('a');

        let dropdown = fixture.nativeElement.querySelector('load-more-dropdown');
        expect(dropdown.className).not.toEqual('uppon');
    }));

    it('Select item: do not select item element', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData(null, 1);
        typeValue('a');

        expect(debugTextInputEl.nativeElement.value).toEqual('a');
        expect(component['onChangeValue']).toHaveBeenCalledWith('a', null);
    }));

    it('Select item: select element', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData(null, 1);
        typeValue('a');

        selectItemElement(el.query(By.css('sfc-autocomplete-item li')));

        expect(debugTextInputEl.nativeElement.value).toEqual('auto_1');
        expect(component['onChangeValue']).toHaveBeenCalledWith('auto_1', 1);
    }));

    it('Select item: select element from several options', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData(null, 5);
        typeValue('a');

        selectItemElement(el.queryAll(By.css('sfc-autocomplete-item li'))[4]);

        expect(debugTextInputEl.nativeElement.value).toEqual('auto_5');
        expect(component['onChangeValue']).toHaveBeenCalledWith('auto_5', 5);
    }));

    it('Value equal: not equal typed value', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData(null, 5);
        typeValue('auto_10');

        expect(debugTextInputEl.nativeElement.value).toEqual('auto_10');
        expect(component['onChangeValue']).not.toHaveBeenCalledWith('auto_10', 10);
        expect(component['onChangeValue']).toHaveBeenCalledWith('auto_10', null);
    }));

    it('Value equal: equal typed value', fakeAsync(() => {
        spyOn<any>(component, 'onChangeValue').and.callThrough();
        setStaticData(null, 5);
        typeValue('auto_3');

        expect(debugTextInputEl.nativeElement.value).toEqual('auto_3');
        expect(component['onChangeValue']).toHaveBeenCalledWith('auto_3', 3);
    }));

    it('Data: any data value or defined loader function', fakeAsync(() => {
        spyOn<any>(component, 'handleSuccess').and.callThrough();

        typeValue('a');

        expect(component['handleSuccess']).not.toHaveBeenCalled();
    }));

    it('Data: do not type - will not load any data', fakeAsync(() => {
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        expect(component['handleSuccess']).not.toHaveBeenCalled();
    }));

    it('Data: error while fetch data', fakeAsync(() => {
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        spyOn<any>(component, 'handleError').and.callThrough();
        spyOn<any>(component, 'toggleInnerErrors').and.callThrough();
        component.data = Observable.create(observer => observer.error());
        fixture.detectChanges();

        typeValue('a');

        expect(component['handleSuccess']).not.toHaveBeenCalled();
        expect(component['handleError']).toHaveBeenCalledTimes(1);
        expect(component['toggleInnerErrors']).toHaveBeenCalledWith(CommonConstants.DATA_VALIDATOR_KEY, true);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DATA_VALIDATION["sfc-data"]);
    }));

    it('Data (static): not empty data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        setStaticData();

        typeValue('a');

        expect(component['handleSuccess']).toHaveBeenCalled();
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): not found items by value', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        setStaticData();

        typeValue('not_found');
        
        expectSuccessHandlerResult(1, false, 0, -1);
        expectItems(0);
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): found item by value', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        setStaticData();

        typeValue('auto_1');

        expectSuccessHandlerResult(1, false, 1, 1);
        expectItems(1);
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): more than one page data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        setStaticData(null, 6);

        typeValue('a');

        expectSuccessHandlerResult(1, true, 1, 5);

        expectItems(5);
        expect(el.query(By.css('load-more-button'))).toBeDefined();
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by load more button', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyDataHandlers();
        setStaticData(null, 6);

        typeValue('a');

        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, false, 6, 6);

        expectItems(6);
        expect(el.query(By.css('load-more-button'))).toBeNull();
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by load more button when no more data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyDataHandlers();
        setStaticData(null, 5);

        typeValue('a');

        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, false, 1, 5);
        expectUpdateHandlerResult(0);

        expectItems(5);
        expect(el.query(By.css('load-more-button'))).toBeNull();
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by load more button twice', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyDataHandlers();
        setStaticData(null, 11);

        typeValue('a');

        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, true, 6, 10);

        loadMoreWithLoadMoreButton();

        expectUpdateHandlerResult(2, false, 11, 11);

        expectItems(11);
        expect(el.query(By.css('load-more-button'))).toBeNull();
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by load more button once when has more data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyDataHandlers();
        setStaticData(null, 11);

        typeValue('a');

        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, true, 6, 10);

        expectItems(10);
        expect(el.query(By.css('load-more-button'))).toBeDefined();
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by infitity scroll', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setStaticData(null, 6);

        typeValue('a');

        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, false, 6, 6);

        expectItems(6);
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by infitity scroll when no more data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setStaticData(null, 5);

        typeValue('a');

        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, false, 1, 5);
        expectUpdateHandlerResult(0);

        expectItems(5);
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by infitity scroll when scroll only to half of dropdown', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setStaticData(null, 6);

        typeValue('a');

        loadMoreWithInfinityScroll(50);

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(0);

        expectItems(5);
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by infitity scroll twice', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setStaticData(null, 11);

        typeValue('a');

        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, true, 6, 10);

        loadMoreWithInfinityScroll();

        expectUpdateHandlerResult(2, false, 11, 11);

        expectItems(11);
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (static): load more data by infitity scroll once when has more data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();
        setStaticData(null, 11);

        typeValue('a');
        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, true, 6, 10);

        expectItems(10);
        expectDataSource(spyStaticDataLoadFunction);
    }));

    it('Data (load function): not empty data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        setLoaderData();

        typeValue('a');

        expectDataSource(spyStaticDataLoadFunction, false);
        expect(component['handleSuccess']).toHaveBeenCalled();
    }));

    it('Data (load function): not found items by value', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        setLoaderData(null, false, 0);

        typeValue('not_found');
        
        expectSuccessHandlerResult(1, false, 0, -1);
        expectItems(0);
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): found item by value', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        setLoaderData(null, false, 1);

        typeValue('auto_1');

        expectSuccessHandlerResult(1, false, 1, 1);
        expectItems(1);
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): more than one page data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        setLoaderData(null, true, 5);

        typeValue('a');

        expectSuccessHandlerResult(1, true, 1, 5);

        expectItems(5);
        expect(el.query(By.css('load-more-button'))).toBeDefined();
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): load more data by load more button', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyDataHandlers();
        setLoaderData(null, true, 3);

        typeValue('a');

        setLoaderData(null, false, 3);
        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 3);
        expectUpdateHandlerResult(1, false, 1, 3);

        expectItems(6);
        expect(el.query(By.css('load-more-button'))).toBeNull();
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): load more data by load more button when no more data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyDataHandlers();
        setLoaderData(null, false, 5);

        typeValue('a');

        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, false, 1, 5);
        expectUpdateHandlerResult(0);

        expectItems(5);
        expect(el.query(By.css('load-more-button'))).toBeNull();
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): load more data by load more button twice', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        spyDataHandlers();
        setLoaderData(null, true, 3);

        typeValue('a');

        loadMoreWithLoadMoreButton();

        expectSuccessHandlerResult(1, true, 1, 3);
        expectUpdateHandlerResult(1, true, 1, 3);

        setLoaderData(null, false, 3);
        loadMoreWithLoadMoreButton();

        expectUpdateHandlerResult(2, false, 1, 3);

        expectItems(9);
        expect(el.query(By.css('load-more-button'))).toBeNull();
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): load more data by infitity scroll', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setLoaderData(null, true, 5);

        typeValue('a');

        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, true, 1, 5);

        expectItems(10);
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): load more data by infitity scroll when no more data', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setLoaderData(null, false, 5);

        typeValue('a');

        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, false, 1, 5);
        expectUpdateHandlerResult(0);

        expectItems(5);
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): load more data by infitity scroll when scroll only to half of dropdown', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setLoaderData(null, true, 5);

        typeValue('a');

        loadMoreWithInfinityScroll(50);

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(0);

        expectItems(5);
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): load more data by infitity scroll when scroll only to half of dropdown and than to the end', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setLoaderData(null, true, 5);

        typeValue('a');

        loadMoreWithInfinityScroll(50);

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(0);

        loadMoreWithInfinityScroll(100);

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, true, 1, 5);
        expectItems(10);
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    it('Data (load function): load more data by infitity scroll twice', fakeAsync(() => {
        let spyStaticDataLoadFunction = spyOn(LoadMoreUtils, 'getStaticDataLoadFunction').and.callThrough();
        component.loadMoreButton = false;
        spyDataHandlers();

        setLoaderData(null, true, 5);

        typeValue('a');

        loadMoreWithInfinityScroll();

        expectSuccessHandlerResult(1, true, 1, 5);
        expectUpdateHandlerResult(1, true, 1, 5);

        setLoaderData(null, false, 1);
        loadMoreWithInfinityScroll();

        expectUpdateHandlerResult(2, false, 1, 1);

        expectItems(11);
        expectDataSource(spyStaticDataLoadFunction, false);
    }));

    function expectItems(count: number){
        const itemsEl = el.queryAll(By.css('sfc-autocomplete-item'));
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

    function expectDataSource(spyStaticDataLoadFunction, isStaticSource: boolean = true) {
        if (isStaticSource) {
            expect(spyStaticDataLoadFunction).toHaveBeenCalled();
            expect(spyStaticDataLoadFunction).toHaveBeenCalledTimes(1);
        } else {
            expect(spyStaticDataLoadFunction).not.toHaveBeenCalled();
        }
    }

    function spyDataHandlers() {
        spyOn<any>(component, 'handleSuccess').and.callThrough();
        spyOn<any>(component, 'handleUpdate').and.callThrough();
    }

    function setLoaderData(value?: IAutoCompleteValue, hasNext: boolean = false, count: number = 2) {
        component.loader = mockLoader(hasNext, count);
        component.ngOnInit();

        if (value) {
            component.writeValue(value);
        }

        fixture.detectChanges();
    }

    function setStaticData(value?: IAutoCompleteValue, count: number = 2) {
        component.data = getDataByLimits(1, count);
        component.ngOnInit();

        if (value) {
            component.writeValue(value);
        }

        fixture.detectChanges();
    }

    function getDataByLimits(from: number, to: number) {
        let data = [];

        for (let index = from; index <= to; index++) {
            data.push({ key: index, value: 'auto_' + index });
        }

        return data;
    }

    function mockLoader(hasNext, count: number = 2) {
        let data = [];

        for (let index = 1; index <= count; index++) {
            data.push({ key: index, value: 'auto_' + index });
        }

        return (parameters: IAutoCompleteParameters): Observable<ILoadMoreData<IAutoCompleteData>> => {
            const testData: any = { HasNext: hasNext, Items: data }
            return Observable.of<ILoadMoreData<IAutoCompleteData>>(testData);
        };
    }

    function focusTextInput() {
        debugTextInputEl.triggerEventHandler('focus', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();
    }

    function selectItemElement(itemEl: DebugElement) {
        itemEl.triggerEventHandler('mousedown', { target: itemEl.nativeElement });
        fixture.detectChanges();
    }

    function typeValue(value: string, debounceTime = component.debounceTime) {
        focusTextInput();
        debugTextInputEl.nativeElement.value = value;
        debugTextInputEl.nativeElement.dispatchEvent(new Event('input'));
        tick(debounceTime);
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
});