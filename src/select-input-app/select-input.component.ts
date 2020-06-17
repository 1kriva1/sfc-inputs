import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SfcValidators from 'projects/sfc-inputs/src/lib/common/validators/sfc-input.validators';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import ISelectData from 'projects/sfc-inputs/src/lib/common/interfaces/ISelectData';
import SelectData from 'projects/sfc-inputs/src/lib/common/interfaces/ISelectData';
import ISelectDataGroup from 'projects/sfc-inputs/src/lib/common/interfaces/ISelectDataGroup';
import { LoaderService } from 'projects/sfc-inputs/src/lib/common/components/loader/base/sfc-loader.service';
import SelectService from './select.service';
import { map, tap } from 'rxjs/operators';
import ISelectModel from './select.model';
import ISelectGroupModel from './select-group.model';
import ISelectPagedModel from './select-paged.model';
import { IHttpConfig } from 'projects/sfc-inputs/src/lib/common/interfaces/IHttpConfig';

@Component({
    selector: 'select-input-app',
    templateUrl: './select-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './select-input.component.css'
    ]
})
export class SelectInputAppComponent {
    private customInputForm: FormGroup;
    private theme: string = "common";

    private data: ISelectData[];
    private $httpData: Observable<ISelectData[]>;
    private httpData: ISelectData[];

    private datagroup: ISelectDataGroup[];
    private $httpDataGroup: Observable<ISelectDataGroup[]>;
    private httpGroupData: ISelectDataGroup[];

    loadFuncScroll;
    loadFuncScroll1;
    loadFuncScroll2;
    loadFuncButton;
    loadFuncButton1;
    loadFuncButton2;
    private dataPaged: ISelectData[] = [];
    private $httpDataPaged: Observable<ISelectData[]>;
    private httpDataPaged: ISelectData[];
    private subject: BehaviorSubject<ISelectData[]> = new BehaviorSubject<ISelectData[]>([]);
    private loaders$: Observable<ISelectData[]> = this.subject.asObservable();

    private defaultDisplayValue: ISelectData = { value: "Choose customdefault option", key: -10, isDefault: true };

    private pageScroll = 1;
    private pageScroll1 = 1;
    private pageScroll2 = 1;
    private pageButton = 1;
    private pageButton1 = 1;
    private pageButton2 = 1;
    private size = 30;

    private httpConfig: IHttpConfig;
    private httpLoadMoreConfig: IHttpConfig;
    private httpLoadMoreConfig1: IHttpConfig;
    private httpLoadMoreConfig2: IHttpConfig;

    private httpLoadMoreButtonConfig: IHttpConfig;
    private httpLoadMoreButtonConfig1: IHttpConfig;
    private httpLoadMoreButtonConfig2: IHttpConfig;

