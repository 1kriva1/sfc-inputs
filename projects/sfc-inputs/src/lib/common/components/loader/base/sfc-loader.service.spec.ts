import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderService } from './sfc-loader.service';
import ILoader from '../../../interfaces/ILoader';

describe('Loader Service', () => {
    let service: LoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LoaderService],
        });

        let injector = getTestBed();
        service = injector.get(LoaderService);
    });

    it('registerLoader - one loader', () => {
        const loaderId = 'test_loader';

        service.registerLoader({ id: loaderId, status: false }).subscribe((response: ILoader) => {
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId);
            expect(response.status).toBeFalsy();
        });
    });

    it('registerLoader - several loaders', () => {
        const loaderId1 = 'test_loader1',
            loaderId2 = 'test_loader2';

        service.registerLoader({ id: loaderId1, status: false }).subscribe((response: ILoader) => {
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId1);
            expect(response.status).toBeFalsy();
        });

        service.registerLoader({ id: loaderId2, status: true }).subscribe((response: ILoader) => {
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId2);
            expect(response.status).toBeTruthy();
        });
    });

    it('registerLoader - several loaders - same id', () => {
        const loaderId = 'test_loader1';

        service.registerLoader({ id: loaderId, status: false }).subscribe((response: ILoader) => {
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId);
            expect(response.status).toBeFalsy();
        });

        // return first registered loader
        service.registerLoader({ id: loaderId, status: true }).subscribe((response: ILoader) => {
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId);
            expect(response.status).toBeFalsy();
        });
    });

    it('showLoader', () => {
        const loaderId = 'test_loader';
        let isShow = false;

        service.registerLoader({ id: loaderId, status: isShow }).subscribe((response: ILoader) => {
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId);
            expect(response.status).toEqual(isShow);
        });

        isShow = true;
        service.showLoader(loaderId);
    });

    it('showLoader - several loaders', () => {
        const loaderId1 = 'test_loader1',
            loaderId2 = 'test_loader2',
            assertCalledCount1 = 3,
            assertCalledCount2 = 1;
        let isShow1 = false,
            calledCount1 = 0,
            calledCount2 = 0;

        service.registerLoader({ id: loaderId1, status: false }).subscribe((response: ILoader) => {
            calledCount1++;
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId1);
            expect(response.status).toEqual(isShow1);
        });

        service.registerLoader({ id: loaderId2, status: true }).subscribe((response: ILoader) => {
            calledCount2++;
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId2);
            expect(response.status).toBeTruthy();
        });

        isShow1 = true;
        service.showLoader(loaderId1);

        isShow1 = false;
        service.hideLoader(loaderId1);

        expect(calledCount1).toEqual(assertCalledCount1);
        expect(calledCount2).toEqual(assertCalledCount2);
    });

    it('hideLoader', () => {
        const loaderId = 'test_loader';
        let isShow = false;

        service.registerLoader({ id: loaderId, status: isShow }).subscribe((response: ILoader) => {
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId);
            expect(response.status).toEqual(isShow);
        });

        isShow = true;
        service.showLoader(loaderId);

        isShow = false;
        service.hideLoader(loaderId);
    });

    it('removeLoader', () => {
        const loaderId = 'test_loader',
            assertCalledCount = 2;
        let isShow = false,
            calledCount = 0;

        service.registerLoader({ id: loaderId, status: isShow }).subscribe((response: ILoader) => {
            calledCount++;
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId);
            expect(response.status).toEqual(isShow);
        });

        isShow = true;
        service.showLoader(loaderId);

        service.removeLoader(loaderId);

        isShow = false;
        service.hideLoader(loaderId);

        expect(calledCount).toEqual(assertCalledCount);
    });

    it('removeLoader - loader not found', () => {
        const loaderId = 'test_loader',
            assertCalledCount = 3;
        let isShow = false,
            calledCount = 0;

        service.registerLoader({ id: loaderId, status: isShow }).subscribe((response: ILoader) => {
            calledCount++;
            expect(response).toBeTruthy();
            expect(response.id).toEqual(loaderId);
            expect(response.status).toEqual(isShow);
        });

        isShow = true;
        service.showLoader(loaderId);

        service.removeLoader('test_loader_1');

        isShow = false;
        service.hideLoader(loaderId);

        expect(calledCount).toEqual(assertCalledCount);
    });
});