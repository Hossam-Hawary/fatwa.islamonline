import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import {HelperProvider} from '../../providers/helper/helper'
import { SearchPage } from '../search/search'


/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
	post:any;

  constructor( public navParams: NavParams,
  	private helper:HelperProvider, public viewCtrl: ViewController) {
  	this.post = navParams.get('post');
  }
	sharePost(post){
		this.helper.share(post.url, post.title, '')
	}
   close() {
     this.viewCtrl.dismiss();
   }
    openSearch(){
      this.helper.createModal(SearchPage).present();
    }
}
