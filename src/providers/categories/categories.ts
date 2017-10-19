import { Injectable } from '@angular/core';

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
	   let seq = this.api.get('get_category_index/', params)
	   return seq;
  }
 
   queryPosts(params?: any) {
	   let seq = this.api.get('get_category_posts/', params)
	   return seq;
  }
   queryPost(params?: any) {
	   let seq = this.api.get('get_post/', params);
	   return seq;
  }
  
   SearchPost(params?: any) {
	   let seq = this.api.get('get_search_results/', params)
	   return seq;
  }
//get_category_index/
//get_category_index/?parent=49
//get_category_posts/?category_id&count=18&page=2
//get_posts?page
//get_post/?post_id
//get_search_results &search=cxcxc
}
