import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesProvider } from '../../providers/categories/categories'
import { HelperProvider } from '../../providers/helper/helper'
import { PostPage } from '../../pages/post/post'
import { Events } from 'ionic-angular';

/**
 * Generated class for the SearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {
  @Output() startSearching = new EventEmitter<any>();
  @Output() endSearching = new EventEmitter<any>();
	 active:boolean;

	searchKey:string;
  	searching: boolean = false;
  	searchResults:any[]=[];
    nextPage:number = 2;
    countTotal:number = 1;
    

  constructor( 	public cateProvider:CategoriesProvider,
    private helper:HelperProvider,  private event:Events) {
  	this.event.subscribe('closeSearch', () => {
		this.resetValues();
	});
  }



    search(ev){
	  if(!this.searchKey) return;
      if(!this.helper.isConnected()){this.helper.displayConnectionError(); return;}
	    this.searching = this.active = true;
      this.nextPage = 2;
	    this.cateProvider.SearchPost({search:this.searchKey, count:15}).then((res:any)=>{
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
      this.cateProvider.SearchPost({search:this.searchKey, count:15, page:this.nextPage}).then((res:any)=>{
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
	startSearch(){
		this.startSearching.emit();
	}

	close(){
		this.resetValues();
		this.endSearching.emit();
	}

	resetValues(){
		this.active = false;
		this.searchKey = ''
		this.searching=false;
	  	this.searchResults=[];
	    this.nextPage = 2;
	    this.countTotal = 1;
	}
}
