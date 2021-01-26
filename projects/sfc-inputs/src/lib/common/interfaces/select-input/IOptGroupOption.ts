import ISelectData from './ISelectData';

export default interface IOptGroupOption extends ISelectData {
    groupKey?: any;    
    isOptGroup?: boolean;
    isOptGroupOption?: boolean;
}
