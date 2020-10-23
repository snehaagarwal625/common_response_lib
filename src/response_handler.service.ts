import { HttpStatus, Injectable } from '@nestjs/common';
import { IResponse } from './model/response.model'
@Injectable()
export class ResponseHandlerService {
  public formSuccessResponse(res: any, req: any, totalRecords?: number) {
    if (req.raw && req.raw.method) {
      switch (req.raw.method) {
        case 'GET':
          const response: IResponse = this.GetBaseResponse(true, req, res, HttpStatus.OK, "GET operation successfully completed");
          if (res && res.length) {
            response.metadata.context['number_of_results'] = res.length;
          }
          if (req.query) {
            this.SetOptionalQueryParams(req, response);
            if (req.query.count === 'true') {
              response.metadata.context['total number of records'] = totalRecords;
            }
            if (req.query.page) {
              delete response.metadata.context['page'];
              response.metadata.context['current_page'] = req.query['page'];
              response.metadata.links['previous page'] =
                (req.query.page > 0) ?
                  req.raw.originalurl.replace('page=' + req.query['page'], 'page=' + (Number(req.query['page']) - 1)) : null;
              response.metadata.links['next_page'] =
                req.raw.originalurl.replace('page=' + req.query['page'], 'page=' + (Number(req.query['page']) + 1));
            }
          }
          return response;
        case 'POST':
          return this.GetResponse(req, res, HttpStatus.CREATED, 'Successfully Added');
        case 'PATCH':
        case 'PUT':
          return this.GetResponse(req, res, HttpStatus.OK, "Successfully Updated");
        case 'DELETE':
          return this.GetResponse(req, res, HttpStatus.OK, "Successfully Deleted");
        default:
          break;
      }
    }
  }


  public formErrorResponse(req: any, err: any) {
    const errorCode = err.status ? err.status : (err.statusCode ? err.statusCode : HttpStatus.INTERNAL_SERVER_ERROR);
    const response: IResponse = this.GetBaseResponse(false, req, [], errorCode, err.message);
    if (req.raw && req.raw.method) {
      if (req.raw.method === 'GET') {
        response.metadata.context['number_of_results'] = 0;
        if (req.query) {
          this.SetOptionalQueryParams(req, response);
          if (req.query.page) {
            delete response.metadata.context['page'];
            response.metadata.context['current_page'] = req.query['page'];
          }
        }
      }
    }
    return response;
  }

  private GetResponse(req: any, res: any, statusCode: number, message: string) {
    const response: IResponse = this.GetBaseResponse(true, req, res, statusCode, message);
    if (req.query) {
      this.SetOptionalQueryParams(req, response);
    }
    return response;
  }

  private SetOptionalQueryParams(req: any, response: IResponse) {
    Object.keys(req.query).forEach(element => {
      response.metadata.context[`${element}`] = req.query[element];

    });
  }

  private GetBaseResponse(success: boolean, req: any, res: any, status: number, message: string): IResponse {
    return {
      metadata: {
        context: {
          success,
          status,
          message,
        },
        links: {
          self: (req.raw && req.raw.originalUrl) ? req.raw.originalurl : '',
        },
      },
      results: res,
    };
  }
}
