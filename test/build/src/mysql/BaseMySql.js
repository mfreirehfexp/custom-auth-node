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
const mysql = require("promise-mysql");
class BaseMySql {
    constructor() {
        this.connection = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connection != null)
                    return this.connection;
                let config = {
                    user: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE
                };
                if (process.env.INSTANCE_CONNECTION_NAME)
                    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
                else
                    config.host = 'localhost';
                // Create the connection
                this.connection = yield mysql.createConnection(config);
                // Return the connection
                return this.connection;
            }
            catch (err) {
                throw new Error(err.code);
            }
        });
    }
    disconect() {
        if (this.connection) {
            this.connection.end();
            this.connection = null;
        }
    }
    doTransaction(callback, closeCon = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doConnectSafe(function (conn) {
                return __awaiter(this, void 0, void 0, function* () {
                    let result;
                    try {
                        yield conn.beginTransaction(); //Comienzo Transacción
                        let result = yield callback(conn);
                        yield conn.commit(); //Si todo salio bien hago un commit de la transacción
                    }
                    catch (err) {
                        yield conn.rollback();
                        console.log("ERROR", err);
                        throw new Error(err);
                    }
                    finally {
                        return result;
                    }
                });
            });
        });
    }
    doConnectSafe(callback, closeCon = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = null;
            let conn = null;
            try {
                conn = yield this.connect(); //Abro la Conexion
            }
            catch (err) {
                console.error("ERROR", err);
                throw new Error('CONNECTION FAIL');
            }
            try {
                result = yield callback(conn);
            }
            catch (err) {
                throw err;
            }
            finally {
                if (closeCon)
                    this.disconect();
                return result;
            }
        });
    }
}
exports.BaseMySql = BaseMySql;
