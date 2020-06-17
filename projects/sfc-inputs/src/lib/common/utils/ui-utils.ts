import { Injectable } from '@angular/core';
import { CommonConstants } from '../constants/common-constants';

@Injectable()
export class UIUtils {

    public static getCssLikePx(value: number): string {
        return value + CommonConstants.CSS_PIXELS;
    }

    public static getValueFromCssLikePx(value: string): number {
        return +value.replace(CommonConstants.CSS_PIXELS, '');
    }
}