import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http';



@Injectable()
export class ApiProvider {
	 apiUrl: string = 'https://fatwa.islamonline.net/api/';

  constructor( private http: HTTP) {
  }

    get(endpoint: string, params?: any) {

    return this.http.get(this.apiUrl + endpoint,params,{});
  }

}
