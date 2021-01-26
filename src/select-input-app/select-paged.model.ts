import ISelectModel from './select.model';

export default interface ISelectPagedModel {
    Total: number
    CurrentPage: number
    TotalPages: number
    HasPrevious: boolean
    HasNext: boolean
    Items: ISelectModel[]
}