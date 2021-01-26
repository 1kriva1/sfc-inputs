import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteItemComponent } from './sfc-autocomplete-item.component';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { By } from '@angular/platform-browser';


describe('Component: AutocompleteItemComponent', () => {

    let component: AutocompleteItemComponent;
    let fixture: ComponentFixture<AutocompleteItemComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SfcInputsModule],
            declarations: []
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AutocompleteItemComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
        });
    }));

    it('Should create component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('Should not be li element', async(() => {
        expect(el.query(By.css('li'))).toBeFalsy();
    }));

    it('Should be li element', async(() => {
        setItem();

        expect(el.query(By.css('li'))).toBeTruthy();
    }));

    it('Image: should not be presented if imagePath is empty', async(() => {
        expect(el.query(By.css('img'))).toBeFalsy();
    }));

    it('Image: should be presented when imagePath is presented', async(() => {
        setItem('testImg.jpg');

        const itemImg = el.query(By.css('img'));

        expect(itemImg).toBeTruthy();
        expect(itemImg.nativeElement.src.indexOf('testImg.jpg')).not.toEqual(-1);
    }));

    it('Display value: item not defined', async(() => {
        expect(el.query(By.css('li span span'))).toBeFalsy();
    }));

    it('Display value: item defined', async(() => {
        setItem();
        expect(el.query(By.css('li span span')).nativeElement.innerText).toEqual('test autocomplete');
    }));

    it('Selecting: do not select item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        setItem();

        expect(component.selected.emit).not.toHaveBeenCalled();
    }));

    it('Selecting: select item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        setItem();

        selectItem(component.item.key);

        expect(component.selected.emit).toHaveBeenCalledWith(component.item);
    }));

    function setItem(imagePath = null) {
        component.item = { key: 1, value: 'test autocomplete', imagePath: imagePath };
        fixture.detectChanges();
    }

    function selectItem(value: any) {
        el.query(By.css('li')).nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        fixture.detectChanges();
    }
});