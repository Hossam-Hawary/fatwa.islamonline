import { Injectable } from '@angular/core';
// import { ModalController} from 'ionic-angular';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {

  constructor(public api: ApiProvider) {
  }

   queryCate(params?: any) {
	  return this.api.get('get_category_index/', params)	   
  }
 
   queryPosts(params?: any) {
	   let seq = this.api.get('get_category_posts/', params)
	   return seq;
  }
   queryPost(params?: any) {
	   return this.api.get('get_post/', params);
  }
  
   SearchPost(params?: any) {
	   return this.api.get('get_search_results/', params)
  }

}
