import chai from 'chai';
const expect = chai.expect;

import PetDTO from '../../src/dto/Pet.dto.js';

describe('🧪 PetDTO', () => {
  it('Debe construir un objeto de mascota con valores por defecto', () => {
    const mockPet = {
      name: 'Luna',
      specie: 'Perro',
    };

    const result = PetDTO.getPetInputFrom(mockPet);

    expect(result).to.have.property('name', 'Luna');
    expect(result).to.have.property('specie', 'Perro');
    expect(result).to.have.property('image', '');
    expect(result).to.have.property('birthDate', '12-30-2000');
    expect(result).to.have.property('adopted', false);
  });

  it('Debe manejar campos opcionales correctamente', () => {
    const mockPet = {
      name: 'Coco',
      specie: 'Gato',
      image: 'coco.jpg',
      birthDate: '01-01-2020'
    };

    const result = PetDTO.getPetInputFrom(mockPet);

    expect(result).to.deep.include({
      name: 'Coco',
      specie: 'Gato',
      image: 'coco.jpg',
      birthDate: '01-01-2020',
      adopted: false
    });
  });
});
