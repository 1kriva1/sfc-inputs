import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PhotoInputComponent } from './sfc-photo-input.component';
import { SfcInputsModule } from '../sfc-inputs.module';
import { CommonConstants } from '../common/constants/common-constants';
import { getHugeFile } from '../common/validators/tests/sfc-input-validator-helper';
import ValidationConstants from '../common/constants/validation-constants';

describe('Component: PhotoInputComponent', () => {

    let component: PhotoInputComponent;
    let fixture: ComponentFixture<PhotoInputComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: []
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(PhotoInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("PhotoInputComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Disabled: default state", async(() => {
        expect(el.query(By.css('.input-photo-container.disabled'))).toBeFalsy();
    }));

    it("Disabled: when component disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(el.query(By.css('.input-photo-container.disabled'))).toBeTruthy();
    }));

    it("Photo: without url and default photo", async(() => {
        component.showDefaultPhoto = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.photo'))).toBeNull();
    }));

    it("Photo: with default photo", async(() => {
        const photoEl = el.query(By.css('div.photo'));

        expect(photoEl).toBeDefined();
        expect(photoEl.styles['background-image']).toEqual('url(' + CommonConstants.PHOTO_INPUT.DEFAULT_PHOTO_IMAGE + ')');
    }));

    it("Photo: with custom default photo", async(() => {
        component.defaultPhoto = 'test.png';
        fixture.detectChanges();

        const photoEl = el.query(By.css('div.photo'));

        expect(photoEl).toBeDefined();
        expect(photoEl.styles['background-image']).toEqual('url(' + component.defaultPhoto + ')');
    }));

    it("Photo: with custom default photo, but showDefaultPhoto is false", async(() => {
        component.showDefaultPhoto = false;
        component.defaultPhoto = 'test.png';
        fixture.detectChanges();

        expect(el.query(By.css('div.photo'))).toBeNull();
    }));

    it("Photo: with defined url", async(() => {
        mockFileReader('data:*/*;base64,test');
        setPhotoValue();

        const photoEl = el.query(By.css('div.photo'));

        expect(photoEl).toBeDefined();
        expect(photoEl.styles['background-image']).toEqual('url(data:*/*;base64,test)');
    }));

    it("Input: should create input element", () => {
        expect(el.query(By.css('input[type="file"]'))).toBeDefined();
    });

    it("Input: default id value", () => {
        expect(el.query(By.css('input[type="file"]')).nativeElement.id).toEqual('sfc-');
    });

    it("Input: id value", () => {
        component.id = 'test-id';
        fixture.detectChanges();

        expect(el.query(By.css('input[type="file"]')).nativeElement.id).toEqual('sfc-test-id');
    });

    it("Input: permanently hidden", () => {
        expect(el.query(By.css('input[type="file"]')).attributes.hidden).toEqual('true');
    });

    it("Input: disabled default value", () => {
        expect(el.query(By.css('input[type="file"]')).properties.disabled).toBeFalsy();
    });

    it("Input: set disabled", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(el.query(By.css('input[type="file"]')).properties.disabled).toBeTruthy();
    });

    it("Input: on click", () => {
        spyOn<any>(component, 'onClick').and.callThrough();
        const inputEl = el.query(By.css('input[type="file"]'));
        inputEl.triggerEventHandler('click', { target: inputEl.nativeElement });
        fixture.detectChanges();

        expect(component['onClick']).toHaveBeenCalled();
    });

    it("Label: default inner text value", () => {
        const labelEl = fixture.nativeElement.querySelector('div.change-link > label');
        expect(labelEl.innerText).toEqual('');
    });

    it("Label: inner text value", () => {
        const labelAssertValue = 'test label';
        component.label = labelAssertValue;
        fixture.detectChanges();
        const labelEl = fixture.nativeElement.querySelector('div.change-link > label');

        expect(labelEl.innerText).toEqual(labelAssertValue);
    });

    it("Label: label should be linked to input element", () => {
        const inputEl = el.query(By.css('input[type="file"]')).nativeElement;

        expect(inputEl.labels).toBeDefined();
        expect(inputEl.labels.length).toEqual(1);
        expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    it("Icon: not created if icon value not defined, showIcon is false and label defined", () => {
        component.showIcon = false;
        component.label = 'test label';
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.change-link > label > i')).toBeNull();
    });

    it("Icon: created if icon value not defined, showIcon is false and label not defined", () => {
        component.showIcon = false;
        component.ngOnInit();
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('div.change-link > label > i');

        expect(icon).toBeDefined();
        expect(icon.className).toEqual(CommonConstants.PHOTO_INPUT.DEFAULT_ICON);
    });

    it("Icon: created default if icon value not defined, showIcon is true", () => {
        component.showIcon = true;
        component.ngOnInit();
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('div.change-link > label > i');

        expect(icon).toBeDefined();
        expect(icon.className).toEqual(CommonConstants.PHOTO_INPUT.DEFAULT_ICON);
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.change-link > label > i')).toBeDefined();
    });

    it("Icon: should add class to icon element", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('div.change-link > label > i');

        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
    });

    it("Clear button: should create when value defined", () => {
        setPhotoValue();

        expect(fixture.nativeElement.querySelector('i.clear-button')).toBeDefined();
    });

    it("Clear button: icon value", () => {
        setPhotoValue();

        const clearBtnEl = fixture.nativeElement.querySelector('i.clear-button');

        expect(clearBtnEl.className).toContain('fa');
        expect(clearBtnEl.className).toContain('fa-times');
    });

    it("Clear button: should not create when value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.clear-button')).toBeNull();
    });

    it("Clear button: should not create when showClearButton is false even if value defined", () => {
        component.showClearButton = false;
        setPhotoValue();

        expect(fixture.nativeElement.querySelector('i.clear-button')).toBeNull();
    });

    it("Clear button: on click with default photo", () => {
        mockFileReader('data:*/*;base64,test');
        setPhotoValue();

        const photoEl = el.query(By.css('div.photo'));

        expect(photoEl.styles['background-image']).toEqual('url(data:*/*;base64,test)');

        const clearBtnEl = el.query(By.css('i.clear-button'));
        clearBtnEl.triggerEventHandler('click', { target: clearBtnEl.nativeElement });
        fixture.detectChanges();

        expect(photoEl.styles['background-image']).toEqual('url(' + CommonConstants.PHOTO_INPUT.DEFAULT_PHOTO_IMAGE + ')');
    });

    it("Clear button: on click without default photo", () => {
        component.showDefaultPhoto = false;
        mockFileReader('data:*/*;base64,test');
        setPhotoValue();

        expect(el.query(By.css('div.photo')).styles['background-image']).toEqual('url(data:*/*;base64,test)');

        const clearBtnEl = el.query(By.css('i.clear-button'));
        clearBtnEl.triggerEventHandler('click', { target: clearBtnEl.nativeElement });
        fixture.detectChanges();

        expect(el.query(By.css('div.photo'))).toBeNull();
    });

    it("Overlay: should create", () => {
        expect(fixture.nativeElement.querySelector('div.overlay')).toBeDefined();
    });

    it("Helper text: should create element with permanent class value", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = 'test helper text';
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    it("Modal: hide by default", () => {
        const modal = el.query(By.css('sfc-modal'));

        expect(modal).toBeDefined();
        expect(modal.attributes['ng-reflect-show']).toEqual('false');
    });

    it("Modal: show on change file input event", () => {
        changeFile();

        const modal = el.query(By.css('sfc-modal'));

        expect(modal).toBeDefined();
        expect(modal.attributes['ng-reflect-show']).toEqual('true');
    });

    it("Modal header icon: not created if icon value not defined, showIcon is false and label defined", () => {
        component.showIcon = false;
        component.label = 'test label';
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-modal i.modal-header-icon')).toBeNull();
    });

    it("Modal header icon: created if icon value not defined, showIcon is false and label not defined", () => {
        component.showIcon = false;
        component.ngOnInit();
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('sfc-modal i.modal-header-icon');

        expect(icon).toBeDefined();
        expect(icon.className).toContain(CommonConstants.PHOTO_INPUT.DEFAULT_ICON);
    });

    it("Modal header icon: created default if icon value not defined, showIcon is true", () => {
        component.showIcon = true;
        component.ngOnInit();
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('sfc-modal i.modal-header-icon');

        expect(icon).toBeDefined();
        expect(icon.className).toContain(CommonConstants.PHOTO_INPUT.DEFAULT_ICON);
    });

    it("Modal header icon: should create icon element if icon value defined", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-modal i.modal-header-icon')).toBeDefined();
    });

    it("Modal header icon: should add class to icon element", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('sfc-modal i.modal-header-icon');

        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
    });

    it("Modal header label: should not create if label not defined", () => {
        expect(fixture.nativeElement.querySelector('sfc-modal span.modal-header-label')).toBeNull();
    });

    it("Modal header label: inner text value", () => {
        const labelAssertValue = 'test label';
        component.label = labelAssertValue;
        fixture.detectChanges();
        const labelEl = fixture.nativeElement.querySelector('sfc-modal span.modal-header-label');

        expect(labelEl.innerHTML).toEqual(labelAssertValue);
    });

    it("Modal body - editor: should create with attributes", () => {
        const editor = el.query(By.css('sfc-photo-editor'));

        expect(editor).toBeDefined();
        expect(editor.attributes['ng-reflect-crop-area']).toEqual('0.5');
        expect(editor.attributes['ng-reflect-view-mode']).toEqual('1');
        expect(editor.attributes['ng-reflect-image-file']).toBeNull();
    });

    it("Modal body - editor: with defined image file", () => {
        changeFile();

        const editor = el.query(By.css('sfc-photo-editor'));

        expect(editor.attributes['ng-reflect-image-file']).toBeDefined();
    });

    it("Modal: on close click", () => {
        spyOn<any>(component, 'onClose').and.callThrough();
        changeFile();

        expect(el.query(By.css('sfc-modal')).attributes['ng-reflect-show']).toEqual('true');

        const modalCloseEl = el.query(By.css('i.button-close'));
        modalCloseEl.triggerEventHandler('click', { target: modalCloseEl.nativeElement });
        fixture.detectChanges();

        expect(el.query(By.css('sfc-modal')).attributes['ng-reflect-show']).toEqual('false');
        expect(component['onClose']).toHaveBeenCalledTimes(1);
    });

    it("Modal: on ok click", () => {
        component.photoEditor = jasmine.createSpyObj('PhotoEditorComponent', ['export']);
        spyOn<any>(component, 'onOk').and.callThrough();

        changeFile();

        expect(el.query(By.css('sfc-modal')).attributes['ng-reflect-show']).toEqual('true');

        const okBtn = el.query(By.css('sfc-button.button-ok'));
        okBtn.triggerEventHandler('click', { target: okBtn.nativeElement });
        fixture.detectChanges();

        expect(el.query(By.css('sfc-modal')).attributes['ng-reflect-show']).toEqual('false');
        expect(component['onOk']).toHaveBeenCalledTimes(1);
        expect(component.photoEditor.export).toHaveBeenCalledTimes(1);
    });

    it("Change event: without file", () => {
        changeFile(true);

        expect(el.query(By.css('div.input-photo-container.invalid'))).toBeTruthy();
        expect(el.query(By.css('sfc-modal')).attributes['ng-reflect-show']).toEqual('false');
        expect(el.query(By.css('sfc-photo-editor')).attributes['ng-reflect-image-file']).toBeNull();
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.FORMAT_VALIDATION['sfc-format']);
    });

    it("Change event: with file", () => {
        changeFile(false);

        expect(el.query(By.css('sfc-modal')).attributes['ng-reflect-show']).toEqual('true');
        expect(el.query(By.css('sfc-photo-editor')).attributes['ng-reflect-image-file']).toBeDefined();
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('');
    });

    it("Change event: with not image file", () => {
        changeFile(false, true);

        expect(el.query(By.css('div.input-photo-container.invalid'))).toBeTruthy();
        expect(el.query(By.css('sfc-modal')).attributes['ng-reflect-show']).toEqual('false');
        expect(el.query(By.css('sfc-photo-editor')).attributes['ng-reflect-image-file']).toBeNull();
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.FORMAT_VALIDATION['sfc-format']);
    });

    it("Value: with image file", () => {
        mockFileReader('data:*/*;base64,test')
        setPhotoValue(false);

        expect(el.query(By.css('div.photo')).styles['background-image']).toEqual('url(data:*/*;base64,test)');
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('');
    });

    it("Value: with not image file", () => {
        setPhotoValue(true);

        expect(el.query(By.css('div.photo')).styles['background-image']).toEqual('url(' + CommonConstants.PHOTO_INPUT.DEFAULT_PHOTO_IMAGE + ')');
        expect(el.query(By.css('div.input-photo-container.invalid'))).toBeTruthy();
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.FORMAT_VALIDATION['sfc-format']);
    });

    function mockFileReader(resultValue: string) {
        const mockFileReader = {
            result: '',
            readAsDataURL: () => { },
            onload: () => { }
        };

        spyOn<any>(window, 'FileReader').and.returnValue(mockFileReader);
        spyOn<any>(mockFileReader, 'readAsDataURL').and.callFake(() => {
            mockFileReader.result = resultValue;
            mockFileReader.onload();
        });
    }

    function setPhotoValue(isNotImageFile = false) {
        const testPhoto = getHugeFile(isNotImageFile ? 'test.txt' :'test.png', 1000);
        component.writeValue(testPhoto);
        fixture.detectChanges();
    }

    function changeFile(isEmptyFile = false, isNotImageFile = false) {
        const inputEl = el.query(By.css('input[type="file"]')),
            file = getHugeFile(isNotImageFile ? 'test.txt' :'test.png', 1000);
        inputEl.triggerEventHandler('change', {
            target: {
                target: inputEl.nativeElement,
                files: {
                    item: function () {
                        return isEmptyFile ? null : file;
                    }
                }
            }
        });

        fixture.detectChanges();
    }
});