export interface IResponse {
    metadata: IMetaData;
    results: any[];
    }
interface IMetaData { 
    context: IContext;
    links: ILinks;    
}
interface IContext{    
    success: boolean;
    status: number;
    message: string;
}
interface ILinks { 
    self: string;
}