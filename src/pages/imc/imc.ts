import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { Client } from '../../providers/client-local/client-local';
import { ClientDaoProvider } from  '../../providers/client-dao/client-dao';
import { WeightDaoProvider } from '../../providers/Weight-dao/Weight-dao';
import { Weights } from '../../providers/Weight-local/Weight-local';

import { EstatisticaPage } from '../estatistica/estatistica';

@IonicPage()
@Component({
  selector: 'page-imc',
  templateUrl: 'imc.html',
})
export class ImcPage {

  height: number;
  Weights: number;
  goal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private clip: ClientDaoProvider, public wp: WeightDaoProvider) {
      let clis = navParams.get("cli") || {cli:""};
      let Weights = navParams.get("Weights") || {Weights:""};
      this.height = clis.height;
      this.Weights = parseFloat(Weights[Weights.length -1].atual);
      this.goal = parseFloat(Weights[Weights.length -1].goal);
  }

  ionViewDidLoad() {

  }

  getUser(){
    let cli = new Client(
      1,
      null,
      null,
      this.height
    );

    this.clip.updateIMC(cli)
    .then((data: any) => {
      if(data === true){
        let p = new Weights(
          null,
          this.Weights,
          moment(new Date()).format('L'),
          this.goal,
          1
        );
        this.wp.insert(p)
        .then((datap: any) => {
          if(datap === true){
            this.navCtrl.push(EstatisticaPage);
          }
        })
        .catch((e) => {console.error(e);});
      }
    })
      .catch((e) => {
        this.navCtrl.push(EstatisticaPage);
        console.error(e);
      });
  }
}
