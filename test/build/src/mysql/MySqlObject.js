"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseMySql_1 = require("./BaseMySql");
class MySqlSimple extends BaseMySql_1.BaseMySql {
    constructor() {
        super(...arguments);
        this.tabla = 'my-table';
    }
    get(camposBusqueda) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doConnectSafe(function (conn) {
                return __awaiter(this, void 0, void 0, function* () {
                    let sql = `SELECT * FROM ${this.tabla} WHERE `;
                    let sqlWHERE = "";
                    if (camposBusqueda !== null && camposBusqueda !== undefined && camposBusqueda.length > 0) {
                        camposBusqueda.forEach(campo => {
                            for (let key in campo) {
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
                    let objetoBD = yield conn.query(sql);
                    return objetoBD[0];
                });
            });
        });
    }
    getByFbKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get([{ fbKey: key }]);
        });
    }
    insert(elemento) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doTransaction((conn) => {
                return conn.query(`INSERT INTO ${this.tabla} SET ?`, elemento);
            });
        });
    }
    update(elemento) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doTransaction((conn) => {
                return conn.query(`UPDATE ${this.tabla} SET ? WHERE ?`, elemento);
            });
        });
    }
    delete(elemento) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doTransaction((conn) => {
                return conn.query(`DELETE FROM ${this.tabla} WHERE ?`, elemento);
            });
        });
    }
}
exports.MySqlSimple = MySqlSimple;
