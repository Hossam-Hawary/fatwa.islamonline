import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController, Content } from 'ionic-angular';
import {HelperProvider} from '../../providers/helper/helper'

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
  @ViewChild(Content) content: Content;
	post:any;
  searching:boolean;

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
  startSearch(){
      this.searching = true;
  }
  endSearch(){
      this.content.scrollToTop();
      this.searching = false;
  }
}
