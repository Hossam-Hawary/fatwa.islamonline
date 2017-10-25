import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { PostPage } from '../post/post'
import {HelperProvider} from '../../providers/helper/helper'
import { SearchPage } from '../search/search'



@Component({
  selector: 'page-list-posts',
  templateUrl: 'list-posts.html',
})
export class ListPostsPage {
  category:any
  activeCategory:any
  posts:any[]=[];
  subCategories:any[]=[];
	totalPages:number = 1;
	nextPage:number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private cateProvider:CategoriesProvider, private helper:HelperProvider) {
  	  	this.category = this.activeCategory = navParams.get('category');
  }

  ngOnInit(){
     this.helper.showSpinner();
     this.loadPosts();
     this.loadSubCate();
  }

  loadPosts( infiniteScroll?){
    this.cateProvider.queryPosts({category_id:this.activeCategory.id, count:50, page:this.nextPage})
    .subscribe((res:any)=>{
        this.posts.push(...res.posts)
        this.totalPages = res.pages; 
        this.nextPage++;
        if(infiniteScroll) infiniteScroll.complete();
        this.helper.hideSpinner();
    },(err)=>{
      this.helper.handleRequestError(err);
    })
  }

  loadSubCate(){
   this.cateProvider.queryCate({parent:this.category.id}).subscribe((res:any)=>{
   this.subCategories = res.categories;
    }, 
    (err)=>{
      this.helper.handleRequestError(err);
    })
  }

  switchCate(category){
    this.nextPage = 1
    this.posts = [];
    this.activeCategory = category;
    this.loadPosts(category);
  }

  loadMore(infiniteScroll){
    if(!this.helper.isConnected()){infiniteScroll.complete(); return;}
        this.loadPosts(infiniteScroll);
  }

	openPost(post){
    this.helper.createModal(PostPage, {post:post}).present();
	}
     openSearch(){
      this.helper.createModal(SearchPage).present();
    }

}
