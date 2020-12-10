import { Observable } from 'rxjs';

export interface IPageable<T> {
    loader: (parameters: any) => Observable<T>;
    onLoadMore(): void;
    updateData(data: T): void;
}