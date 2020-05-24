import { HttpMethod } from '../constants/common-constants';

export interface IHttpConfig {
    url: string;
    method?: HttpMethod;
    params?: Array<any>;
    mapper?: (data: any) => any;
    updater?: (data: any, config: IHttpConfig) => any;
}