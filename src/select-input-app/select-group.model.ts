import ISelectModel from './select.model';

export default interface ISelectGroupModel {
    GroupId: number
    GroupValue: string
    Options: Array<ISelectModel>
}