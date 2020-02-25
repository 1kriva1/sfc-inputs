import { Injectable } from '@angular/core';  
import { CommonConstants } from '../constants/common-constants';
  
@Injectable()  
export class UIUtils {  

    private readonly NOT_FOUND_INDEX = -1;

    public getCssLikePx(value: number): string {
        return value + CommonConstants.CSS_PIXELS;
    }

}