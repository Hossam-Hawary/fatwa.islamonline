import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
	post:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private helper:HelperProvider) {
  	this.post = navParams.get('post');
  }
	sharePost(post){
		this.helper.share(post.url, post.title, '')
	}

}
