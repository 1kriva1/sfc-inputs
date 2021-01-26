import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import Cropper from 'cropperjs';
import { CommonConstants, CropperDragModes, ImageFormat } from '../../common/constants/common-constants';
import ICroppedEvent from '../../common/interfaces/photo-editor/ICroppedEvent';
import { FileUtils } from '../../common/utils/file-utils';

@Component({
    selector: 'sfc-photo-editor',
    templateUrl: './sfc-photo-editor.component.html',
    styleUrls: ['../../../../../../node_modules/cropperjs/dist/cropper.min.css', './sfc-photo-editor.component.css', './sfc-photo-editor-dark-theme.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PhotoEditorComponent {

    CropperDragModes = CropperDragModes;

    /**
     * crop area form
     */
    @Input('ratio')
    aspectRatio = 1;

    /**
     * crop area size
     */
    @Input('crop-area')
    cropArea = 1;

    /**
     * show crop area on init
     */
    @Input('auto-crop')
    autoCrop = true;

    /**
     * If true - background image will be dark
     */
    @Input()
    mask = true;

    /**
     * If true show grid inside crop area
     */
    @Input()
    guides = true;

    /**
     * If true - show central poin inside crop area
     */
    @Input('central-indication')
    centerIndicator = true;

    /**
     * If you set viewMode to 0, the crop box can extend outside the canvas, while a value of 1, 2 or 3 will restrict the crop box to the size of the canvas. 
     * A viewMode of 2 or 3 will additionally restrict the canvas to the container. 
     * Note that if the proportions of the canvas and the container are the same, there is no difference between 2 and 3.
     */
    @Input('view-mode')
    viewMode: Cropper.ViewMode = 0;

    @Input()
    scalable = true;

    /**
     * Enable/disable zoom
     */
    @Input()
    zoomable = true;

    /**
     * Enable/disable move function on crop area
     */
    @Input('crop-movable')
    cropBoxMovable = true;

    /**
     * Enable/disable resize function on crop area
     */
    @Input('crop-resizable')
    cropBoxResizable = true;

    @Input('image-smoothing-enabled')
    imageSmoothingEnabled = true;

    @Input('image-smoothing-quality')
    imageSmoothingQuality: ImageSmoothingQuality = 'high';

    @Input('image-quality')
    set imageQuality(value: number) {
        if (value > 0 && value <= 100) {
            this.quality = value;
        }
    }

    @Input('image-format')
    set imageFormat(type: ImageFormat) {
        if ((/^(gif|jpe?g|jpg|tiff|png|webp|bmp)$/i).test(type)) {
            this.format = type;
            this.isFormatDefined = true;
        }
    }

    @Input('image-url')
    set imageUrl(url: string) {
        if (url) {
            this.url = url;
        }
    }

    @Input('image-base64')
    set imageBase64(base64: string) {
        if (base64 && (/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/).test(base64)) {
            this.imageUrl = base64;
            if (!this.isFormatDefined) {
                this.format = ((base64.split(',')[0]).split(';')[0]).split(':')[1].split('/')[1];
            }
        }
    }

    @Input('change-event')
    set imageChangeEvent(event: any) {
        if (event) {
            const file = event.target.files[0];
            if (file && FileUtils.isImage(file)) {
                if (!this.isFormatDefined) {
                    this.format = event.target.files[0].type.split('/')[1];
                }

                FileUtils.readAsDataURL(file, (result: string) => this.imageUrl = result);
            }
        }
    }

    @Input('image-file')
    set imageFile(file: File) {
        if (file && FileUtils.isImage(file)) {
            if (!this.isFormatDefined) {
                this.format = file.type.split('/')[1];
            }

            FileUtils.readAsDataURL(file, (result: string) => this.imageUrl = result);
        }
    }

    @Output('cropped')
    cropped = new EventEmitter<ICroppedEvent>();

    // image source
    url: string;

    // cropped image format
    private format = CommonConstants.PHOTO_INPUT.DEFAULT_FORMAT;

    // cropped image quality
    private quality = CommonConstants.PHOTO_INPUT.DEFAULT_IMAGE_QUALITY;

    // is format defined manualy (not from source)
    private isFormatDefined = false;

    dragMode: CropperDragModes = CropperDragModes.Crop;

    // cropper js object
    private _cropper: Cropper;
    private get cropper(): Cropper {
        return this._cropper;
    }
    private set cropper(value) {
        this._cropper = value;     
    }

    // cropped base64 image
    public outputImage: string;

    // when image loaded
    onImageLoad(image) {
        // destroy previous cropper object
        if (this.cropper)
            this.cropper.destroy();

        this.cropper = new Cropper(image, {
            aspectRatio: this.aspectRatio,
            autoCropArea: this.cropArea,
            autoCrop: this.autoCrop,
            modal: this.mask,
            guides: this.guides,
            center: this.centerIndicator,
            viewMode: this.viewMode,
            scalable: this.scalable,
            zoomable: this.zoomable,
            cropBoxMovable: this.cropBoxMovable,
            cropBoxResizable: this.cropBoxResizable
        });
    }

    rotateRight() {
        this.cropper.rotate(CommonConstants.PHOTO_INPUT.IMAGE_ROTATE_ANGLE);
    }

    rotateLeft() {
        this.cropper.rotate(-CommonConstants.PHOTO_INPUT.IMAGE_ROTATE_ANGLE);
    }

    crop() {
        this.dragMode = CropperDragModes.Crop;
        this.cropper.setDragMode(this.dragMode);
    }

    move() {
        this.dragMode = CropperDragModes.Move;
        this.cropper.setDragMode(this.dragMode);
    }

    zoomIn() {
        this.cropper.zoom(CommonConstants.PHOTO_INPUT.ZOOM_VALUE);
    }

    zoomOut() {
        this.cropper.zoom(-CommonConstants.PHOTO_INPUT.ZOOM_VALUE);
    }

    flipH() {
        this.cropper.scaleX(-(this.cropper.getImageData().scaleX || 1));
    }

    flipV() {
        this.cropper.scaleY(-(this.cropper.getImageData().scaleY || 1));
    }

    reset() {
        this.cropper.reset();
    }

    public export() {
        let cropedImage = this.cropper.getCroppedCanvas({
            imageSmoothingEnabled: this.imageSmoothingEnabled,
            imageSmoothingQuality: this.imageSmoothingQuality
        });

        this.outputImage = cropedImage.toDataURL('image/' + this.format, this.quality);
        cropedImage.toBlob(blob => {
            this.cropped.emit({
                base64: this.outputImage,
                file: new File([blob], Date.now() + '.' + this.format, { type: 'image/' + this.format })
            });
        }, 'image/' + this.format, this.quality / 100);
    }
}