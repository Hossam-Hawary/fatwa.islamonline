import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  	searchResults:any[];
  constructor(
  	public navCtrl: NavController,
  	public cateProvider:CategoriesProvider,
    private helper:HelperProvider
   ) {
  }

 

    search(ev){
	    if(!this.searchKey) return;
	    console.log(this.searchKey)
	    this.searching = true;
	    this.cateProvider.SearchPost({search:this.searchKey}).subscribe((res:any)=>{
	        this.searching = false;
	        console.log(res)
	        this.searchResults = res.posts;
	    }, 
	    (err)=>{
	      this.helper.handleRequestError(err);
	    })
  }
  cancelSearch(ev){
    console.log("cancelSearch", ev)
    console.log(this.searchKey)
  }
  //   loadMore(infiniteScroll){
  //   if(!this.helper.isConnected()){infiniteScroll.complete(); return;}
  //       this.loadPosts(infiniteScroll);
  // }

	openPost(post){
		this.helper.createModal(PostPage, {post:post}).present();
	}

}
