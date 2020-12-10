import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadMoreDropDownComponent } from './sfc-load-more-dropdown.component';
import { LoaderService } from '../loader/base/sfc-loader.service';
import HttpUtils from '../../utils/http-utils';
import { SfcInputsModule } from '../../../sfc-inputs.module';
import { HttpConfig } from '../../utils/http-config';
import { ILoadMoreData } from '../../interfaces/ILoadMoreData';
import { map } from 'rxjs/operators';
import { ILoadParameters } from '../../interfaces/ILoadParameters';
import { StyleClass } from '../../constants/common-constants';


describe('Component: LoadMoreDropDownComponent', () => {

    let component: LoadMoreDropDownComponent;
    let fixture: ComponentFixture<LoadMoreDropDownComponent>;
    let el: DebugElement;

    let loaderServiceInjectedSpy: LoaderService;
    let httpUtilsServiceInjectedSpy: HttpUtils;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SfcInputsModule],
            declarations: []
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoadMoreDropDownComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
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

    it('Container: default classes', () => {
        expect(fixture.nativeElement.querySelector('div.select-dropdown-container')).toBeTruthy();
    });

    it('Container: open dropdown', () => {
        spyOn<any>(component, '_open').and.returnValue(true);
        fixture.detectChanges();

        expect(fixture.nativeElement.classList.contains(StyleClass.Open)).toBeTruthy();
    });    

    it('Container: is loading', () => {
        component.data = Observable.create(observer => observer.complete());
        loadData();

        expect(fixture.nativeElement.classList.contains(StyleClass.Loading)).toBeTruthy();
    });

    it('Bounce-loader: should create element', async(() => {
        expect(el.query(By.css('app-bounce-loader'))).toBeTruthy();
    }));

    it('Bounce-loader: default attributes', async(() => {
        const expectedId = 'test-id';
        component.loaderId = expectedId;
        fixture.detectChanges();

        let loader = el.query(By.css('app-bounce-loader'));
        expect(loader.attributes['ng-reflect-background']).toEqual('true');
        expect(loader.attributes['ng-reflect-size']).toEqual('small');
        expect(loader.attributes['ng-reflect-id']).toEqual(expectedId);
    }));

    it('Ul-Dropdown: default classes', () => {
        expect(fixture.nativeElement.querySelector('ul.select-dropdown')).toBeTruthy();
    });

    it('Ul-Dropdown: open state', async(() => {
        spyOn<any>(component, '_open').and.returnValue(true);
        fixture.detectChanges();

        let dropdownStyles = getComputedStyle(el.query(By.css('ul.select-dropdown')).nativeElement);
        expect(dropdownStyles.display).toEqual('block');
        expect(dropdownStyles.opacity).toEqual('1');
    }));

    it('Infinity Scroll: default attributes', async(() => {
        let dropdownEl = el.query(By.css('ul.select-dropdown'));

        expect(dropdownEl).toBeTruthy();
        expect(dropdownEl.attributes['ng-reflect-infinite-scroller']).toEqual('false');
        expect(dropdownEl.attributes['ng-reflect-has-more']).toEqual('false');
        expect(dropdownEl.attributes['scrollPercent']).toEqual('100');
    }));

    it('Infinity Scroll: when switch off load more button', async(() => {
        component.loadMoreButton = false;
        fixture.detectChanges();

        let dropdownEl = el.query(By.css('ul.select-dropdown'));

        expect(dropdownEl).toBeTruthy();
        expect(dropdownEl.attributes['ng-reflect-infinite-scroller']).toEqual('true');
    }));

    it('Infinity Scroll: has-more attrubute when has more data', async(() => {
        component.loadMoreButton = false;
        component.loader = mockLoader(true);
        loadData();

        let dropdownEl = el.query(By.css('ul.select-dropdown'));
        expect(dropdownEl.attributes['ng-reflect-has-more']).toEqual('true');
    }));

    it('Load-more button: should not show element by default (showLoadMore is false at init)', async(() => {
        expect(el.query(By.css('load-more-button'))).toBeFalsy();
    }));

    it('Load-more button: should show element when has more data', async(() => {
        component.loader = mockLoader(true);
        loadData();

        expect(el.query(By.css('load-more-button'))).toBeTruthy();
    }));

    it('Load-more button: should not show element when has NOT more data', async(() => {
        component.loader = mockLoader(false);
        loadData();

        expect(el.query(By.css('load-more-button'))).toBeFalsy();
    }));

    it('Load-more button: should not show element when load more button is OFF', async(() => {
        component.loadMoreButton = false;
        component.loader = mockLoader(true);
        loadData();

        expect(el.query(By.css('load-more-button'))).toBeFalsy();
    }));

    it('Loading: load data once', async(() => {
        component.data = [];
        component.loadData();
        fixture.detectChanges();

        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it('Loading: load data with exception', async(() => {
        component.data = mockObservableWithException();
        loadData();

        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it('Loading: load data more', async(() => {
        component.loader = mockLoader(true);
        loadData();

        loadMoreWithButton();

        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(2);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(2);
    }));

    it('Loading: try to load data more, but data is full', async(() => {
        component.loader = mockLoader(false);
        loadData();

        loadMoreWithButton();

        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it('Loading: load data by exhaust', async(() => {
        component.loader = mockLoader(false);
        component.exhaust(Observable.create(observer => observer.next()));
        fixture.detectChanges();

        expect(loaderServiceInjectedSpy.showLoader).toHaveBeenCalledTimes(1);
        expect(loaderServiceInjectedSpy.hideLoader).toHaveBeenCalledTimes(1);
    }));

    it('Data: do not load data', async(() => {
        spyOnDataHandlers();

        expect(component['handleLoaderSuccess']).not.toHaveBeenCalled();
        expect(component.handleSuccess.emit).not.toHaveBeenCalled();
    }));

    it('Data (static): empty data', async(() => {
        spyOnDataHandlers();

        component.data = []
        component.loadData();
        fixture.detectChanges();

        expect(component['handleLoaderSuccess']).toHaveBeenCalledWith({ HasNext: false, Items: [] });
        expect(component.handleSuccess.emit).toHaveBeenCalledWith({ HasNext: false, Items: [] });
    }));

    it('Data (static): not empty data', async(() => {
        spyOnDataHandlers();

        component.data = [1, 2]
        component.loadData();
        fixture.detectChanges();

        expectSuccessResult();
    }));

    it('Data (observable): load data', async(() => {
        spyOnDataHandlers();

        component.data = mockLoader(false)();
        loadData();

        expectSuccessResult();
    }));

    it('Data (observable): load data with exception', async(() => {
        spyOnDataHandlers();

        component.data = mockObservableWithException();
        loadData();

        expectFailedResult();
    }));

    it('Data (observable): has more data', async(() => {
        spyOnDataHandlers();

        component.data = mockLoader(true)();
        loadData();

        expectSuccessResult(true);
    }));

    it('Data (observable): load more data', async(() => {
        spyOnDataHandlers();

        component.data = mockLoader(true)();
        loadData();
        loadMoreWithButton();

        expectSuccessResult(true);
        expect(component.handleUpdate.emit).toHaveBeenCalledWith({ HasNext: true, Items: [1, 2] });
        expect(component.onLoadMore).toHaveBeenCalledTimes(1);
        expect(component.updateData).toHaveBeenCalledWith({ HasNext: true, Items: [1, 2] });
    }));

    it('Data (http config): load data', async(() => {
        spyOnDataHandlers();
        spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig').and.returnValue(mockLoader(false)());

        component.httpConfig = mockConfig();
        loadData();

        expectSuccessResult();
    }));

    it('Data (http config): load data with exception', async(() => {
        spyOnDataHandlers();
        spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig').and.returnValue(mockObservableWithException());

        component.httpConfig = mockConfig();
        loadData();

        expectFailedResult();
    }));

    it('Data (http config): has more data', async(() => {
        spyOnDataHandlers();
        spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig').and.returnValue(mockLoader(true)());

        component.httpConfig = mockLoadMoreConfig();
        loadData();

        expectSuccessResult(true);
    }));

    it('Data (http config): load more data', async(() => {
        spyOnDataHandlers();
        spyOn(httpUtilsServiceInjectedSpy, 'getDataByConfig').and.returnValue(mockLoader(true)());

        component.httpConfig = mockLoadMoreConfig();
        loadData();
        loadMoreWithButton();

        expectSuccessResult(true);
        expect(component.handleUpdate.emit).toHaveBeenCalledWith({ HasNext: true, Items: [1, 2] });
        expect(component.onLoadMore).toHaveBeenCalledTimes(1);
        expect(component.updateData).toHaveBeenCalledWith({ HasNext: true, Items: [1, 2] });
    }));

    it('Data (loader function): load data', async(() => {
        spyOnDataHandlers();

        component.loader = mockLoader(false);
        loadData();

        expectSuccessResult();
    }));

    it('Data (loader function): load data with exception', async(() => {
        spyOnDataHandlers();

        component.loader = mockLoaderWithException();
        loadData();

        expectFailedResult();
    }));

    it('Data (loader function): has more data', async(() => {
        spyOnDataHandlers();

        component.loader = mockLoader(true);
        loadData();

        expectSuccessResult(true);
    }));

    it('Data (loader function): load more data', async(() => {
        spyOnDataHandlers();

        component.loader = mockLoader(true);
        loadData();
        loadMoreWithButton();

        expectSuccessResult(true);
        expect(component.handleUpdate.emit).toHaveBeenCalledWith({ HasNext: true, Items: [1, 2] });
        expect(component.onLoadMore).toHaveBeenCalledTimes(1);
        expect(component.updateData).toHaveBeenCalledWith({ HasNext: true, Items: [1, 2] });
    }));

    it('Data (loader function): try load more data, but data is full', async(() => {
        spyOnDataHandlers();

        component.loader = mockLoader(false);
        loadData();
        loadMoreWithButton();

        expectSuccessResult();
        expect(component.handleUpdate.emit).not.toHaveBeenCalled();
        expect(component.onLoadMore).not.toHaveBeenCalled();
        expect(component.updateData).not.toHaveBeenCalled();
    }));

    it('Exhaust observable: load data by exhaust', async(() => {
        spyOnDataHandlers();

        component.data = mockLoader(false)();
        component.ngOnInit();
        component.exhaust(Observable.create(observer => observer.next()));
        fixture.detectChanges();

        expectSuccessResult(false);
    }));

    function expectSuccessResult(hasNext: boolean = false) {
        expect(component['handleLoaderSuccess']).toHaveBeenCalledWith({ HasNext: hasNext, Items: [1, 2] });
        expect(component['handleLoaderError']).not.toHaveBeenCalled();
        expect(component.handleSuccess.emit).toHaveBeenCalledWith({ HasNext: hasNext, Items: [1, 2] });
    }

    function expectFailedResult() {
        expect(component['handleLoaderSuccess']).not.toHaveBeenCalled();
        expect(component['handleLoaderError']).toHaveBeenCalledWith(new Error('test error message'));
        expect(component.handleError.emit).toHaveBeenCalledWith(new Error('test error message'));
    }

    function spyOnDataHandlers() {
        spyOn<any>(component, 'handleLoaderSuccess').and.callThrough();
        spyOn<any>(component, 'handleLoaderError').and.callThrough();
        spyOn<any>(component, 'onLoadMore').and.callThrough();
        spyOn<any>(component, 'updateData').and.callThrough();

        spyOn(component.handleSuccess, 'emit').and.callThrough();
        spyOn(component.handleError, 'emit').and.callThrough();
        spyOn(component.handleUpdate, 'emit').and.callThrough();
    }

    function loadMoreWithButton() {
        const moreButtonEl = el.query(By.css('load-more-button div.btn div'));

        if (moreButtonEl) {
            moreButtonEl.nativeElement.dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();
        }
    }

    function loadData() {
        component.ngOnInit();
        component.loadData();
        fixture.detectChanges();
    }

    function mockConfig() {
        let config = new HttpConfig<ILoadMoreData<number>>('http://test')
            .setMapper(resp => {
                return { Items: resp.Items, HasNext: resp.HasNext };
            });

        return config;
    }

    function mockLoadMoreConfig() {
        let config = new HttpConfig<ILoadMoreData<number>>('http://test', true)
            .setMapper(resp => {
                return { Items: resp.Items, HasNext: resp.HasNext };
            })
            .setUpdater(resp => { });

        return config;
    }

    function mockObservableWithException(message: string = 'test error message') {
        return Observable.create(observer => {
            observer.error(new Error(message))
            observer.complete();
        });
    }

    function mockLoader(hasNext, count: number = 2) {
        let data = [];

        for (let index = 1; index <= count; index++) {
            data.push(index);
        }

        return (): Observable<any> => {
            const testData: any = { HasNext: hasNext, Items: data }
            return Observable.of<number>(testData);
        };
    }

    function mockLoaderWithException() {
        return (): Observable<any> => {
            return mockObservableWithException();
        };
    }
});