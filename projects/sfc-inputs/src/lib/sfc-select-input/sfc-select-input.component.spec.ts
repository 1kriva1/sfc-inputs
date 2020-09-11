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


describe('Component: SelectInputComponent', () => {

    let component: SelectInputComponent;
    let fixture: ComponentFixture<SelectInputComponent>;
    let el: DebugElement;
    let debugTextInputEl: DebugElement;
    let labelEl: HTMLLabelElement;

    let loaderServiceInjectedSpy: LoaderService;
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
            loaderServiceInjectedSpy = fixture.debugElement.injector.get(LoaderService);
            httpUtilsServiceInjectedSpy = fixture.debugElement.injector.get(HttpUtils);
            fixture.detectChanges();

            spyOn(loaderServiceInjectedSpy, 'showLoader').and.callThrough();
            spyOn(loaderServiceInjectedSpy, 'hideLoader').and.callThrough();
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
        setOptionData('2');
        expect(debugTextInputEl.nativeElement.value).toEqual('option 2');
    }));

    it('Text Input: Multiple - value defined', async(() => {
        component.multiple = true;
        setOptionData(['1', '2']);

        expect(debugTextInputEl.nativeElement.value).toEqual('option 1, option 2');
    }));

    it('Text Input: OptGroup - value defined', async(() => {
        setOptGroupOptionData({ key: 1, groupKey: 2 });

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
        setOptGroupOptionData();
        focusTextInput();

        expect(component['openDropdown']).toHaveBeenCalledTimes(1);
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
        setOptionData('2');
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

    it('Ul-Dropdown container: should create element', async(() => {
        let dropdownEl = el.queryAll(By.css('div.select-dropdown-container'));
        expect(dropdownEl).toBeTruthy();
    }));

    it('Ul-Dropdown: li - multiple', async(() => {
        component.multiple = true;
        setOptionData();

        let liElements = el.queryAll(By.css('ul.select-dropdown li div.multiple')),
            liDisabledElements = el.queryAll(By.css('ul.select-dropdown li.disabled'));

        expect(liElements.length).toEqual(3);
        expect(liDisabledElements.length).toEqual(0);
    }));

    it('Ul-Dropdown: li - opt group', async(() => {
        component.multiple = true;
        setOptGroupOptionData();

        let liOptGroupOptionsElements = el.queryAll(By.css('ul.select-dropdown li.optgroup-option')),
            liOptGroupElements = el.queryAll(By.css('ul.select-dropdown li.optgroup'));

        expect(liOptGroupOptionsElements.length).toEqual(4);
        expect(liOptGroupElements.length).toEqual(2);
    }));

    it('Ul-Dropdown: li - value is undefined', async(() => {
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));
        expect(liElements.length).toEqual(0);
    }));

    it('Ul-Dropdown: li - value is defined', async(() => {
        setOptionData('2');
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));

        expect(liElements.length).toEqual(1);
    }));

    it('Ul-Dropdown: Multiple - li - value is defined', async(() => {
        component.multiple = true;
        setOptionData(['1', '2']);

        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected')),
            liDisabledElements = el.queryAll(By.css('ul.select-dropdown li.disabled'));

        expect(liElements.length).toEqual(2);
        expect(liDisabledElements.length).toEqual(1);
    }));

    it('Ul-Dropdown: OptGroup - li - value is defined', async(() => {
        setOptGroupOptionData({ key: 1, groupKey: 2 });
        let liElements = el.queryAll(By.css('ul.select-dropdown li.selected'));

        expect(liElements.length).toEqual(1);
    }));

    it('Ul-Dropdown: li - set option value', async(() => {
        setOptionData();
        focusTextInput();

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            secondOption = liElements[2],
            selectEl = el.query(By.css('select'));
        secondOption.triggerEventHandler('mousedown', { target: secondOption.nativeElement });
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual('option 2');
        expect(selectEl.nativeElement.value).toEqual('2');
    }));

    it('Ul-Dropdown: Multiple - li - set option value', async(() => {
        component.multiple = true;
        setOptionData(['-1']);
        focusTextInput();

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            firstOption = liElements[1],
            secondOption = liElements[2];

        firstOption.triggerEventHandler('mousedown', { target: firstOption.nativeElement });
        secondOption.triggerEventHandler('mousedown', { target: secondOption.nativeElement });
        fixture.detectChanges();

        let liDisabledElements = el.queryAll(By.css('ul.select-dropdown li.disabled')),
            selectEl = el.queryAll(By.css('select option')).filter(m => m.attributes['selected'] === 'selected');

        expect(debugTextInputEl.nativeElement.value).toEqual('option 1, option 2');
        expect(selectEl.length).toEqual(2);
        expect(liDisabledElements.length).toEqual(1);
    }));

    it('Ul-Dropdown: OptGroup - li - set option value', async(() => {
        setOptGroupOptionData();
        focusTextInput();

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            firstOption = liElements[2];

        firstOption.triggerEventHandler('mousedown', { target: firstOption.nativeElement });
        fixture.detectChanges();

        let selectEl = el.queryAll(By.css('select option')).filter(m => m.attributes['selected'] === 'selected');

        expect(debugTextInputEl.nativeElement.value).toEqual('option 1 2');
        expect(selectEl.length).toEqual(1);
    }));

    it('Ul-Dropdown: li - setActiveOption function not called', async(() => {
        spyOn<any>(component, 'setActiveOption').and.callThrough();
        setOptionData();
        fixture.detectChanges();

        expect(component['setActiveOption']).not.toHaveBeenCalled();
    }));

    it('Ul-Dropdown: li - setActiveOption function was called after select option', async(() => {
        spyOn<any>(component, 'setActiveOption').and.callThrough();
        setOptionData('2');
        fixture.detectChanges();

        expect(component['setActiveOption']).toHaveBeenCalled();
    }));

    it('Ul-Dropdown: li - setSelectedScroll function not called', async(() => {
        spyOn<any>(component, 'setSelectedScroll').and.callThrough();
        setOptionData();
        fixture.detectChanges();

        expect(component['setSelectedScroll']).not.toHaveBeenCalled();
    }));

    it('Ul-Dropdown: li - setSelectedScroll function was called after select option', async(() => {
        spyOn<any>(component, 'setSelectedScroll').and.callThrough();
        setOptionData('2');
        fixture.detectChanges();

        expect(component['setSelectedScroll']).toHaveBeenCalled();
    }));

    it('Ul-Dropdown: li - setSelectedScroll function was called only once after it was executed', async(() => {
        spyOn<any>(component, 'setSelectedScroll').and.callThrough();
        setOptionData();
        focusTextInput();

        let liElements = el.queryAll(By.css('ul.select-dropdown li')),
            secondOption = liElements[2];

        secondOption.triggerEventHandler('mousedown', { target: secondOption.nativeElement });
        fixture.detectChanges();

        expect(component['setSelectedScroll']).toHaveBeenCalledTimes(1);

        debugTextInputEl.triggerEventHandler('blur', { target: debugTextInputEl.nativeElement });
        fixture.detectChanges();

        focusTextInput();
        secondOption.triggerEventHandler('mousedown', { target: secondOption.nativeElement });
        fixture.detectChanges();

        expect(component['setSelectedScroll']).toHaveBeenCalledTimes(1);
    }));

    it('Ul-Dropdown: IMG - not defined', async(() => {
        let imgElements = el.queryAll(By.css('ul.select-dropdown li img'));
        expect(imgElements.length).toEqual(0);
    }));

    it('Ul-Dropdown: IMG - defined', async(() => {
        setOptionData('2', { HasNext: true, Items: [{ key: 1, value: 'option 1', imagePath: 'testImg.jpg' }, { key: 2, value: 'option 2' }] });

        let imgElements = el.queryAll(By.css('ul.select-dropdown li img'));
        expect(imgElements.length).toEqual(1);
        expect(imgElements[0].nativeElement.src.indexOf('testImg.jpg')).not.toEqual(-1);
    }));

    it('Ul-Dropdown: li - default  text', async(() => {
        let liSpanEl = el.queryAll(By.css('ul.select-dropdown li span span')),
            expectedValue = 'Choose your option';
        expect(liSpanEl.length).toEqual(1);
        expect(liSpanEl[0].nativeElement.innerText).toEqual(expectedValue);
    }));

    it('Ul-Dropdown: infinity scroll default attributes', async(() => {
        let dropdownEl = el.query(By.css('ul.select-dropdown'));

        expect(dropdownEl).toBeTruthy();
        expect(dropdownEl.attributes['ng-reflect-infinite-scroller']).toEqual('true');
        expect(dropdownEl.attributes['ng-reflect-loader']).toBeNull();
        expect(dropdownEl.attributes['ng-reflect-immediate-callback']).toEqual('false');
        expect(dropdownEl.attributes['scrollPercent']).toEqual('100');
    }));

    it('Ul-Dropdown: infinity scroll attribute - scroll attr equals false', async(() => {
        component.loadMoreButton = true;
        fixture.detectChanges();

        let dropdownEl = el.query(By.css('ul.select-dropdown'));

        expect(dropdownEl).toBeTruthy();
        expect(dropdownEl.attributes['ng-reflect-infinite-scroller']).toEqual('false');
    }));

    it('Ul-Dropdown: infinity scroll attribute - loader attr to be defined defined', async(() => {
        component.loader = mockLoader(false);
        fixture.detectChanges();

        let dropdownEl = el.query(By.css('ul.select-dropdown'));

        expect(dropdownEl).toBeTruthy();
        expect(dropdownEl.attributes['ng-reflect-loader']).toBeDefined();
    }));

    it('Ul-Dropdown: infinity scroll attribute - immediate callback equals true', async(() => {
        component.loader = mockLoader(false);
        component.isLoadOnInit = true;
        fixture.detectChanges();

        let dropdownEl = el.query(By.css('ul.select-dropdown'));

        expect(dropdownEl).toBeTruthy();
        expect(dropdownEl.attributes['ng-reflect-immediate-callback']).toEqual('true');
    }));

    it('Bounce-loader: should create element', async(() => {
        let loader = el.query(By.css('app-bounce-loader'));
        expect(loader).toBeTruthy();
    }));

    it('Bounce-loader: default attributes', async(() => {
        const expectedId = 'test-id';
        component.id = expectedId;
        fixture.detectChanges();

        let loader = el.query(By.css('app-bounce-loader'));
        expect(loader.attributes['ng-reflect-background']).toEqual('true');
        expect(loader.attributes['ng-reflect-size']).toEqual('small');
        expect(loader.attributes['ng-reflect-id']).toEqual(expectedId);
        expect(loader.properties['hidden']).toBeTruthy();
    }));

    it('Bounce-loader: when loading', fakeAsync(() => {
        const expectedId = 'test-id';
        component.id = expectedId;
        component.onLoadMore();
        tick(0);
        fixture.detectChanges();

        let loader = el.query(By.css('app-bounce-loader'));

        expect(loader.attributes['ng-reflect-id']).toEqual(expectedId);
        expect(loader.properties['hidden']).toBeFalsy();
    }));

    it('Load-more button: should not create element', async(() => {
        let loadMoreButttonEl = el.query(By.css('load-more-button'));
        expect(loadMoreButttonEl).toBeFalsy();
    }));

    it('Load-more button: should not create element when loader is not defined', async(() => {
        component.loadMoreButton = true;
        fixture.detectChanges();

        let loadMoreButttonEl = el.query(By.css('load-more-button'));
        expect(loadMoreButttonEl).toBeFalsy();
    }));

    it('Load-more button: should not create element when loadMoreButton is false', async(() => {
        component.loader = mockLoader(false);
        component.loadMoreButton = false;
        fixture.detectChanges();

        let loadMoreButttonEl = el.query(By.css('load-more-button'));
        expect(loadMoreButttonEl).toBeFalsy();
    }));

    it('Load-more button: should create element', async(() => {
        component.loader = mockLoader(false);
        component.loadMoreButton = true;
        fixture.detectChanges();

        let loadMoreButttonEl = el.query(By.css('load-more-button'));
        expect(loadMoreButttonEl).toBeTruthy();
    }));

    it('Load-more button: default attributes', async(() => {
        component.loader = mockLoader(false);
        component.loadMoreButton = true;
        fixture.detectChanges();

        let loadMoreButttonEl = el.query(By.css('load-more-button'));
        expect(loadMoreButttonEl).toBeTruthy();
        expect(loadMoreButttonEl.attributes['ng-reflect-immediate-callback']).toEqual('false');
        expect(loadMoreButttonEl.attributes['ng-reflect-loader']).toBeDefined();
    }));

    it('Load-more button: immediate-callback attributes is true', async(() => {
        component.loader = mockLoader(false);
        component.isLoadOnInit = true;
        component.loadMoreButton = true;
        component.ngAfterViewInit();

        let loadMoreButttonEl = el.query(By.css('load-more-button'));
        expect(loadMoreButttonEl).toBeTruthy();
        expect(loadMoreButttonEl.attributes['ng-reflect-immediate-callback']).toEqual('true');
    }));

    it('Caret: should create element', async(() => {
        let caretEl = el.query(By.css('i.caret.fa.fa-caret-down'));
        expect(caretEl).toBeTruthy();
    }));

    it('Select: should create element', async(() => {
        let selectEl = el.query(By.css('select'));
        expect(selectEl).toBeTruthy();
    }));

    it('Select: check id value', async(() => {
        component.id = 'test-id';
        fixture.detectChanges();
        let selectEl = el.query(By.css('select')),
            expectedValue = 'sfc-test-id';

        expect(selectEl.nativeElement.id).toEqual(expectedValue)
    }));

    it('Select: check value', async(() => {
        setOptionData('2');
        let selectEl = el.query(By.css('select'));

        expect(selectEl.nativeElement.value).toEqual('2')
    }));

    it('Select: multiple attribute fefault', async(() => {
        setOptionData();
        let selectEl = el.query(By.css('select'));

        expect(selectEl.attributes['multiple']).toBeNull();
    }));

    it('Select: multiple attribute', async(() => {
        component.multiple = true;
        setOptionData();
        let selectEl = el.query(By.css('select'));

        expect(selectEl.attributes['multiple']).toBeDefined();
    }));

    it('Select: option attributes', async(() => {
        setOptionData();
        let optionsElements = el.queryAll(By.css('select option')),
            expectedValue = 'Choose your option';

        expect(optionsElements.length).toBeGreaterThan(0);
        expect(optionsElements[0].nativeElement.value).toEqual('-1');
        expect(optionsElements[0].nativeElement.innerText).toEqual(expectedValue);
    }));

    it('Data: check if data empty with default', async(() => {
        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(1);
        expect(optionsElements.length).toEqual(1);
    }));

    it('Data: check if data empty without default', async(() => {
        component.showDefaultOption = false;
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(0);
        expect(optionsElements.length).toEqual(0);
    }));

    it('Data: check if data NOT empty with default option', async(() => {
        component.data = [{ key: 1, value: 'test_1' }, { key: 2, value: 'test_2' }];
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(3);
        expect(optionsElements.length).toEqual(3);
    }));

    it('Data: check data with only custom default option', async(() => {
        let defaultOptionValue = 'Choose your custom option';
        component.defaultDisplayValue = { value: defaultOptionValue, key: -2 };
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(1);
        expect(liElements[0].nativeElement.innerText).toEqual(defaultOptionValue);

        expect(optionsElements.length).toEqual(1);
        expect(optionsElements[0].nativeElement.innerText).toEqual(defaultOptionValue);
    }));

    it('Data: with observable and loadOnInit = TRUE', async(() => {
        component.isLoadOnInit = true;
        component.data = mockObservable();
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(3);
        expect(optionsElements.length).toEqual(3);
        expect(optionsElements[1].nativeElement.text).toEqual('test_1');
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it('Data: with observable and loadOnInit = FALSE', async(() => {
        component.data = mockObservable();
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(1);
        expect(optionsElements.length).toEqual(1);
        expect(loaderServiceInjectedSpy.showLoader).not.toHaveBeenCalled();
        expect(loaderServiceInjectedSpy.hideLoader).not.toHaveBeenCalled();
    }));

    it('Data: with observable and loadOnInit = FALSE. Open dropdown.', async(() => {
        component.data = mockObservable();
        component.ngOnInit();
        focusTextInput();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(3);
        expect(optionsElements.length).toEqual(3);
        expect(optionsElements[1].nativeElement.text).toEqual('test_1');
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it('Data: with observable and loadOnInit = FALSE with defined value.', async(() => {
        component.data = mockObservable();
        component.writeValue('2');
        component.ngOnInit();
        fixture.detectChanges();

        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(3);
        expect(optionsElements.length).toEqual(3);
        expect(optionsElements[1].nativeElement.text).toEqual('test_1');
        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it('Data: with pageable(infinity scroll) observable and loadOnInit = TRUE', fakeAsync(() => {
        initPageableDataTest(true);

        expectPageableData(3, 1, 1);
    }));

    it('Data: with pageable(infinity scroll) observable and loadOnInit = FALSE', fakeAsync(() => {
        initPageableDataTest(false);

        expectPageableData(1, 0, 0);
    }));

    it('Data: with pageable(infinity scroll) observable and loadOnInit = FALSE. Open dropdown.', fakeAsync(() => {
        initPageableDataTest(false, null, false, true);

        expectPageableData(3, 1, 1);
    }));

    it('Data: with pageable(infinity scroll) observable and loadOnInit = FALSE with defined value', fakeAsync(() => {
        initPageableDataTest(false, '2');

        expectPageableData(3, 1, 1);
    }));

    it('Data: with pageable(infinity scroll) observable. Load more than one time.', fakeAsync(() => {
        initPageableDataTest(true, null, true, true, true, 8);

        expectPageableData(17, 2, 2);
    }));

    it('Data: with pageable(infinity scroll) observable. Try to load more, but data is full.', fakeAsync(() => {
        initPageableDataTest(true, null, false, true, true, 8);

        expectPageableData(9, 1, 1);
    }));

    it('Data: with pageable(show more button) observable and loadOnInit = TRUE', fakeAsync(() => {
        initPageableShowMoreBtnDataTest(true);

        const moreButtonEl = el.query(By.css('load-more-button'));
        expect(moreButtonEl).toBeTruthy();
        expectPageableData(3, 1, 1);
    }));

    it('Data: with pageable(show more button) observable and loadOnInit = FALSE', fakeAsync(() => {
        initPageableShowMoreBtnDataTest(false);

        const moreButtonEl = el.query(By.css('load-more-button'));
        expect(moreButtonEl).toBeTruthy();
        expectPageableData(1, 0, 0);
    }));

    it('Data: with pageable(show more button) observable and loadOnInit = FALSE. Click show more button.', fakeAsync(() => {
        initPageableShowMoreBtnDataTest(false, null, false, true);

        expectPageableData(3, 1, 1);
    }));

    it('Data: with pageable(show more button) observable and loadOnInit = FALSE and defined value', fakeAsync(() => {
        initPageableShowMoreBtnDataTest(false, '2');

        const moreButtonEl = el.query(By.css('load-more-button'));
        expect(moreButtonEl).toBeTruthy();
        expectPageableData(3, 1, 1);
    }));

    it('Data: with pageable(show more button) observable. Load more than one time.', fakeAsync(() => {
        initPageableShowMoreBtnDataTest(true, null, true, true, 8);

        expectPageableData(17, 2, 2);
    }));

    it('Data: with pageable(show more button) observable. Try to load more, but data is full.', fakeAsync(() => {
        initPageableShowMoreBtnDataTest(true, null, false, true, 8);

        const moreButtonEl = el.query(By.css('load-more-button div.btn div'));
        expect(moreButtonEl).toBeFalsy();
        expectPageableData(9, 1, 1);
    }));

    it('Data: with http config (infinity scroll) and loadOnInit = TRUE', fakeAsync(() => {
        initHttpConfigDataTest(false, true);

        expectPageableData(3, 1, 0, 1);
    }));

    it('Data: with http config (infinity scroll) and loadOnInit = FALSE', fakeAsync(() => {
        initHttpConfigDataTest(false, false);

        expectPageableData(1, 0, 0, 1);
    }));

    it('Data: with http config (infinity scroll) and loadOnInit = FALSE. Open dropdown.', fakeAsync(() => {
        initHttpConfigDataTest(false, false, null, true);

        expectPageableData(3, 1, 0, 1);
    }));

    it('Data: with http config (infinity scroll) and loadOnInit = FALSE with defined value.', fakeAsync(() => {
        initHttpConfigDataTest(false, false, '2');

        expectPageableData(3, 1, 0, 1);
    }));

    it('Data: with http config (infinity scroll) observable. Load more than one time.', fakeAsync(() => {
        initHttpConfigDataTest(false, true, null, true, true, true, true, 8);

        expectPageableData(17, 2, 2, 2);
    }));

    it('Data: with http config (infinity scroll) observable. Try to load more, but data is full.', fakeAsync(() => {
        initHttpConfigDataTest(false, true, null, true, true, true, false, 8);

        expectPageableData(9, 1, 1, 1);
    }));

    it('Data: with http config (load more button) and loadOnInit = TRUE', fakeAsync(() => {
        initHttpConfigDataTest(true, true);

        expectPageableData(3, 1, 0, 1);
    }));

    it('Data: with http config (load more button) and loadOnInit = FALSE', fakeAsync(() => {
        initHttpConfigDataTest(true, false);

        expectPageableData(1, 0, 0, 1);
    }));

    it('Data: with http config (load more button) and loadOnInit = FALSE. Click show more button.', fakeAsync(() => {
        initHttpConfigDataTest(true, false, null, true, false, true, false, 2, 1);

        const moreButtonEl = el.query(By.css('load-more-button'));
        expect(moreButtonEl).toBeTruthy();
        expectPageableData(3, 1, 1, 1);
    }));

    it('Data: with http config (load more button) and loadOnInit = FALSE with defined value.', fakeAsync(() => {
        initHttpConfigDataTest(true, false, '2');

        expectPageableData(3, 1, 0, 1);
    }));

    it('Data: with http config (load more button) observable. Load more than one time.', fakeAsync(() => {
        initHttpConfigDataTest(true, false, null, true, false, true, true, 8, 2);

        const moreButtonEl = el.query(By.css('load-more-button'));
        expect(moreButtonEl).toBeTruthy();
        expectPageableData(17, 2, 2, 2);
    }));

    it('Data: with http config (load more button) observable. Try to load more, but data is full.', fakeAsync(() => {
        initHttpConfigDataTest(true, false, null, true, false, true, false, 8, 2);

        const moreButtonEl = el.query(By.css('load-more-button'));
        expect(moreButtonEl).toBeTruthy();
        expectPageableData(9, 1, 1, 1);
    }));

    // Private functions

    function initPageableDataTest(isLoadOnInit: boolean, value: any = null, hasNext: boolean = false,
        focus: boolean = false, needScroll: boolean = false, loaderCount?: number) {
        spyOn(component, 'onLoadMore').and.callThrough();
        spyOn(component, 'updateData').and.callThrough();
        spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig');

        if (value) {
            component.writeValue(value);
        }

        component.isLoadOnInit = isLoadOnInit;
        component.loader = mockLoader(hasNext, loaderCount);
        component.ngOnInit();
        fixture.detectChanges();

        if (focus) {
            focusTextInput();
        }

        if (needScroll) {
            scroll();
            fixture.detectChanges();
        }

        tick(0); // showLoader called in setTimeout
    }

    function initPageableShowMoreBtnDataTest(isLoadOnInit: boolean, value: any = null, hasNext: boolean = false,
        needClick: boolean = false, loaderCount?: number) {
        spyOn(component, 'onLoadMore').and.callThrough();
        spyOn(component, 'updateData').and.callThrough();
        spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig');

        if (value) {
            component.writeValue(value);
        }

        component.loader = mockLoader(hasNext, loaderCount);
        component.loadMoreButton = true;
        component.isLoadOnInit = isLoadOnInit;
        component.ngAfterViewInit();
        fixture.detectChanges();

        if (needClick) {
            const moreButtonEl = el.query(By.css('load-more-button div.btn div'));

            if (moreButtonEl) {
                moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
                fixture.detectChanges();
            }

            tick(0);
        } else {
            tick(0);
        }
    }

    function initHttpConfigDataTest(isLoadMoreButton:boolean, isLoadOnInit: boolean, value: any = null, focus: boolean = false, needScroll: boolean = false,
        loadMoreConfig: boolean = false, hasNext: boolean = false, loaderCount?: number, needClickShowMoreBtnTimes: number = 0) {
        spyOn(component, 'onLoadMore').and.callThrough();
        spyOn(component, 'updateData').and.callThrough();

        let dataByConfig = loadMoreConfig ? mockLoader(hasNext, loaderCount)() : mockObservable();

        spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig').and.returnValue(dataByConfig);

        component.loadMoreButton = isLoadMoreButton;

        if (value) {
            component.writeValue(value);
        }

        component.isLoadOnInit = isLoadOnInit;
        component.httpConfig = loadMoreConfig ? mockLoadMoreConfig() : mockConfig();
        component.ngOnInit();
        fixture.detectChanges();

        if (focus) {
            focusTextInput();
        }

        if (needScroll) {
            scroll();
            fixture.detectChanges();
        }        

        if(needClickShowMoreBtnTimes > 0){
            const moreButtonEl = el.query(By.css('load-more-button div.btn div'));
            if (moreButtonEl) {
                for (let index = 0; index < needClickShowMoreBtnTimes; index++) {
                    moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
                    fixture.detectChanges();
                }
            }            
        }

        tick(0); // showLoader called in setTimeout
    }


    function expectPageableData(expectedEl: number, expectedLoaderCalledTimes: number, expectedUpdaterCalledTimes: number, expectedConfigCalledTimes: number = 0) {
        let liElements = el.queryAll(By.css('ul.select-dropdown li'));
        let optionsElements = el.queryAll(By.css('select option'));

        expect(liElements.length).toEqual(expectedEl);
        expect(optionsElements.length).toEqual(expectedEl);

        if (expectedEl > 1) {
            expect(optionsElements[1].nativeElement.text).toEqual('test_1');
        }

        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(expectedLoaderCalledTimes);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(expectedLoaderCalledTimes);
        expect(component.onLoadMore).toHaveBeenCalledTimes(expectedUpdaterCalledTimes);
        expect(component.updateData).toHaveBeenCalledTimes(expectedUpdaterCalledTimes);
        expect(httpUtilsServiceInjectedSpy.getDataByConfig).toHaveBeenCalledTimes(expectedConfigCalledTimes);
    }

    function setOptionData(value?: any | Array<any>, data?: ILoadMoreData<ISelectData>) {
        component.updateData(data || { HasNext: true, Items: [{ key: '1', value: 'option 1' }, { key: '2', value: 'option 2' }] });

        if (value) {
            component.writeValue(value);
        }

        fixture.detectChanges();
    }

    function setOptGroupOptionData(value?: any) {
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
        const testData: ISelectData[] = [{ key: 1, value: 'test_1' }, { key: 2, value: 'test_2' }];
        return Observable.of<ISelectData[]>(testData);
    }

    function mockLoader(hasNext, count: number = 2) {

        let data = [];

        for (let index = 1; index <= count; index++) {
            data.push({ key: index, value: 'test_' + index });
        }

        return (): Observable<any> => {
            const testData: any = { HasNext: hasNext, Items: data }
            return Observable.of<any>(testData);
        };
    }

    function mockConfig() {
        let config = new HttpConfig<ISelectData[]>('http://test')
            .setMapper(site => {
                return site.map((s: any) => { return { key: s.Id, value: s.Value } });
            });

        return config;
    }

    function mockLoadMoreConfig() {
        let config = new HttpConfig<ILoadMoreData<ISelectData>>('http://test', true)
            .setMapper(resp => {
                return { Items: resp.Items.map((s: any) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext };
            })
            .setUpdater(resp => { });

        return config;
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