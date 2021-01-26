import { ElementRef, Injectable } from '@angular/core';
import { CommonConstants } from '../constants/common-constants';
import { CommonUtils } from './common-utils';

// @dynamic
@Injectable()
export class UIUtils {

    public static getCssLikePx(value: number): string {
        return value + CommonConstants.CSS_PIXELS;
    }

    public static getValueFromCssLikePx(value: string): number {
        return +value.replace(CommonConstants.CSS_PIXELS, '');
    }

    public static addClasses(element: HTMLElement, ...classNames: Array<string>): void {
        if (CommonUtils.isDefined(element)) {
            classNames.forEach((className) => element.classList.add(className));
        }
    }

    public static removeClasses(element: HTMLElement, ...classNames: Array<string>): void {
        if (CommonUtils.isDefined(element)) {
            classNames.forEach((className) => element.classList.remove(className));
        }
    }
}