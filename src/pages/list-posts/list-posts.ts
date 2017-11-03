import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { PostPage } from '../post/post'
import {HelperProvider} from '../../providers/helper/helper'



@Component({
  selector: 'page-list-posts',
  templateUrl: 'list-posts.html',
})
export class ListPostsPage {
  category:any
  activeCategory:any
  posts:any[]=[];
  isOdd:boolean;
  arrays:any[]=[]
	totalPages:number = 1;
	nextPage:number = 1;
  searching:boolean;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private cateProvider:CategoriesProvider, private helper:HelperProvider) {
  	  	this.category = this.activeCategory = navParams.get('category');
  }

  ngOnInit(){
     this.helper.showSpinner();
     this.loadPosts();
     this.loadSubCate();
  }

  loadPosts(infiniteScroll?){
    this.cateProvider.queryPosts({category_id:this.activeCategory.id, count:50, page:this.nextPage})
    .then((res:any)=>{
        let data = JSON.parse(res.data)
        this.posts.push(...data.posts)
        this.totalPages = data.pages; 
        if(infiniteScroll) infiniteScroll.complete();
        this.nextPage++;
        this.helper.hideSpinner();
    }).catch(err => {
      this.helper.handleRequestError(err);
    })
  }

  loadSubCate(){
   this.cateProvider.queryCate({parent:this.category.id}).then((res:any)=>{
    let data = JSON.parse(res.data)
    if(!data.categories.length) return;
    let all = JSON.parse( JSON.stringify(this.category))
    all.title=this.helper.translate('ALL')
    data.categories.splice(0, 0, all)
   this.isOdd = (data.categories.length % 2) == 1
   let size = 4;
   while (data.categories.length ) this.arrays.push(data.categories.splice(0, size));
    }).catch(err => {
      this.helper.handleRequestError(err);
    })
  }

  switchCate(category){
    this.helper.showSpinner();
    this.nextPage = 1
    this.posts = [];
    this.activeCategory = category;
    this.loadPosts();
  }

  loadMore(infiniteScroll){
    if(!this.helper.isConnected()){infiniteScroll.complete(); return;}
        this.loadPosts(infiniteScroll);
  }

	openPost(post){
    this.helper.createModal(PostPage, {post:post}).present();
	}
  startSearch(){
      this.searching = true;
  }
  endSearch(){
      this.content.scrollToTop();
      this.searching = false;
      this.helper.closeSearch();
  }


}
