import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import RadioButtonService from './radio-button.service';
import IRadioButtonModel from './radio-button.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SfcValidators } from 'sfc-inputs';

@Component({
    selector: 'radio-buttons-input-app',
    templateUrl: './radio-buttons-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './radio-buttons-input.component.css'
    ]
})
export class RadioButtonsInputAppComponent extends BaseAppInputComponent {
    // static data
    public data: any[];

    public dataIcons: any[];

    public dataMix: any[];

    public dataItemDisabled: any[];

    public dataMixItemDisabled: any[];

    public dataItemDefault: any[];

    // async data
    public $httpData: Observable<any[]>;

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute, private radioButtonService: RadioButtonService) {
        super(formBuilder, router, activatedRoute);
    }

    ngOnInit() {
        this.getRadioButtonsObservables();

        this.data = [{
            key: 1,
            value: "option asdasdasdasd 1"
        },
        {
            key: 2,
            value: "option 2"
        },
        {
            key: 3,
            value: "option 3"
        },
        {
            key: 4,
            value: "option aaa 4"
        }];

        this.dataIcons = [{
            key: 1,
            value: "option 1",
            icon: "fa fa-superpowers"
        },
        {
            key: 2,
            value: "option 2",
            icon: "fa fa-microchip"
        },
        {
            key: 3,
            value: "option 3",
            icon: "fa fa-adjust"
        },
        {
            key: 4,
            value: "option 4",
            icon: "fa fa-user-o"
        }];

        this.dataMix = [{
            key: 1,
            value: "option 1"
        },
        {
            key: 2,
            value: "option 2",
            icon: "fa fa-microchips"
        },
        {
            key: 3,
            value: "option 3",
            icon: "fa fa-adjust"
        },
        {
            key: 4,
            value: "option 4"
        }];

        this.dataItemDisabled = [{
            key: 1,
            value: "option 1",
            isDisabled: true
        },
        {
            key: 2,
            value: "option 2"
        },
        {
            key: 3,
            value: "option 3",
            isDisabled: true
        },
        {
            key: 4,
            value: "option 4"
        }];

        this.dataMixItemDisabled = [{
            key: 1,
            value: "option 1",
            isDisabled: true
        },
        {
            key: 2,
            value: "option 2",
            icon: "fa fa-microchip"
        },
        {
            key: 3,
            value: "option 3",
            icon: "fa fa-adjust",
            isDisabled: true
        },
        {
            key: 4,
            value: "option 4"
        }];

        this.dataItemDefault = [{
            key: 1,
            value: "option 1",
            isDefault: false
        },
        {
            key: 2,
            value: "option 2"
        },
        {
            key: 3,
            value: "option 3",
            isDefault: true
        },
        {
            key: 4,
            value: "option 4"
        }];

        this.customInputForm = this.formBuilder.group(
            {
                inputRadioNull: [null],
                inputRadioWithIcon: [3],
                inputRadioWithIconHelper: [null],
                inputRadioNullDisabled: [{
                    value: 2,
                    disabled: true
                }, []],
                inputRadioWithIconDisabled: [{
                    value: 4,
                    disabled: true
                }, []],
                inputRadioWithIconHelperDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputRadioNullIcons: [null],
                inputRadioWithIconIcons: [2],
                inputRadioWithIconHelperIcons: [null],
                inputRadioNullMix: [null],
                inputRadioWithIconMix: [4],
                inputRadioWithIconHelperMix: [null],
                inputRadioNullMixDisabled: [{
                    value: 2,
                    disabled: true
                }, []],
                inputRadioWithIconMixDisabled: [{
                    value: 3,
                    disabled: true
                }, []],
                inputRadioWithIconHelperMixDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputRadioItemDisabled: [null],
                inputRadioMixItemDisabled: [null],
                inputRadioMixItemValueDisabled: [3],
                inputRadioItemDefault: [null],
                inputRadioItemDefaultValue: [2],
                inputRadioItemDefaultValueIcon: [3],
                inputRadioValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioValueValidValidation: [2, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioValueInvalidValidation: [3, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioValidationCustomMessage: [null, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioValueValidValidationCustomMessage: [2, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioValueInvalidValidationCustomMessage: [3, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioHorizontal: [null],
                inputRadioHorizontalIcon: [4],
                inputRadioHorizontalIconHelper: [null],
                inputRadioHorizontalDisabled: [{
                    value: 2,
                    disabled: true
                }, []],
                inputRadioHorizontalIconDisabled: [{
                    value: 3,
                    disabled: true
                }, []],
                inputRadioHorizontalIconHelperDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputRadioHorizontalNullIcons: [1],
                inputRadioHorizontalWithIconIcons: [null],
                inputRadioHorizontalWithIconHelperIcons: [3],
                inputRadioHorizontalNullMix: [1],
                inputRadioHorizontalWithIconMix: [null],
                inputRadioHorizontalWithIconHelperMix: [3],
                inputRadioHorizontalNullMixDisabled: [{
                    value: 2,
                    disabled: true
                }, []],
                inputRadioHorizontalWithIconMixDisabled: [{
                    value: 3,
                    disabled: true
                }, []],
                inputRadioHorizontalWithIconHelperMixDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputRadioHorizontalItemDisabled: [null],
                inputRadioHorizontalMixItemDisabled: [null],
                inputRadioHorizontalMixItemValueDisabled: [3],
                inputRadioHorizontalItemDefault: [null],
                inputRadioHorizontalItemDefaultValue: [2],
                inputRadioHorizontalItemDefaultValueIcon: [3],
                inputRadioHorizontalValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioHorizontalValueValidValidation: [2, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioHorizontalValueInvalidValidation: [3, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioHorizontalValidationCustomMessage: [null, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioHorizontalValueValidValidationCustomMessage: [2, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioHorizontalValueInvalidValidationCustomMessage: [3, {
                    validators: [SfcValidators.EqualOrInclude(2)]
                }],
                inputRadioObservable: [null],
                inputRadioObservableValue: [5],
                inputRadioObservableValiadation: [null, {
                    validators: [SfcValidators.EqualOrInclude(4)]
                }],
                inputRadioObservableHorizontal: [null],
                inputRadioObservableValueHorizontal: [5],
                inputRadioObservableValiadationHorizontal: [null, {
                    validators: [SfcValidators.EqualOrInclude(4)]
                }],
            }
        );
    }

    private getRadioButtonsObservables(): void {
        this.$httpData = this.radioButtonService.getRadioButtons().pipe(map(site => {
            return site.map((s: IRadioButtonModel) => { return { key: s.Id, value: s.Value, icon: s.Icon, isDefault: s.IsDefault, isDisabled: s.IsDisabled } });
        }));
    }
}