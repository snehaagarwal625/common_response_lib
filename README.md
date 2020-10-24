<h1>Intro</h1>
<p>This library is used to frame a coomon response for an API</p>
There are two methods in this library for success and error scenario respectively:
1. formSuccessResponse
2. formErrorResponse

Find below the input requirements of the above mentioned methods:
1. formSuccessResponse:
INPUT: It requires 3 inputs to be passed in this method as mentioned below:
a. Response of the API of type any.
b. Request object of the API
c. Total number of records of our response of type number.
OUTPUT:


2. formErrorResponse:
INPUT: It requires 2 inputs to be passed in this method as mentioned below:
a. Request object of the API.
b. Error received from the API.
OUTPUT:


<h1>How to use?</h1>
Installation: npm i common_response_lib
Usage:
1. Import this in the service we want to use: 
import { ResponseHandlerService } from 'common-response_lib';
2. Code Implementation Example for success response
@Injectable()
export class AppService {
  constructor(private responseService: ResponseHandlerService) { }
  getHello(req): any {
     return this.responseService.formSuccessResponse('Hello',req, 0);
  }
}