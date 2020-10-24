<h1>Intro</h1>
<p>This library is used to frame a common response for an API</p>
<p>There are two methods in this library for success and error scenario respectively:</p>
<ul>
<li>formSuccessResponse</li>
<li>formErrorResponse</li>
</ul>
<p>Find below the input requirements of the above mentioned methods:</p>
<ul>
<li>formSuccessResponse
<div><h5>INPUT:</h5>
It requires 3 inputs to be passed in this method as mentioned below:
a. Response of the API of type any.
b. Request object of the API
c. Total number of records of our response of type number.</div>
<div><h5>OUTPUT:</h5></div>
</li>
<li>formErrorResponse
<div><h5>INPUT:</h5>
It requires 2 inputs to be passed in this method as mentioned below:
a. Request object of the API.
b. Error received from the API.<div>
<div><h5>OUTPUT:</h5></div>
</li>
<ul>
<h1>How to use?</h1>
<h5>Installation</h5>
npm i common_response_lib
<h5>Usage</h5>
<ul>
<li>Import this in the service we want to use: 
import { ResponseHandlerService } from 'common-response_lib';</li>

<li>Code Implementation Example for success response
<code>@Injectable()
export class AppService {
  constructor(private responseService: ResponseHandlerService) { }
  getHello(req): any {
     return this.responseService.formSuccessResponse('Hello',req, 0);
  }
}
</code>
</li>
<ul>
<h1>Stay in touch</h1>
<p>Author: snehaagarwal625@gmail.com</p>