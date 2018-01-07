import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstatisticaPage } from './estatistica';

@NgModule({
  declarations: [
    EstatisticaPage,
  ],
  imports: [
    IonicPageModule.forChild(EstatisticaPage),
  ],
})
export class EstatisticaPageModule {}
