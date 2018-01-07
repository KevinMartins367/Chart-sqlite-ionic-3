import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { EstatisticaPage } from '../pages/estatistica/estatistica';
import { ImcPage } from '../pages/imc/imc';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { ClientDaoProvider } from '../providers/client-dao/client-dao';
import { WeightDaoProvider } from '../providers/Weight-dao/Weight-dao';


@NgModule({
  declarations: [
    MyApp,
    EstatisticaPage,
    ImcPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EstatisticaPage,
    ImcPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    ClientDaoProvider,
    WeightDaoProvider,
  ]
})
export class AppModule {}
