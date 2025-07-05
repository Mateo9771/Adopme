import chai from 'chai';
const expect = chai.expect;

import { createHash, passwordValidation } from '../../src/utils/index.js';

describe('🧪 Utils: Bcrypt', () => {
  const plainPassword = 'superSecreta123';

  it('Debe hashear la contraseña correctamente (diferente al texto original)', async () => {
    const hashed = await createHash(plainPassword);
    expect(hashed).to.be.a('string');
    expect(hashed).to.not.equal(plainPassword);
  });

  it('Debe validar correctamente la contraseña original contra el hash', async () => {
    const hashed = await createHash(plainPassword);
    const isValid = await passwordValidation({ password: hashed }, plainPassword);
    expect(isValid).to.be.true;
  });

  it('Debe fallar si el hash es alterado', async () => {
    const hashed = await createHash(plainPassword);
    const isValid = await passwordValidation({ password: hashed + 'modificado' }, plainPassword);
    expect(isValid).to.be.false;
  });
});
