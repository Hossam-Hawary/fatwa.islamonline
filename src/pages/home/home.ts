import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Content } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories'
import { HelperProvider } from '../../providers/helper/helper'
import { Network } from '@ionic-native/network';
import { ListPostsPage } from '../list-posts/list-posts'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
	categories:any = [];
  offline:boolean = false;
  searching:boolean;
  isOdd:boolean;
  constructor( public navCtrl: NavController, private cateProvider:CategoriesProvider,
    private helper:HelperProvider, private platform:Platform,
    private network:Network) {

    }

  ngOnInit(){
    this.platform.ready().then(() => {
      this.loadCategories();
      this.network.onConnect().subscribe((data) => {
          this.offline = false;
          if(!this.categories.length) this.loadCategories();
        });
    });
  }

  loadCategories(){
     if(!this.helper.isConnected()){this.offline = true;this.helper.displayConnectionError(); return;}
     this.helper.showSpinner();
     this.cateProvider.queryCate({parent:'0'}).then((res:any)=>{
       let data = JSON.parse(res.data)
       this.categories = data.categories.filter((category) => { return !category.parent });
       this.isOdd = (this.categories.length % 2) == 1
       this.helper.runZone();
       this.helper.hideSpinner();
    }).catch(err => {
      this.helper.handleRequestError(err);
    })
  }

  getSubCategories(category){
    if(!this.helper.isConnected()){this.helper.displayConnectionError(); return;}
    this.navCtrl.push(ListPostsPage, {category:category})
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
