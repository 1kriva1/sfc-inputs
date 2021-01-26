export default interface IAutoCompletePagedModel {
    Total: number
    CurrentPage: number
    TotalPages: number
    HasPrevious: boolean
    HasNext: boolean
    Items: any[]
}