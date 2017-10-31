import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { HelperProvider } from '../../providers/helper/helper'
import { PostPage } from '../post/post'

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
	  searchKey:string;
  	searching: boolean = false;
  	searchResults:any[]=[];
    nextPage:number = 2;
    countTotal:number = 1;
  constructor(
  	public cateProvider:CategoriesProvider,
    private helper:HelperProvider,
    public viewCtrl: ViewController
   ) {
  }

 

    search(ev){
	    if(!this.searchKey) return;
      if(!this.helper.isConnected()){this.helper.displayConnectionError(); return;}
	    this.searching = true;
      this.nextPage = 2;
	    this.cateProvider.SearchPost({search:this.searchKey, count:10}).then((res:any)=>{
          let data = JSON.parse(res.data)
	        this.searching = false;
	        this.searchResults = data.posts;
          this.countTotal = data.count_total
	    }).catch(err => {
      this.helper.handleRequestError(err);
    })
  }

    loadMore(infiniteScroll){
    if(!this.helper.isConnected()){infiniteScroll.complete(); return;}
      this.cateProvider.SearchPost({search:this.searchKey, count:10, page:this.nextPage}).then((res:any)=>{
          let data = JSON.parse(res.data)
          this.searchResults.push( ...data.posts);
          infiniteScroll.complete();
          this.nextPage++
      }).catch(err => {
        this.helper.handleRequestError(err);
      })
    }

	openPost(post){
		this.helper.createModal(PostPage, {post:post}).present();
	}
    close() {
     this.viewCtrl.dismiss();
   }

}
