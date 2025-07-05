// test/dao/Pets.dao.test.js
import mongoose from "mongoose";
import chai from "chai";
import Pet from "../../src/dao/Pets.dao.js";

const expect = chai.expect;

mongoose.connect('mongodb://127.0.0.1:27017/Adoptme?directConnection=true');

describe('🧪 DAO: Pets', function () {
    before(async function () {
        this.petsDao = new Pet();
    });

    beforeEach(async function () {
        await mongoose.connection.collections.pets.drop().catch(() => {});
        this.timeout(5000);
    });

    it('Debe poder obtener las mascotas en formato de arreglo', async function () {
        const pets = await this.petsDao.get({});
        expect(pets).to.be.an('array');
    });

    it('El dao debe agregar una mascota correctamente', async function () {
        const mockPet = {
            name: 'Firulais',
            specie: 'Perro',
            birthDate: new Date(2020, 5, 15),
            adopted: false,
        };

        const result = await this.petsDao.save(mockPet);
        expect(result).to.have.property('_id');
    });

    it('El DAO puede obtener una mascota por nombre', async function () {
        const mockPet = {
            name: 'Luna',
            specie: 'Gato',
            birthDate: new Date(2021, 3, 10),
            adopted: false,
        };

        await this.petsDao.save(mockPet);
        const pet = await this.petsDao.getBy({ name: mockPet.name });
        expect(pet).to.be.an('object');
        expect(pet.name).to.equal(mockPet.name);
    });

    it('El DAO actualiza una mascota correctamente', async function () {
        const mockPet = {
            name: 'Toby',
            specie: 'Perro',
            adopted: false,
        };

        const pet = await this.petsDao.save(mockPet);
        await this.petsDao.update(pet._id, { adopted: true });

        const updatedPet = await this.petsDao.getBy({ _id: pet._id });
        expect(updatedPet.adopted).to.be.true;
    });

    it('El DAO elimina una mascota correctamente', async function () {
        const mockPet = {
            name: 'Rocky',
            specie: 'Perro',
            adopted: false,
        };

        const pet = await this.petsDao.save(mockPet);
        await this.petsDao.delete(pet._id);

        const deletedPet = await this.petsDao.getBy({ _id: pet._id });
        expect(deletedPet).to.be.null;
    });
});
