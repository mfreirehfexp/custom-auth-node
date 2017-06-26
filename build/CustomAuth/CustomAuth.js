"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MySqlObject_1 = require("../mysql/MySqlObject");
class CustomAuth extends MySqlObject_1.MySqlSimple {
    constructor() {
        super();
        // Cofiguracion de MySqlSimple para poder transaccionar contra MySQL
        this.tabla = 'my-table';
    }
}
exports.CustomAuth = CustomAuth;
