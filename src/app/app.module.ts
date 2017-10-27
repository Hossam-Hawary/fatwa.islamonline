import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Pro } from '@ionic/pro';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPostsPage } from '../pages/list-posts/list-posts';
import { PostPage } from '../pages/post/post'
import { SearchPage } from '../pages/search/search'

import { ApiProvider } from '../providers/api/api';
import { CategoriesProvider } from '../providers/categories/categories';
import { HelperProvider } from '../providers/helper/helper';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { EmailComposer } from '@ionic-native/email-composer';



export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
 const pages:any[] =[
  HomePage, ListPostsPage, PostPage, SearchPage
  ]

  const IonicPro = Pro.init('840c7614', {
    appVersion: "0.0.1"
  });

  export class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
  }
}

  @NgModule({
  declarations: [
    MyApp,
  ...pages
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   ...pages
  ],
  providers: [
    StatusBar, SplashScreen, { provide: ErrorHandler, useClass: MyErrorHandler },
    ApiProvider, CategoriesProvider, HelperProvider, Network, Toast, SocialSharing,
    SpinnerDialog, EmailComposer
  ]
})
export class AppModule {}
