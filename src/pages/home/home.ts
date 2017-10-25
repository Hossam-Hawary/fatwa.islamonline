import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { HelperProvider } from '../../providers/helper/helper'
import { Network } from '@ionic-native/network';
import { ListPostsPage } from '../list-posts/list-posts'
import { SearchPage } from '../search/search'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	categories:any = [];
  constructor( public navCtrl: NavController, private cateProvider:CategoriesProvider,
    private helper:HelperProvider, private platform:Platform,
    private network:Network) {

    }

  ngOnInit(){
    this.platform.ready().then(() => {
      this.loadCategories();
      this.network.onConnect().subscribe((data) => {
               console.log(this.categories)
          if(!this.categories.length) this.loadCategories();
        });
    });
  }

  loadCategories(){
     if(!this.helper.isConnected()){this.helper.displayConnectionError(); return;}
     this.helper.showSpinner();
     this.cateProvider.queryCate({parent:'0'}).subscribe((res:any)=>{
       this.categories = res.categories.filter((category) => { return !category.parent });
       this.helper.runZone();
       this.helper.hideSpinner();
    }, 
    (err)=>{
      this.helper.handleRequestError(err);
    })
  }

  getSubCategories(category){
    console.log(category.id, category.title)
    if(!this.helper.isConnected()){this.helper.displayConnectionError(); return;}
    this.navCtrl.push(ListPostsPage, {category:category})
  }
    openSearch(){
      this.helper.createModal(SearchPage).present();
    }
}
