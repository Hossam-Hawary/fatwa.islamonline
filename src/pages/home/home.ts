import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { SubCategoriesPage } from '../sub-categories/sub-categories'
import {HelperProvider} from '../../providers/helper/helper'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	categories:any = [];

  constructor( public navCtrl: NavController, private cateProvider:CategoriesProvider,
    private helper:HelperProvider) {

  }
  ngOnInit(){
     if(!this.helper.isConnected()){this.helper.displayConnectionError(); return;}
    this.helper.showSpinner();
     this.cateProvider.queryCate({parent:'0'}).subscribe((res:any)=>{
       this.categories = res.categories.filter((category) => { return !category.parent })
      this.helper.hideSpinner();
    })
  }
  getSubCategories(category){
    if(!this.helper.isConnected()){this.helper.displayConnectionError(); return;}
	  this.navCtrl.push(SubCategoriesPage, {category:category})
  }

}
