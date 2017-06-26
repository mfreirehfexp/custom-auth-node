import { MySqlSimple } from '../mysql/MySqlObject';

export class CustomAuth extends MySqlSimple {

constructor(){
  super();
  // Cofiguracion de MySqlSimple para poder transaccionar contra MySQL
  this.tabla = 'my-table';
}

// Hacer la logica aca y llamar a los metodos this.insert() y otros para
// guardar en la base de datos lo que corresponda.

}