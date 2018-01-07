import { Component } from '@angular/core';

import { ConfigPage } from '../config/config';
import { HomePage } from '../home/home';
import { EstatisticaPage } from '../estatistica/estatistica';
import { ListAtividadePage } from '../list-atividade/list-atividade';
import { CalendarPage } from '../calendar/calendar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConfigPage;
  tab3Root = CalendarPage;
  tab4Root = EstatisticaPage;
  tab5Root = ListAtividadePage;

  constructor() {

  }
}
