import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ProductsHandler } from 'src/providers/products-handler';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private productsHandler: ProductsHandler
  ) {
    // this.productsHandler.retrieveProducts();
    // this.productsHandler.retrieveProductAttributes();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.statusBar.overlaysWebView(false);
      if(this.platform.is('android')) {
        this.statusBar.styleLightContent();
        this.splashScreen.hide();
      }      
    });
  }
}
