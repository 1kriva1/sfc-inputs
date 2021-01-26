import { FileInputComponent } from "./sfc-file-input.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfcInputsModule } from '../sfc-inputs.module';
import { By } from '@angular/platform-browser';
import { getHugeFile } from '../common/validators/tests/sfc-input-validator-helper';
import { StyleClass, FileInputType } from '../common/constants/common-constants';

describe('Component: FileInputComponent', () => {
    let component: FileInputComponent;
    let fixture: ComponentFixture<FileInputComponent>;
    let el: DebugElement;
    let debugFileInputEl: DebugElement;
    let debugTextInputEl: DebugElement;
    let debugLabelEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, SfcInputsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(FileInputComponent);
            el = fixture.debugElement;
            component = el.componentInstance;

            fixture.detectChanges();

            debugFileInputEl = el.query(By.css('input[type=file]'));
            debugTextInputEl = el.query(By.css('input[type=text].input-text-input'));
            debugLabelEl = el.query(By.css('div.file-path-wrapper label'));
        });
    }));

    it("FileInputComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("File Input: should exist", async(() => {
        expect(debugFileInputEl).toBeTruthy();
    }));

    it("File Input: default ID value", async(() => {
        expect(debugFileInputEl.nativeElement.id).toEqual('sfc-');
    }));

    it("File Input: defined ID value", async(() => {
        component.id = 'test-id';
        fixture.detectChanges();

        expect(debugFileInputEl.nativeElement.id).toEqual('sfc-test-id');
    }));

    it("File Input: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        let debugFileInputEl = el.query(By.css('input[type=file]:disabled'));
        expect(debugFileInputEl).toBeTruthy();
    }));

    it("File Input: change event", async(() => {
        let assertFileName = 'test.png',
            assertFileSize = 1000,
            testFile = getHugeFile(assertFileName, assertFileSize);

        debugFileInputEl.triggerEventHandler('change', {
            target: {
                target: debugFileInputEl.nativeElement, 
                files: {
                    item: function () {
                        return testFile;
                    }
                }
            }
        });

        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual(assertFileName);
        expect(fixture.nativeElement.querySelector('span.character-counter').innerText).toEqual('1000 Bytes');
    }));

    it("File Input Button: CSS classes default", async(() => {
        let fileButtonContainerEl = el.query(By.css('div.file-button'));

        expect(fileButtonContainerEl.nativeElement.classList.length).toEqual(1);
        expect(fileButtonContainerEl.nativeElement.classList.contains('file-button')).toBeTruthy();
    }));

    it("File Input Button: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        let fileButtonContainerEl = el.query(By.css('div.file-button'));

        expect(fileButtonContainerEl.attributes['disabled']).toBeTruthy();
    }));

    it("File Input Button: without icon", async(() => {
        let fileButtonEl = el.query(By.css('div.file-button span'));
        expect(fileButtonEl).toBeTruthy();
    }));

    it("File Input Button: with icon", async(() => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        let fileButtonEl = el.query(By.css('div.input-file-input span'));

        expect(fileButtonEl).toBeFalsy();
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: should add class to icon element", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains('fa')).toBeTruthy();
        expect(iconEl.classList.contains('fa-user')).toBeTruthy();
    });

    it("Text Input: should create element", async(() => {
        expect(debugTextInputEl).toBeTruthy();
    }));

    it("Text Input: default type", () => {
        expect(debugTextInputEl.nativeElement.type).toEqual('text');
    });

    it("Text Input: value not defined", async(() => {
        expect(debugTextInputEl.nativeElement.value).toEqual('');
    }));

    it("Text Input: value defined", async(() => {
        let testFile = getHugeFile('test.png', 1000);
        component.writeValue(testFile);
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual('test.png');
    }));

    it("Text Input: permanent class value", () => {
        expect(debugTextInputEl.nativeElement.classList.contains('sfc-input')).toBeTruthy();
        expect(debugTextInputEl.nativeElement.classList.contains('input-text-input')).toBeTruthy();
    });

    it("Text Input: NOT disabled", async(() => {
        expect(debugTextInputEl.nativeElement.disabled).toBeFalsy();
    }));

    it("Text Input: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.disabled).toBeTruthy();
    }));

    it("Text Input: placeholder empty value", async(() => {
        expect(debugTextInputEl.nativeElement.placeholder).toEqual('');
    }));

    it("Text Input: placeholder defined value", async(() => {
        let expectedPlaceholder = 'test placeholder';
        component._placeholder = expectedPlaceholder;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.placeholder).toEqual(expectedPlaceholder);
    }));

    it("Label: should exist", async(() => {
        expect(debugLabelEl).toBeTruthy();
    }));

    it("Label: 'for' attribute default value", async(() => {
        let expectedValue = 'sfc-';
        expect(debugLabelEl.nativeElement.htmlFor).toEqual(expectedValue);
    }));

    it("Label: 'for' attribute value", async(() => {
        let expectedValue = 'sfc-test-id';
        component.id = 'test-id';
        fixture.detectChanges();

        expect(debugLabelEl.nativeElement.htmlFor).toEqual(expectedValue);
    }));

    it("Label: html text value default", async(() => {
        expect(debugLabelEl.nativeElement.innerText).toEqual('');
    }));

    it("Label: html text value", async(() => {
        let expectedValue = 'test label';
        component.label = expectedValue;
        fixture.detectChanges();

        expect(debugLabelEl.nativeElement.innerText).toEqual(expectedValue);
    }));

    it("Label: CSS classes default", async(() => {
        expect(debugLabelEl.nativeElement.className).toEqual(StyleClass.Active);
    }));

    it("Helper text: should create element", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = 'test helper text';
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    it("Character counter: should create element", () => {
        expect(fixture.nativeElement.querySelector('span.character-counter')).toBeDefined();
    });

    it("Character counter: inner text value", () => {
        let testFile = getHugeFile('test.png', 1000);
        component.writeValue(testFile);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText).toEqual('1000 Bytes');
    });

    it("Clear Button: empty value and showClearButton is ON", async(() => {
        let debugClearBtnEl = el.query(By.css('i.clear-button'));

        expect(debugClearBtnEl).toBeFalsy();
    }));

    it("Clear Button: with value and showClearButton is ON", async(() => {
        let testFile = getHugeFile('test.png', 1000);
        component.writeValue(testFile);
        fixture.detectChanges();

        let debugClearBtnEl = el.query(By.css('i.clear-button'));

        expect(debugClearBtnEl).toBeTruthy();
        expect(debugClearBtnEl.nativeElement.classList.contains('fa')).toBeTruthy();
        expect(debugClearBtnEl.nativeElement.classList.contains('fa-times')).toBeTruthy();
    }));

    it("Clear Button: with value and showClearButton is OFF", async(() => {
        let testFile = getHugeFile('test.png', 1000),
            debugClearBtnEl = el.query(By.css('i.clear-button'));
        component.writeValue(testFile);
        component.showClearButton = false;
        fixture.detectChanges();

        expect(debugClearBtnEl).toBeFalsy();
    }));

    it("Clear Button: clear data event", async(() => {
        let testFile = getHugeFile('test.png', 1000);
        component.writeValue(testFile);
        fixture.detectChanges();

        let debugClearBtnEl = el.query(By.css('i.clear-button'));
        debugClearBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual('');
        expect(fixture.nativeElement.querySelector('span.character-counter').innerText).toEqual('');
    }));

    it("Inline File Input container: should exist", async(() => {
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        let inlineFileInputContainerEl = el.query(By.css('div.inline-input-container'));
        expect(inlineFileInputContainerEl).toBeTruthy();
    }));

    it("Inline File Input: should exist", async(() => {
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        let inlineFileInputrEl = el.query(By.css('input[type=file].inline-file-input'));

        expect(inlineFileInputrEl).toBeTruthy();
    }));

    it("Inline File Input: default ID value", async(() => {
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        let inlineFileInputrEl = el.query(By.css('input[type=file].inline-file-input'));

        expect(inlineFileInputrEl.nativeElement.id).toEqual('sfc-');
    }));

    it("Inline File Input: defined ID value", async(() => {
        component.id = 'test-id';
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        let inlineFileInputrEl = el.query(By.css('input[type=file].inline-file-input'));

        expect(inlineFileInputrEl.nativeElement.id).toEqual('sfc-test-id');
    }));

    it("Inline File Input: disabled", async(() => {
        component.disabled = true;
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        let debugInlineFileInputEl = el.query(By.css('input.inline-file-input:disabled'));
        expect(debugInlineFileInputEl).toBeTruthy();
    }));

    it("Inline File Input: label shoud exist", async(() => {
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        let debugInlineFileInputEl = el.query(By.css('input.inline-file-input'));

        expect(debugInlineFileInputEl.nativeElement.labels).toBeDefined();
        expect(debugInlineFileInputEl.nativeElement.labels.length).toEqual(1);
        expect(debugInlineFileInputEl.nativeElement.labels[0].htmlFor).toEqual(debugInlineFileInputEl.nativeElement.id);
    }));

    it("Inline Icon: should create icon element if icon value defined", () => {
        component.fileInputType = FileInputType.Inline;
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(el.query(By.css('div.inline-input-container label i.file-icon'))).toBeTruthy();
    });

    it("Inline Icon: should add class to icon element", () => {
        component.fileInputType = FileInputType.Inline;
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        let iconEl = el.query(By.css('div.inline-input-container label i.file-icon'));

        expect(iconEl).toBeDefined();
        expect(iconEl.nativeElement.classList.length).toEqual(3);
        expect(iconEl.nativeElement.classList.contains('fa')).toBeTruthy();
        expect(iconEl.nativeElement.classList.contains('fa-user')).toBeTruthy();
    });

    it("Inline Icon: default icon", () => {
        component.useDefaultIcon = true;
        component.fileInputType = FileInputType.Inline;
        component.ngOnInit();
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('div.inline-input-container label i.file-icon');

        expect(iconEl.classList.contains('fa')).toBeTruthy();
        expect(iconEl.classList.contains('fa-upload')).toBeTruthy();
    });

    it("Inline Icon: default icon when showFileName is OFF", () => {
        component.showFileName = false;
        component.fileInputType = FileInputType.Inline;
        component.ngOnInit();
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('div.inline-input-container label i.file-icon');

        expect(iconEl.classList.contains('fa')).toBeTruthy();
        expect(iconEl.classList.contains('fa-upload')).toBeTruthy();
    });

    it("Inline Icon: defined icon when showFileName is OFF, but icon defined", () => {
        component.showFileName = false;
        component.icon = 'fa fa-user';
        component.fileInputType = FileInputType.Inline;
        component.ngOnInit();
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('div.inline-input-container label i.file-icon');

        expect(iconEl.classList.contains('fa')).toBeTruthy();
        expect(iconEl.classList.contains('fa-user')).toBeTruthy();
    });

    it("Inline value: value text when showFileName is OFF", () => {
        let testFile = getHugeFile('test.png', 1000);
        component.fileInputType = FileInputType.Inline;
        component.showFileName = false;
        component.writeValue(testFile);

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-input-container label span').innerText).toEqual('');
    });

    it("Inline value: value text when showFileName is ON", () => {
        let testFile = getHugeFile('test.png', 1000);
        component.fileInputType = FileInputType.Inline;
        component.writeValue(testFile);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-input-container label span').innerText).toEqual('test.png');
    });

    it("Inline value: value text when showFileName is ON and value is empty and placeholder defined", () => {
        let assertValue = 'test placeholder';
        component.fileInputType = FileInputType.Inline;
        component._placeholder = assertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-input-container label span').innerText).toEqual(assertValue);
    });

    it("Inline value: value text when showFileName is ON and value is empty and label defined", () => {
        let assertValue = 'test label';
        component.fileInputType = FileInputType.Inline;
        component.label = assertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-input-container label span').innerText).toEqual(assertValue);
    });

    it("Inline value: value text when showFileName is ON and value is empty and placeholder/label undefined", () => {
        let assertValue = 'Choose file';
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-input-container label span').innerText).toEqual(assertValue);
    });

    it("Helper text: should create element", () => {
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-input-container span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = 'test helper text';
        component.fileInputType = FileInputType.Inline;
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-input-container span.helper-text').innerText).toEqual(helperTextAssertValue);
    });
});