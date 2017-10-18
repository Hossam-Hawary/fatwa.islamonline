import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { SubCategoriesPage } from '../sub-categories/sub-categories'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	categories:any = [];

  constructor( public navCtrl: NavController, cateProvider:CategoriesProvider) {
  	 cateProvider.queryCate({parent:'0'}).subscribe((res:any)=>{
  	 	this.categories = res.categories.filter((category) => { return !category.parent })
  	})
  }

  getSubCategories(category){
	  this.navCtrl.push(SubCategoriesPage, {category:category})
  }

}
