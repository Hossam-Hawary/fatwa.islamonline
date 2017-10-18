import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubCategoriesPage } from '../pages/sub-categories/sub-categories';
import { ListPostsPage } from '../pages/list-posts/list-posts';
import { PostPage } from '../pages/post/post'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiProvider } from '../providers/api/api';
import { CategoriesProvider } from '../providers/categories/categories';
import { HelperProvider } from '../providers/helper/helper';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
 const pages:any[] =[
  HomePage, SubCategoriesPage, ListPostsPage, PostPage
  ]
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
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    CategoriesProvider,
    HelperProvider
  ]
})
export class AppModule {}
