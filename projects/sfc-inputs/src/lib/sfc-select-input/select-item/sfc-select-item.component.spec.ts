import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectItemComponent } from './sfc-select-item.component';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { By } from '@angular/platform-browser';
import IOptGroupValue from '../../common/interfaces/select-input/IOptGroupValue';
import { CommonConstants, StyleClass } from '../../common/constants/common-constants';


describe('Component: SelectItemComponent', () => {

    let component: SelectItemComponent;
    let fixture: ComponentFixture<SelectItemComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SfcInputsModule],
            declarations: []
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SelectItemComponent);
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
        setItem(-1, false, 'testImg.jpg');

        const itemImg = el.query(By.css('img'));

        expect(itemImg).toBeTruthy();
        expect(itemImg.nativeElement.src.indexOf('testImg.jpg')).not.toEqual(-1);
    }));

    it('Single: display value - item not defined', async(() => {
        expect(el.query(By.css('li span span'))).toBeFalsy();
    }));

    it('Single: display value - item defined', async(() => {
        setItem();
        expect(el.query(By.css('li span span')).nativeElement.innerText).toEqual('test select item');
    }));

    it('Single: not selected item', async(() => {
        setItem();

        expectSelectResult(false);
    }));

    it('Single: selected item', async(() => {
        setItem(1);

        expectSelectResult(true);
    }));

    it('Single: do not select item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        setItem();

        expectSelectResult(false);
        expect(component.selected.emit).not.toHaveBeenCalled();
    }));

    it('Single: select item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        setItem();

        selectItem(component.item.key);

        expectSelectResult(true);
        expect(component.selected.emit).toHaveBeenCalledWith(component.item.key);
    }));

    it('Single: select already selected item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        setItem(1);

        selectItem(component.item.key);

        expectSelectResult(true);
        expect(component.selected.emit).toHaveBeenCalledWith(component.item.key);
    }));

    it('Multiple: display value - item not defined', async(() => {
        component.multiple = true;
        fixture.detectChanges();

        expect(el.query(By.css('li span label div.multiple label'))).toBeFalsy();
    }));

    it('Multiple: display value - item defined', async(() => {
        component.multiple = true;
        setItem();

        expect(el.query(By.css('li span label div.multiple label')).nativeElement.innerText).toEqual('test select item');
    }));

    it('Multiple: checkbox should be defined', async(() => {
        component.multiple = true;
        setItem();

        const checkboxEl = el.query(By.css('li span label div.multiple input[type="checkbox"]')).nativeElement;

        expect(checkboxEl.name).toEqual(component.item.key.toString());
        expect(checkboxEl.value).toEqual(component.item.key.toString());
    }));

    it('Multiple: label for attribute', async(() => {
        component.multiple = true;
        setItem();

        expect(el.query(By.css('li span label div.multiple label')).nativeElement.htmlFor).toEqual(component.item.key.toString());
    }));

    it('Multiple: not selected item', async(() => {
        component.multiple = true;
        setItem();

        expectSelectResult(false);
    }));

    it('Multiple: selected item', async(() => {
        component.multiple = true;
        setItem([1]);

        expectSelectResult(true);
    }));

    it('Multiple: do not set item selected', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.multiple = true;
        setItem();

        expectSelectResult(false);
        expect(component.selected.emit).not.toHaveBeenCalled();
    }));

    it('Multiple: set item selected', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.multiple = true;
        setItem();

        selectItem([1]);

        expectSelectResult(true);
        expect(component.selected.emit).toHaveBeenCalledWith([component.item.key]);
    }));

    it('Multiple: set default item, when none default items selected', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.multiple = true;
        setItem([2], true);

        expect(el.query(By.css('li.disabled'))).toBeTruthy();
        expect(component.isSelected).toBeFalsy();
        expect(component.selected.emit).not.toHaveBeenCalled();
    }));

    it('Multiple: set already selected item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.multiple = true;
        setItem([1]);

        selectItem([]);

        expectSelectResult(false);
        expect(component.selected.emit).toHaveBeenCalledWith([]);
    }));

    it('Multiple: set already selected item with another selected item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.multiple = true;
        setItem([1, 2]);

        selectItem([2]);

        expectSelectResult(false);
        expect(component.selected.emit).toHaveBeenCalledWith([2]);
    }));

    it('Multiple: set selected default item, when none default items selected', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.defaultDisplayKey = 1;
        component.multiple = true;
        setItem([2], true);

        selectItem([2]);

        expectSelectResult(false);
        expect(component.selected.emit).toHaveBeenCalledWith([2]);
    }));

    it('Multiple: set selected default item, when default item selected', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.defaultDisplayKey = 1;
        component.multiple = true;
        setItem([1], true);

        selectItem([]);

        expectSelectResult(false);
        expect(component.selected.emit).toHaveBeenCalledWith([]);
    }));

    it('Multiple: set selected default item, when any items selected', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.defaultDisplayKey = 1;
        component.multiple = true;
        setItem(null, true);

        selectItem([1]);

        expectSelectResult(true);
        expect(component.selected.emit).toHaveBeenCalledWith([1]);
    }));

    it('Multiple: select item, when already selected default item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.defaultDisplayKey = -1;
        component.multiple = true;
        setItem([-1, 2]);

        selectItem([2, 1]);

        expectSelectResult(true);
        expect(component.selected.emit).toHaveBeenCalledWith([2, 1]);
    }));

    it('OptGroup: display value - item not defined', async(() => {
        component.isOptGroup = true;
        fixture.detectChanges();

        expect(el.query(By.css('li span span'))).toBeFalsy();
    }));

    it('OptGroup: display value - item defined', async(() => {
        component.isOptGroup = true;
        setItem();

        expect(el.query(By.css('li span span')).nativeElement.innerText).toEqual('test select item');
    }));

    it('OptGroup: is opt group item', async(() => {
        component.isOptGroup = true;
        setOptGroupItem({ key: 1, groupKey: 2 }, false, true);

        expect(el.query(By.css('li.' + CommonConstants.SELECT_INPUT.OPT_GROUP_CLASS))).toBeTruthy();
    }));

    it('OptGroup: is opt group option item', async(() => {
        component.isOptGroup = true;
        setOptGroupItem({ key: 1, groupKey: 2 }, false, false, true);

        expect(el.query(By.css('li.' + CommonConstants.SELECT_INPUT.OPT_GROUP_OPTION_CLASS))).toBeTruthy();
    }));

    it('OptGroup: not selected item', async(() => {
        component.isOptGroup = true;
        setOptGroupItem();

        expectSelectResult(false);
    }));

    it('OptGroup: selected item', async(() => {
        component.isOptGroup = true;
        setOptGroupItem({ key: 1, groupKey: 1 });

        expectSelectResult(true);
    }));

    it('OptGroup: do not select item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.isOptGroup = true;
        setOptGroupItem({ key: 1, groupKey: 2 }, false, false, true);

        expectSelectResult(false);
        expect(component.selected.emit).not.toHaveBeenCalled();
    }));

    it('OptGroup: select opt group option item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.isOptGroup = true;
        setOptGroupItem({ key: 1, groupKey: 2 }, false, false, true);

        selectItem({ key: 1, groupKey: 1 });

        expectSelectResult(true);
        expect(component.selected.emit).toHaveBeenCalledWith({ key: 1, groupKey: 1 });
    }));

    it('OptGroup: select default item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.isOptGroup = true;
        setOptGroupItem({ key: 1, groupKey: 2 }, true, false, false);

        selectItem({ key: 1, groupKey: 1 });

        expectSelectResult(true);
        expect(component.selected.emit).toHaveBeenCalledWith({ key: 1, groupKey: 1 });
    }));

    it('OptGroup: select opt group item', async(() => {
        spyOn(component.selected, 'emit').and.callThrough();
        component.isOptGroup = true;
        setOptGroupItem({ key: 1, groupKey: 2 }, false, true, false);

        selectItem({ key: 1, groupKey: 2 });

        expectSelectResult(false);
        expect(component.selected.emit).not.toHaveBeenCalled();
    }));

    function expectSelectResult(isSelected: boolean) {
        if (isSelected) {
            expect(el.query(By.css('li.' + StyleClass.Selected))).toBeTruthy();
            expect(component.isSelected).toBeTruthy();
        } else {
            expect(el.query(By.css('li.' + StyleClass.Selected))).toBeFalsy();
            expect(component.isSelected).toBeFalsy();
        }
    }

    function selectItem(value: any) {
        el.query(By.css('li')).nativeElement.dispatchEvent(new MouseEvent('mousedown', {}));
        component.value = value;
        fixture.detectChanges();
    }

    function setItem(selectedItemKey: any = null, isDefault = false, imagePath = null) {
        component.item = { key: 1, value: 'test select item', isDefault: isDefault, imagePath: imagePath };
        component.value = selectedItemKey;
        fixture.detectChanges();
    }

    function setOptGroupItem(selectedValue: IOptGroupValue = { key: 1, groupKey: 2 }, isDefault = false, isOptGroup = null, isOptGroupOption = null, imagePath = null) {
        component.item = { key: 1, value: 'test select item', groupKey: 1, isOptGroup: isOptGroup, isOptGroupOption: isOptGroupOption, isDefault: isDefault, imagePath: imagePath };
        component.value = selectedValue;
        fixture.detectChanges();
    }

});