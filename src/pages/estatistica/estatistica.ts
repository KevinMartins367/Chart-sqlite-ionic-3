import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Client } from '../../providers/client-local/client-local';
import { ClientDaoProvider } from  '../../providers/client-dao/client-dao';
import { WeightDaoProvider } from '../../providers/Weight-dao/Weight-dao';
import { Weights } from '../../providers/Weight-local/Weight-local';
import * as moment from 'moment';

import { ImcPage } from '../imc/imc';

@IonicPage()
@Component({
  selector: 'page-estatistica',
  templateUrl: 'estatistica.html',
})
export class EstatisticaPage {

  cli: Client[];
  imc: string;
  selectedDay = new Date();
  Weights: Weights[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public clip: ClientDaoProvider, public wp: WeightDaoProvider) {
                moment.locale('pt-br');   //change the location to your  
                this.get();
                
  }

  ionViewDidLoad() {
  }

  public lineChartData:Array<any> = [ {data: [0], label: 'Weight'},
                                      {data: [0], label: 'Goal'}]; //
  public lineChartLabels:Array<any> = ['Start'];
  public lineChartOptions:any = { responsive: true };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  get(){
    let id = 1;
    this.clip.get(id)
    .then((data: any[]) => {
      this.cli = data;
      this.wp.getAll()
      .then((dataw: Weights[]) => {
        if(dataw != null){
          
          let Weight: Array<any> = [];
          this.Weights = dataw;
          for (let i = 0; i < dataw.length; i++) {
            this.lineChartData[0].data.push(dataw[i].nowaday);
            this.lineChartData[1].data.push(dataw[i].goal);
            this.lineChartLabels.push(dataw[i].date);
            Weight.push(dataw[i].nowaday);
          }

          let im = parseFloat(Weight[Weight.length -1])/(parseFloat(data[0].height) * parseFloat(data[0].height));
          this.imc = im.toFixed(2);
        }else{
          this.imc = '0';
        }

      })
      .catch((e) => {
        console.error(e); 
      });
    })
    .catch((e) => {
      console.error(e); 
    });
  }
  
  openPage() {
    console.log(this.cli);
    
    this.navCtrl.push(ImcPage, {cli: this.cli[0], Weights: this.Weights});
  }
}
