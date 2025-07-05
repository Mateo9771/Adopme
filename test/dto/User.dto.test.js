import chai from 'chai';
const expect = chai.expect;

import UserDTO from '../../src/dto/User.dto.js';

describe('🧪 UserDTO', () => {
  it('Debe unificar nombre y apellido en una propiedad llamada name', () => {
    const mockUser = {
      first_name: 'Mateo',
      last_name: 'Baldoni',
      email: 'mateo@test.com',
      role: 'user',
      password: '123456',
    };

    const result = UserDTO.getUserTokenFrom(mockUser);

    expect(result).to.have.property('name', 'Mateo Baldoni');
    expect(result).to.have.property('email', 'mateo@test.com');
    expect(result).to.have.property('role', 'user');
  });

  it('Debe eliminar propiedades innecesarias como password, first_name y last_name', () => {
    const mockUser = {
      first_name: 'Mateo',
      last_name: 'Baldoni',
      email: 'mateo@test.com',
      role: 'user',
      password: '123456',
    };

    const result = UserDTO.getUserTokenFrom(mockUser);

    expect(result).to.not.have.property('password');
    expect(result).to.not.have.property('first_name');
    expect(result).to.not.have.property('last_name');
  });
});
