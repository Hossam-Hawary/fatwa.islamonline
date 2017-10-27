import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
	body:string;
	subject:string;

  constructor(private navCtrl:NavController, private emailComposer: EmailComposer, private alertCtrl:AlertController,
  	 private translate: TranslateService, private platform:Platform) {
  }

  openEmailWarning (){
   let alert = this.alertCtrl.create({
        title: this.translate.instant("SEND_MESSAGE"),
        message: this.translate.instant("OPEN_EMAIL_MSG"),
        buttons: [
        	this.translate.instant("CANCEL"),
        	{
       	 		text: this.translate.instant("OPEN_EMAIL"),
       			handler: () => this.sendMail()
       		}
        ],
        enableBackdropDismiss:true
      });
   alert.present()
  }

 sendMail(){
 	let email = {
 		  to: 'ask@islamonline.net',
		  subject: this.subject || 'Fatwa Islam Online',
		  body: this.body,
		  isHtml: true
 	}
 	this.platform.ready().then(() => {
 		this.emailComposer.open(email).then(()=>{
       this.navCtrl.pop()
     });
 	});
 }

}
