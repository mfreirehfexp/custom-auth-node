import { BaseMySql } from "./BaseMySql";

export class MySqlSimple extends BaseMySql {
  tabla: string = 'my-table';

  async get(camposBusqueda?: {[key:string]:any}[]) {
    return this.doConnectSafe(async function(conn) {
      let sql = `SELECT * FROM ${this.tabla} WHERE `;
      let sqlWHERE = "";

      if (camposBusqueda!==null && camposBusqueda!==undefined && camposBusqueda.length>0) {
        camposBusqueda.forEach( campo => {
          for( let key in campo ){
            sqlWHERE = sqlWHERE + key + " = " + conn.escape(campo[key]) + " AND ";
          }
        });
        sqlWHERE = sqlWHERE.substring(0, sqlWHERE.length - 5); // Elimino el ultimo " AND "
      }
      else {
        return null;
      }

      sql = sql + sqlWHERE;

      //let objetoBD = await conn.query(`SELECT * FROM ${this.tabla} WHERE ${this.field_id} = ?`, camposBusqueda[this.field_id]);
      let objetoBD = await conn.query(sql);
      return objetoBD[0];
    });
  }

  async getByFbKey(key:string) {
    return this.get([{fbKey: key}]);
  }

  async insert(elemento: any) {
    return this.doTransaction( (conn) => {
      return conn.query(`INSERT INTO ${this.tabla} SET ?`, elemento);
    })
  }

  async update(elemento: any) {
    return this.doTransaction( (conn) => {
      return conn.query(`UPDATE ${this.tabla} SET ? WHERE ?`, elemento);
    })
  }

  async delete(elemento: any) {
    return this.doTransaction( (conn) => {
      return conn.query(`DELETE FROM ${this.tabla} WHERE ?`, elemento);
    })
  }
}
