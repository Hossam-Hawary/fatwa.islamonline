import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ModalController, Platform} from 'ionic-angular';
import { Toast, ToastOptions } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';





@Injectable()
export class HelperProvider {

	loader:any;
	connectionState:boolean;
  constructor(private loadingCntrl:LoadingController, private alertCtrl:AlertController,
  	private modalCtrl:ModalController, private toast:Toast, private socialSharing: SocialSharing,
  	private platform: Platform, private spinnerDialog: SpinnerDialog ) {
  }

    showSpinner(){
        if (!this.platform.is('cordova')) {this.showLoader(); return} ;
        this.platform.ready().then(() => {
        	this.spinnerDialog.show();
        });
    }

    hideSpinner(){
      if (!this.platform.is('cordova')) {this.hideLoader(); return} ;
    	this.spinnerDialog.hide();
    }
    showLoader() {
       this.loader = this.loadingCntrl.create({
          showBackdrop:true
        });
       this.loader.present();
    }

    hideLoader(){
      if(this.loader) {
        this.loader.dismiss();
        this.loader = null;
      }
    }
    createToast(message:string,closeButtonText?:string,position?:string){
      if (!this.platform.is('cordova')) return ;
      if (!message) return ;
      this.platform.ready().then(() => {
        let toastOptions: ToastOptions = {
          message:message,
          duration: 3000,
          position: position || 'bottom'
         };
        this.toast.showWithOptions(toastOptions).subscribe();
        this.hideSpinner();
      });
    }

    createAlert(title:string, message:string,buttons:any[],disableBackdropDissmis?){
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: buttons,
        enableBackdropDismiss:!disableBackdropDissmis
      });
      this.hideSpinner();
      return alert;
    }
    createModal(page, data?,options={}){
      let modal = this.modalCtrl.create(page,data, options );
      return modal;
    }
    changeConnection(status:boolean){
      this.connectionState = status;
      console.log("changeConnection", status)
      if(!status) this.displayConnectionError();
    }

    isConnected(){
      console.log("isConnected", this.connectionState)
      return this.connectionState;
    }
     displayConnectionError(posision?){
      this.createToast("no connection!",'',posision);
    }

     share(url, message, subject){
     if (!this.platform.is('cordova')) return ;
     this.platform.ready().then(() => {
       let options={
         message: message,
         subject: subject,
         url: url,
         chooserTitle:''

       }
       this.socialSharing.shareWithOptions(options)
     });
   }
}
