import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = null;

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen, public database: DatabaseProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
        
        this.database.createDatabase();
        this.openHome(this.splashScreen);
    });
  }


  private openHome(splashScreen: SplashScreen){
    splashScreen.hide();
    this.rootPage = TabsPage;
  }
}
