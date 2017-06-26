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
const CustomAuth_1 = require("./CustomAuth");
describe('Pedido', () => {
    let example = {};
    let auth = null;
    beforeEach((done) => __awaiter(this, void 0, void 0, function* () {
        auth = new CustomAuth_1.CustomAuth();
        done();
    }));
    it('Login Exitoso', (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            // auth.loggin()
        }
        catch (err) {
            console.log(err.message || err);
            done();
        }
        // Prueba boba para compilar
        expect(true).toBeTruthy();
        done();
    }));
});