    constructor(private formBuilder: FormBuilder, private loaderService: LoaderService, private selectService: SelectService) {
        this.loadFuncScroll = () => this.selectService.getPagedSelects(this.pageScroll, this.size).pipe(
            tap((resp: ISelectPagedModel) => {
                this.pageScroll = ++resp.CurrentPage;
            }),
            map((resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            })
        );

        this.loadFuncScroll1 = () => this.selectService.getPagedSelects(this.pageScroll1, this.size).pipe(
            tap((resp: ISelectPagedModel) => {
                this.pageScroll1 = ++resp.CurrentPage;
            }),
            map((resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            })
        );

        this.loadFuncScroll2 = () => this.selectService.getPagedSelects(this.pageScroll2, this.size).pipe(
            tap((resp: ISelectPagedModel) => {
                this.pageScroll2 = ++resp.CurrentPage;
            }),
            map((resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            })
        );

        this.loadFuncButton = () => this.selectService.getPagedSelects(this.pageButton, this.size).pipe(
            tap((resp: ISelectPagedModel) => {
                this.pageButton = ++resp.CurrentPage;
            }),
            map((resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            })
        );

        this.loadFuncButton1 = () => this.selectService.getPagedSelects(this.pageButton1, this.size).pipe(
            tap((resp: ISelectPagedModel) => {
                this.pageButton1 = ++resp.CurrentPage;
            }),
            map((resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            })
        );

        this.loadFuncButton2 = () => this.selectService.getPagedSelects(this.pageButton2, this.size).pipe(
            tap((resp: ISelectPagedModel) => {
                this.pageButton2 = ++resp.CurrentPage;
            }),
            map((resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            })
        );

        this.httpConfig = {
            url: 'http://sfc.mock.com/values/sleep/1000',
            mapper: site => {
                return site.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } });
            }
        }

        this.httpLoadMoreConfig = {

            url: 'http://sfc.mock.com/values/pagination',
            params: [{ key: "PageNumber", value: 1 }, { key: "PageSize", value: 25 }, { key: "sleep", value: 1500 }],
            mapper: (resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            },
            updater: (resp: ISelectPagedModel, config: IHttpConfig) => {
                let pageParam = config.params.find(m => m.key === 'PageNumber');
                let pageParamIndex = config.params.findIndex(m => m.key === 'PageNumber');
                pageParam.value = ++resp.CurrentPage;
                config.params[pageParamIndex] = pageParam;
            }
        }

        this.httpLoadMoreConfig1 = {

            url: 'http://sfc.mock.com/values/pagination',
            params: [{ key: "PageNumber", value: 1 }, { key: "PageSize", value: 25 }, { key: "sleep", value: 1500 }],
            mapper: (resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            },
            updater: (resp: ISelectPagedModel, config: IHttpConfig) => {
                let pageParam = config.params.find(m => m.key === 'PageNumber');
                let pageParamIndex = config.params.findIndex(m => m.key === 'PageNumber');
                pageParam.value = ++resp.CurrentPage;
                config.params[pageParamIndex] = pageParam;
            }
        }

        this.httpLoadMoreConfig2 = {

            url: 'http://sfc.mock.com/values/pagination',
            params: [{ key: "PageNumber", value: 1 }, { key: "PageSize", value: 25 }, { key: "sleep", value: 1500 }],
            mapper: (resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            },
            updater: (resp: ISelectPagedModel, config: IHttpConfig) => {
                let pageParam = config.params.find(m => m.key === 'PageNumber');
                let pageParamIndex = config.params.findIndex(m => m.key === 'PageNumber');
                pageParam.value = ++resp.CurrentPage;
                config.params[pageParamIndex] = pageParam;
            }
        }

        this.httpLoadMoreButtonConfig = {

            url: 'http://sfc.mock.com/values/pagination',
            params: [{ key: "PageNumber", value: 1 }, { key: "PageSize", value: 25 }, { key: "sleep", value: 1500 }],
            mapper: (resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            },
            updater: (resp: ISelectPagedModel, config: IHttpConfig) => {
                let pageParam = config.params.find(m => m.key === 'PageNumber');
                let pageParamIndex = config.params.findIndex(m => m.key === 'PageNumber');
                pageParam.value = ++resp.CurrentPage;
                config.params[pageParamIndex] = pageParam;
            }
        }

        this.httpLoadMoreButtonConfig1 = {

            url: 'http://sfc.mock.com/values/pagination',
            params: [{ key: "PageNumber", value: 1 }, { key: "PageSize", value: 25 }, { key: "sleep", value: 1500 }],
            mapper: (resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            },
            updater: (resp: ISelectPagedModel, config: IHttpConfig) => {
                let pageParam = config.params.find(m => m.key === 'PageNumber');
                let pageParamIndex = config.params.findIndex(m => m.key === 'PageNumber');
                pageParam.value = ++resp.CurrentPage;
                config.params[pageParamIndex] = pageParam;
            }
        }

        this.httpLoadMoreButtonConfig2 = {

            url: 'http://sfc.mock.com/values/pagination',
            params: [{ key: "PageNumber", value: 1 }, { key: "PageSize", value: 25 }, { key: "sleep", value: 1500 }],
            mapper: (resp: ISelectPagedModel) => {
                return { Items: resp.Items.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }), HasNext: resp.HasNext }
            },
            updater: (resp: ISelectPagedModel, config: IHttpConfig) => {
                let pageParam = config.params.find(m => m.key === 'PageNumber');
                let pageParamIndex = config.params.findIndex(m => m.key === 'PageNumber');
                pageParam.value = ++resp.CurrentPage;
                config.params[pageParamIndex] = pageParam;
            }
        }
    }

    ngOnInit() {

        this.getSelects();

        this.datagroup = [
            {
                key: 1,
                value: "group one",
                options: [{
                    key: 1,
                    value: "option 1",
                    imagePath: "https://mlqmtwka8c9g.i.optimole.com/gOh5_w-xKCqaYPz/w:366/h:153/q:85/dpr:2.6/https://www.competethemes.com/wp-content/uploads/2015/09/remove-link.png"
                },
                {
                    key: 2,
                    value: "option 2",
                    imagePath: "data:image/png;base64,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"
                },
                {
                    key: 3,
                    value: "option 3"
                },
                {
                    key: 4,
                    value: "option 4"
                },
                {
                    key: 5,
                    value: "option 5"
                }]
            },
            {
                key: 2,
                value: "group two",
                options: [{
                    key: 1,
                    value: "option 1 2",
                    imagePath: "https://mlqmtwka8c9g.i.optimole.com/gOh5_w-xKCqaYPz/w:366/h:153/q:85/dpr:2.6/https://www.competethemes.com/wp-content/uploads/2015/09/remove-link.png"
                },
                {
                    key: 2,
                    value: "option 2 2",
                    imagePath: "data:image/png;base64,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"
                },
                {
                    key: 3,
                    value: "option 3 2"
                },
                {
                    key: 4,
                    value: "option 4 2"
                },
                {
                    key: 5,
                    value: "option 5 2"
                }]
            }
        ];

        this.data = [{
            key: 1,
            value: "option 1",
            //imagePath: "https://mlqmtwka8c9g.i.optimole.com/gOh5_w-xKCqaYPz/w:366/h:153/q:85/dpr:2.6/https://www.competethemes.com/wp-content/uploads/2015/09/remove-link.png"
        },
        {
            key: 2,
            value: "option 2",
            //imagePath: "data:image/png;base64,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"
        },
        {
            key: 3,
            value: "option 3"
        },
        {
            key: 4,
            value: "option 4"
        },
        {
            key: 5,
            value: "option 5"
        },
        {
            key: 6,
            value: "option 6"
        },
        {
            key: 7,
            value: "option 7"
        },
        {
            key: 8,
            value: "option 8"
        },
        {
            key: 9,
            value: "option 9"
        },
        {
            key: 10,
            value: "option 10"
        },
        {
            key: 11,
            value: "option 11"
        }];

        this.customInputForm = this.formBuilder.group(
            {
                inputSelectFullEmpty: [null],
                inputSelectWithData: [null],
                inputSelectWithLabel: [null],
                inputSelectWithPlace: [null],
                inputSelectWithLabelPlace: [null],
                inputSelectCustomDefault: [null],
                inputSelectWithoutDefault: [null],
                inputSelectDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputSelectIcon: [null],
                inputSelectHelper: [null],
                inputSelectWithValue: [3],
                inputSelectSingle: [10],
                inputSelectValidation: [null, {
                    validators: [Validators.required, Validators.max(1)]
                }],
                inputSelectValidationWithValue: [2, {
                    validators: [Validators.required, Validators.min(3)]
                }],
                inputSelectValidationWithValueValid: [3, {
                    validators: [Validators.required, Validators.min(3)]
                }],
                inputSelectValidationWithValueValText: [2, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectMultipleEmpty: [null],
                inputSelectMultiple: [null],
                inputSelectultipleWithoutDefault: [null],
                inputSelectMultipleWithValue: [[1, 3]],
                inputSelectultipleDisabled: [{
                    value: [1],
                    disabled: true
                }],
                inputSelectultipleNotFound: [[6, 33]],
                inputSelectMultipleValidation: [null, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectMultipleValidationWithValue: [[1], {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectMultipleValidationWithValueInv: [[2], {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectOptGroupEmpty: [null],
                inputSelectOptGroupWithValue: [{
                    key: 2,
                    groupKey: 2
                }],
                inputSelectOptGroupWithoutDefault: [null],
                inputSelectOptGroupValiation: [null, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([{
                        key: 1,
                        groupKey: 1
                    }])]
                }],
                inputSelectOptGroupValiationRange: [null, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([{
                        key: 1,
                        groupKey: 1
                    }, {
                        key: 1,
                        groupKey: 2
                    }])]
                }],
                inputSelectOptGroupValiationText: [{
                    key: 2,
                    groupKey: 1
                }, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([{
                        key: 1,
                        groupKey: 1
                    }, {
                        key: 1,
                        groupKey: 2
                    }])]
                }],
                inputSelectHttpData: [null],
                inputSelectHttpDataValue: [34],
                inputSelectHttpDataNoObs: [null],
                inputSelectHttpDataOnInit: [null],
                inputSelectHttpDataValueOnInit: [34],
                inputSelectHttpDataNoObsOnInit: [null],
                inputSelectHttpDataMulty: [null],
                inputSelectHttpDataMultyValue: [[11, 31, 43]],
                inputSelectHttpNpobsDataMultyValue: [[11, 31, 43]],
                inputSelectHttpDataGroup: [null],
                inputSelectHttpDataGroupValue: [{
                    key: 1,
                    groupKey: 1
                }],
                inputSelectHttpNpobsDataGroupValue: [null],
                inputSelectHttpDataLoadMoreScroll: [10],
                inputSelectHttpDataLoadHttpConf: [null],
                inputSelectHttpDataValidValidation: [1, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectHttpDataInvalidValidation: [5, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectHttpPageableScroll: [null],
                inputSelectHttpPageableScrollValue: [80],
                inputSelectHttpPageableScrollValidatinInvalid: [5, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectHttpPageableButton: [null],
                inputSelectHttpPageableButtonValue: [80],
                inputSelectHttpPageableButtonValidatinInvalid: [5, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectHttpConfig: [null],
                inputSelectHttpConfigValue: [33],
                inputSelectHttpConfigValidatinInvalid: [5, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectHttpConfigPageableScroll: [null],
                inputSelectHttpConfigPageableScrollValue: [33],
                inputSelectHttpConfigPageableScrollValidationInvalid: [5, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }],
                inputSelectHttpConfigPageableButton: [null],
                inputSelectHttpConfigPageableButtonValue: [33],
                inputSelectHttpConfigPageableButtonValidationInvalid: [5, {
                    validators: [Validators.required, SfcValidators.EqualOrInclude([1, 3])]
                }]
            }
        );
    }

    private getSelects(): void {
        this.$httpData = this.selectService.getSelects().pipe(map(site => {
            return site.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } });
        }));

        this.$httpDataGroup = this.selectService.getGroupSelects().pipe(map(site => {
            return site.map((s: ISelectGroupModel) => { return { key: s.GroupId, value: s.GroupValue, options: s.Options.map((s: ISelectModel) => { return { key: s.Id, value: s.Value } }) } });
        }));
    }
}