import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { ListPostsPage } from '../list-posts/list-posts'


@Component({
  selector: 'page-sub-categories',
  templateUrl: 'sub-categories.html',
})

export class SubCategoriesPage {
mainCategory:any
subCategories:any[]=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private cateProvider:CategoriesProvider) {
  	this.mainCategory = navParams.get('category');
  }

  ngOnInit(){
  	    this.cateProvider.queryCate({parent:this.mainCategory.id}).subscribe((res:any)=>{
  	 	this.subCategories = res.categories;
  	})

  }

  getPosts(category){
  	this.navCtrl.push(ListPostsPage, {category:category})
  }

}
