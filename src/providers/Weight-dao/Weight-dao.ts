import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Weights } from '../Weight-local/Weight-local';
import 'rxjs/add/operator/map';

@Injectable()
export class WeightDaoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }


  public insert(p: Weights) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into Weights (atual, data, meta, cliente_id) values (?, ?, ?, ?)';
        let data = [p.atual, p.data, p.meta, p.cliente_id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT atual, data, meta FROM Weights';
        var data: any[];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let Weights: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var Weight = data.rows.item(i);
                Weights.push(Weight);
              }
              
              return Weights;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Weights where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
}
