import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
	 apiUrl: string = 'https://fatwa.islamonline.net/api/';

  constructor(public http: HttpClient) {
  }

    get(endpoint: string, params?: any) {
    // Support easy query params for GET requests
    if (params) {
              endpoint += '?'
      for (let k in params) {
        endpoint += k+"="+params[k]+'&'
      }
    }

    return this.http.get(this.apiUrl + endpoint);
  }

}
