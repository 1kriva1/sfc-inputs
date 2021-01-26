import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcInputsModule } from '../../sfc-inputs.module';
import { PhotoEditorComponent } from './sfc-photo-editor.component';
import { CommonConstants, CropperDragModes } from '../../common/constants/common-constants';

describe('Component: PhotoEditorComponent', () => {
    let component: PhotoEditorComponent;
    let fixture: ComponentFixture<PhotoEditorComponent>;
    let el: DebugElement;

    const cropperSpy = jasmine.createSpyObj('Cropper', ['destroy', 'setDragMode', 'zoom', 'scaleY', 'scaleX', 'getImageData', 'rotate', 'reset', 'getCroppedCanvas']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcInputsModule],
            declarations: []
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(PhotoEditorComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("PhotoEditorComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Image: Should create when url defined", async(() => {
        component.imageUrl = 'testImage.png';
        fixture.detectChanges();

        expect(el.query(By.css('.photo-editor-container img.photo-editor-image'))).toBeTruthy();
    }));

    it("Image: Should not create when url is not defined", async(() => {
        expect(el.query(By.css('.photo-editor-container img.photo-editor-image'))).toBeNull();
    }));

    it("Image: source value", async(() => {
        component.imageUrl = 'testImage.png';
        fixture.detectChanges();

        expect(el.query(By.css('.photo-editor-container img.photo-editor-image')).properties.url).toEqual(component.imageUrl);
    }));

    it("Image: on image load", async(() => {
        spyOn<any>(component, 'onImageLoad').and.callThrough();
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(null);
        component.imageUrl = 'testImage.png';
        fixture.detectChanges();

        const imageEl = el.query(By.css('.photo-editor-container img.photo-editor-image'));
        loadImage();

        expect(component['onImageLoad']).toHaveBeenCalledTimes(1);
        expect(component['onImageLoad']).toHaveBeenCalledWith(imageEl.nativeElement);
    }));

    it("Image: on image load second time", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);
        spyOn<any>(component, 'onImageLoad').and.callThrough();
        component.imageUrl = 'testImage.png';
        fixture.detectChanges();

        loadImage();

        loadImage();

        expect(component['onImageLoad']).toHaveBeenCalledTimes(2);
        expect(cropperSpy.destroy).toHaveBeenCalled();
    }));

    it("Crop action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-crop'))).toBeDefined();
    }));

    it("Crop action: active by default", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-crop.active'))).toBeDefined();
    }));

    it("Crop action: switch to move mode", async(() => {
        clickAction('arrows-alt')

        expect(el.query(By.css('.photo-editor-actions-container i.fa-crop.active'))).toBeNull();
    }));

    it("Crop action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);

        clickAction('crop')

        expect(cropperSpy.setDragMode).toHaveBeenCalledWith(CropperDragModes.Crop);
        expect(el.query(By.css('.photo-editor-actions-container i.fa-crop.active'))).toBeDefined();
    }));

    it("Move action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-arrows-alt'))).toBeDefined();
    }));

    it("Move action: active by default", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-arrows-alt.active'))).toBeNull();
    }));

    it("Move action: switch to move mode", async(() => {
        clickAction('arrows-alt')

        expect(el.query(By.css('.photo-editor-actions-container i.fa-crop.active'))).toBeNull();
        expect(el.query(By.css('.photo-editor-actions-container i.fa-arrows-alt.active'))).toBeDefined();
    }));

    it("Move action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);

        clickAction('arrows-alt')

        expect(cropperSpy.setDragMode).toHaveBeenCalledWith(CropperDragModes.Move);
        expect(el.query(By.css('.photo-editor-actions-container i.fa-crop.active'))).toBeNull();
        expect(el.query(By.css('.photo-editor-actions-container i.fa-arrows-alt.active'))).toBeDefined();
    }));

    it("Zoom In action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-search-plus'))).toBeDefined();
    }));

    it("Zoom In action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);

        clickAction('search-plus')

        expect(cropperSpy.zoom).toHaveBeenCalledWith(CommonConstants.PHOTO_INPUT.ZOOM_VALUE);
    }));

    it("Zoom Out action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-search-minus'))).toBeDefined();
    }));

    it("Zoom Out action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);

        clickAction('search-minus')

        expect(cropperSpy.zoom).toHaveBeenCalledWith(-CommonConstants.PHOTO_INPUT.ZOOM_VALUE);
    }));

    it("Flip vertical action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-arrows-v'))).toBeDefined();
    }));

    it("Flip vertical action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);
        cropperSpy.getImageData.and.callFake(function () {
            return { scaleY: 10 };
        });

        clickAction('arrows-v')

        expect(cropperSpy.scaleY).toHaveBeenCalledWith(-10);
    }));

    it("Flip horizontal action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-arrows-h'))).toBeDefined();
    }));

    it("Flip horizontal action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);
        cropperSpy.getImageData.and.callFake(function () {
            return { scaleX: 10 };
        });

        clickAction('arrows-h')

        expect(cropperSpy.scaleX).toHaveBeenCalledWith(-10);
    }));

    it("Rotate left action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-rotate-left'))).toBeDefined();
    }));

    it("Rotate left action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);

        clickAction('rotate-left')

        expect(cropperSpy.rotate).toHaveBeenCalledWith(-CommonConstants.PHOTO_INPUT.IMAGE_ROTATE_ANGLE);
    }));

    it("Rotate right action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-rotate-right'))).toBeDefined();
    }));

    it("Rotate right action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);

        clickAction('rotate-right')

        expect(cropperSpy.rotate).toHaveBeenCalledWith(CommonConstants.PHOTO_INPUT.IMAGE_ROTATE_ANGLE);
    }));

    it("Reset action: should create", async(() => {
        expect(el.query(By.css('.photo-editor-actions-container i.fa-refresh'))).toBeDefined();
    }));

    it("Reset action: on click", async(() => {
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);

        clickAction('refresh')

        expect(cropperSpy.reset).toHaveBeenCalled();
    }));

    it("Export: default export", async(() => {
        const mockBlob = new Blob(["test.png"], { type: "image/png" }),
            mockBase64 = 'test_value';
        spyOn(component.cropped, 'emit').and.callThrough();
        setUpCropperProperty('png');

        component.export();
        fixture.detectChanges();

        expect(component.cropped.emit).toHaveBeenCalledTimes(1);
        expect(component.cropped.emit).toHaveBeenCalledWith({
            base64: mockBase64,
            file: new File([mockBlob], Date.now() + '.' + CommonConstants.PHOTO_INPUT.DEFAULT_FORMAT, { type: 'image/png' })
        });
    }));

    it("Export: smoothing values", async(() => {
        setUpCropperProperty('png');
        component.imageSmoothingEnabled = false;
        component.imageSmoothingQuality = 'low';
        fixture.detectChanges();

        component.export();
        fixture.detectChanges();

        expect(cropperSpy.getCroppedCanvas).toHaveBeenCalledWith({
            imageSmoothingEnabled: component.imageSmoothingEnabled,
            imageSmoothingQuality: component.imageSmoothingQuality
        });
    }));

    it("Export: custom format", async(() => {
        const mockBlob = new Blob(["test.jpeg"], { type: "image/jpeg" }),
            mockBase64 = 'test_value';
        spyOn(component.cropped, 'emit').and.callThrough();
        setUpCropperProperty('jpeg');
        component.imageFormat = 'jpeg';
        fixture.detectChanges();

        component.export();
        fixture.detectChanges();

        expect(component.cropped.emit).toHaveBeenCalledWith({
            base64: mockBase64,
            file: new File([mockBlob], Date.now() + '.jpeg', { type: 'image/jpeg' })
        });
    }));

    function setUpCropperProperty(format: string){
        const mockBlob = new Blob(["test." + format], { type: "image/" + format }),
            mockBase64 = 'test_value';
        spyOnProperty<any>(component, 'cropper', 'get').and.returnValue(cropperSpy);
        cropperSpy.getCroppedCanvas.and.callFake(function () {
            return {
                ...document.createElement("img"), ...{
                    toDataURL: () => mockBase64,
                    toBlob: (callback) => callback(mockBlob)
                }
            };
        });
    }

    function loadImage(){
        const imageEl = el.query(By.css('.photo-editor-container img.photo-editor-image'));
        imageEl.nativeElement.dispatchEvent(new MouseEvent('load', {}));
        fixture.detectChanges();
    }

    function clickAction(action: string) {
        const actionEl = el.query(By.css('.photo-editor-actions-container i.fa-' + action));
        actionEl.triggerEventHandler('click', { target: actionEl.nativeElement });
        fixture.detectChanges();
    }
});