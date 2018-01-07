import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {  }

  public getDB() {
    return this.sqlite.create({
      name: 'infocli.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Creating as tables
        this.createTables(db);
 
        // insert data
        this.insertDefaultItems(db);
 
      })
      .catch(e => console.log(e));
  }


  private createTables(db: SQLiteObject) {
    // insert data
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS clients (id integer primary key AUTOINCREMENT NOT NULL, email TEXT, password TEXT, height REAL(3,2))'],
      ['CREATE TABLE IF NOT EXISTS weights (id integer primary key AUTOINCREMENT NOT NULL, nowaday REAL(5,2), date TEXT, goal REAL(5,2), client_id integer, FOREIGN KEY(client_id) REFERENCES clients(id))'],
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    
    db.executeSql('select COUNT(id) as qtd from clients', {})
      .then((data: any) => {
        //If there is no record
        if (data.rows.item(0).qtd == 0) {
  
          // insert data
          db.sqlBatch([
            ['insert into clients (email, password, height) values (?,?,?)', 
            ['teste@mail.com','12345', '1.60']]
          ])
          .then(() => console.log('clients data included'))
          .catch(e => console.error('Error adding data 1', e));

      }
    })
    .catch(e => console.error('Error verifying qtd of clients', e));

    db.executeSql('select COUNT(id) as qtd from weights', {})
    .then((data: any) => {
      //If there is no record
      if (data.rows.item(0).qtd == 0) {

        // insert data
        db.sqlBatch([
          ['insert into weights (nowaday, date, goal, cliente_id) values (?,?,?,?)', 
          [ 54, '01/04/2018', 60, 1]],
          ['insert into weights (nowaday, date, goal, cliente_id) values (?,?,?,?)', 
          [ 56, '01/05/2018', 60, 1]]
        ])
        .then(() => console.log('weights data included'))
        .catch(e => console.error('Error adding data 2', e));

      }
    })
    .catch(e => console.error('Error verifying qtd of weights', e));
  }
}

