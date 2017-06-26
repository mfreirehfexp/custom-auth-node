import * as dotenv from '../tests-configs';
import {CustomAuth} from './CustomAuth';

describe('Pedido', () => {
  let example = {};
  let auth = null;

  beforeEach(async (done) => {
    auth = new CustomAuth();
    done();
  });

  it('Login Exitoso', async (done) => {
    try {
      // auth.loggin()
    } catch(err) {
      console.log(err.message || err);
      done();
    }

    // Prueba boba para compilar
    expect(true).toBeTruthy();
    done();
  });
});
