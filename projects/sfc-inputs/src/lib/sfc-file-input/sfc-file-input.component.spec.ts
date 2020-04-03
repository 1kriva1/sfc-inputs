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

    it("Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("File Input: should exist", async(() => {
        expect(debugFileInputEl).toBeTruthy();
    }));

    it("File Input: default ID value", async(() => {
        expect(debugFileInputEl.nativeElement.id).toEqual("sfc-");
    }));

    it("File Input: defined ID value", async(() => {
        component.id = "test-id";
        fixture.detectChanges();

        expect(debugFileInputEl.nativeElement.id).toEqual("sfc-test-id");
    }));

    it("File Input: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        let debugFileInputEl = el.query(By.css('input[type=file]:disabled'));
        expect(debugFileInputEl).toBeTruthy();
    }));

    it("File Input: change event", async(() => {
        let assertFileName = "test.png",
            assertFileSize = 1000,
            testFile = getHugeFile(assertFileName, assertFileSize);

        debugFileInputEl.triggerEventHandler('change', {
            target: {
                target: debugFileInputEl.nativeElement, files: {
                    item: function () {
                        return testFile;
                    }
                }
            }
        });

        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual(assertFileName);
        expect(component.fileName).toEqual(assertFileName);
        expect(component.fileSize).toEqual(assertFileSize + " Bytes");
    }));

    it("File Input Button: CSS classes default", async(() => {
        let fileButtonContainerEl = el.query(By.css('div.input-file-input'));

        expect(fileButtonContainerEl.nativeElement.classList.length).toEqual(2);
        expect(fileButtonContainerEl.nativeElement.classList.contains("fileBtn")).toBeTruthy();
    }));

    it("File Input Button: CSS classes default with icon", async(() => {
        component.icon = "fa fa-user";
        fixture.detectChanges();
        let fileButtonContainerEl = el.query(By.css('div.input-file-input'));

        expect(fileButtonContainerEl.nativeElement.classList.length).toEqual(1);
        expect(fileButtonContainerEl.nativeElement.classList.contains("fileBtn")).toBeFalsy();
    }));

    it("File Input Button: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        let fileButtonContainerEl = el.query(By.css('div.input-file-input'));

        expect(fileButtonContainerEl.attributes["disabled"]).toBeTruthy();
    }));

    it("File Input Button: without icon", async(() => {
        let fileButtonEl = el.query(By.css('div.input-file-input span'));
        expect(fileButtonEl).toBeTruthy();
    }));

    it("File Input Button: with icon", async(() => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        let fileButtonEl = el.query(By.css('div.input-file-input span'));

        expect(fileButtonEl).toBeFalsy();
    }));

    it("Label: should exist", async(() => {
        expect(debugLabelEl).toBeTruthy();
    }));

    it("Label: 'for' attribute default value", async(() => {
        let expectedValue = "sfc-";
        expect(debugLabelEl.nativeElement.htmlFor).toEqual(expectedValue);
    }));

    it("Label: 'for' attribute value", async(() => {
        let expectedValue = "sfc-test-id";
        component.id = "test-id";
        fixture.detectChanges();

        expect(debugLabelEl.nativeElement.htmlFor).toEqual(expectedValue);
    }));

    it("Label: html text value default", async(() => {
        expect(debugLabelEl.nativeElement.innerText).toEqual("");
    }));

    it("Label: html text value", async(() => {
        let expectedValue = "test label";
        component.label = expectedValue;
        fixture.detectChanges();

        expect(debugLabelEl.nativeElement.innerText).toEqual(expectedValue);
    }));

    it("Label: CSS classes default", async(() => {
        expect(debugLabelEl.nativeElement.className).toEqual(StyleClass.Active);
    }));

    it("Label: CSS classes with icon", async(() => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(debugLabelEl.nativeElement.className.indexOf(StyleClass.WithIcon)).not.toEqual(-1);
    }));

    it("Helper text: should create element", () => {
        expect(fixture.nativeElement.querySelector('span.helper-text')).toBeDefined();
    });

    it("Helper text: inner text value", () => {
        const helperTextAssertValue = "test helper text";
        component._helperText = helperTextAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });

    it("Character counter: should create element", () => {
        expect(fixture.nativeElement.querySelector('span.character-counter')).toBeDefined();
    });

    it("Character counter: inner text value", () => {
        let testFile = getHugeFile("test.png", 1000);
        component.writeValue(testFile);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.character-counter').innerText).toEqual("1000 Bytes");
    });

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: CSS classes default", () => {
        component.icon = "fa fa-user";
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains("fa")).toBeTruthy();
        expect(iconEl.classList.contains("fa-user")).toBeTruthy();
    });

    it("Text Input: should create element", async(() => {
        expect(debugTextInputEl).toBeTruthy();
    }));

    it("Text Input: value not defined", async(() => {
        expect(debugTextInputEl.nativeElement.value).toEqual("");
    }));

    it("Text Input: value defined", async(() => {
        let testFile = getHugeFile("test.png", 1000);
        component.writeValue(testFile);
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual("test.png");
    }));

    it("Text Input: NOT disabled", async(() => {
        expect(debugTextInputEl.nativeElement.disabled).toBeFalsy();
    }));

    it("Text Input: disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.disabled).toBeTruthy();
    }));

    it("Placeholder: empty value", async(() => {
        expect(debugTextInputEl.nativeElement.placeholder).toEqual("");
    }));

    it("Placeholder: defined value", async(() => {
        let expectedPlaceholder = "test placeholder"
        component._placeholder = expectedPlaceholder;
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.placeholder).toEqual(expectedPlaceholder);
    }));

    it("Clear Button: empty value and showClearButton is ON", async(() => {
        let debugClearBtnEl = el.query(By.css('i.clearBtn'));
        expect(debugClearBtnEl).toBeFalsy();
    }));

    it("Clear Button: with value and showClearButton is ON", async(() => {
        let testFile = getHugeFile("test.png", 1000);
        component.writeValue(testFile);
        fixture.detectChanges();

        let debugClearBtnEl = el.query(By.css('i.clearBtn'));

        expect(debugClearBtnEl).toBeTruthy();
    }));

    it("Clear Button: with value and showClearButton is OFF", async(() => {
        let testFile = getHugeFile("test.png", 1000),
            debugClearBtnEl = el.query(By.css('i.clearBtn'));
        component.writeValue(testFile);
        component.showClearButton = false;
        fixture.detectChanges();

        expect(debugClearBtnEl).toBeFalsy();
    }));

    it("Clear Button: clear data", async(() => {
        let testFile = getHugeFile("test.png", 1000);
        component.writeValue(testFile);
        fixture.detectChanges();

        let debugClearBtnEl = el.query(By.css('i.clearBtn'));
        debugClearBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(debugTextInputEl.nativeElement.value).toEqual("");
        expect(component.fileName).toBeNull();
        expect(component.fileSize).toBeNull();
    }));

    it("Inline File Input: should exist", async(() => {
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        let inlineFileInputContainerEl = el.query(By.css('div.inline-file-input'));
        expect(inlineFileInputContainerEl).toBeTruthy();
    }));

    it("Inline Icon: should create icon element if icon value defined", () => {
        component.fileInputType = FileInputType.Inline;
        component.icon = "fa fa-user";
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.file-icon')).toBeTruthy();
    });

    it("Inline: value text when showFileName is OFF", () => {
        let testFile = getHugeFile("test.png", 1000);
        component.fileInputType = FileInputType.Inline;
        component.showFileName = false;
        component.writeValue(testFile);

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-file-input label span').innerText).toEqual("");
    });

    it("Inline: value text when showFileName is ON", () => {
        let testFile = getHugeFile("test.png", 1000);
        component.fileInputType = FileInputType.Inline;
        component.writeValue(testFile);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-file-input label span').innerText).toEqual("test.png");
    });

    it("Inline: value text when showFileName is ON and value is empty and placeholder defined", () => {
        let assertValue = "test placeholder";
        component.fileInputType = FileInputType.Inline;
        component._placeholder = assertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-file-input label span').innerText).toEqual(assertValue);
    });

    it("Inline: value text when showFileName is ON and value is empty and label defined", () => {
        let assertValue = "test label";
        component.fileInputType = FileInputType.Inline;
        component.label = assertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-file-input label span').innerText).toEqual(assertValue);
    });

    it("Inline: value text when showFileName is ON and value is empty and placeholder/label undefined", () => {
        let assertValue = "Choose file";
        component.fileInputType = FileInputType.Inline;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.inline-file-input label span').innerText).toEqual(assertValue);
    });

    it("Inline: default icon", () => {
        component.useDefaultIcon = true;
        component.fileInputType = FileInputType.Inline;
        component.ngOnInit();
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.file-icon');

        expect(iconEl.classList.contains("fa")).toBeTruthy();
        expect(iconEl.classList.contains("fa-upload")).toBeTruthy();
    });

    it("Inline: default icon when showFileName is OFF", () => {
        component.showFileName = false;
        component.fileInputType = FileInputType.Inline;
        component.ngOnInit();
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.file-icon');

        expect(iconEl.classList.contains("fa")).toBeTruthy();
        expect(iconEl.classList.contains("fa-upload")).toBeTruthy();
    });
});