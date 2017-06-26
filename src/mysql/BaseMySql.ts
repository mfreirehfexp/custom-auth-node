import * as mysql from 'promise-mysql';

export abstract class BaseMySql {
  private connection: any = null;

  private async connect(){
    try {
      if( this.connection != null )
        return this.connection;

      let config:any = {
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
      };

      if (process.env.INSTANCE_CONNECTION_NAME)
        config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
      else
        config.host = 'localhost';

      // Create the connection
      this.connection = await mysql.createConnection(config);
      // Return the connection
      return this.connection
    }
    catch (err){
      throw new Error(err.code);
    }
  }

  public disconect(){
      if (this.connection) {
        this.connection.end();
        this.connection=null;
      }
  }

  protected async doTransaction(callback: (con:any) => Promise<any>, closeCon:boolean = false) {
    return this.doConnectSafe(async function(conn){
      let result;

      try{
        await conn.beginTransaction(); //Comienzo Transacción
        let result = await callback(conn);

        await conn.commit(); //Si todo salio bien hago un commit de la transacción
      } catch (err) {
        await conn.rollback();
        console.log("ERROR", err);
        throw new Error(err);
      } finally {
        return result;
      }
    });
  }

  protected async doConnectSafe(callback:(con:any)=>Promise<any>, closeCon:boolean = false){
    let result = null;
    let conn = null;

    try{
      conn = await this.connect(); //Abro la Conexion
    } catch (err) {
      console.error("ERROR", err);
      throw new Error('CONNECTION FAIL');
    }

    try {
      result = await callback(conn);
    } catch (err) {
      throw err;
    } finally {
      if(closeCon)
        this.disconect();
      return result;
    }
  }
}
