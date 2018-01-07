import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImcPage } from './imc';

@NgModule({
  declarations: [
    ImcPage,
  ],
  imports: [
    IonicPageModule.forChild(ImcPage),
  ],
})
export class ImcPageModule {}
