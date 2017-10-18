import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { PostPage } from '../post/post'



@Component({
  selector: 'page-list-posts',
  templateUrl: 'list-posts.html',
})
export class ListPostsPage {
	category:any
	posts:any[]=[];
	totalPages:number = 1;
	page:number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private cateProvider:CategoriesProvider) {
  	  	this.category = navParams.get('category');
  }

  ngOnInit(){
  	    this.cateProvider.queryPosts({category_id:this.category.id, count:30, page:this.page})
  	    .subscribe((res:any)=>{
  	 	this.posts = res.posts
  	 	this.totalPages = res.pages;
  	})

  }
	openPost(post){
		this.navCtrl.push(PostPage, {post:post})
	}

}
