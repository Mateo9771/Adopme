// test/dao/Adoption.dao.test.js
// test/dao/Adoption.dao.test.js
import mongoose from "mongoose";
import chai from "chai";
import Adoption from "../../src/dao/Adoption.js";

const expect = chai.expect;

mongoose.connect('mongodb://127.0.0.1:27017/Adoptme?directConnection=true');

describe('🧪 DAO: Adoption', function () {
    before(async function () {
        this.adoptionDao = new Adoption();
    });

    beforeEach(async function () {
        await mongoose.connection.collections.adoptions.drop().catch(() => {});
        this.timeout(5000);
    });

    it('Debe poder obtener las adopciones en formato de arreglo', async function () {
        const adoptions = await this.adoptionDao.get({});
        expect(adoptions).to.be.an('array');
    });

    it('El DAO debe agregar una adopción correctamente', async function () {
        const mockAdoption = {
            owner: new mongoose.Types.ObjectId(),
            pet: new mongoose.Types.ObjectId(),
        };

        const result = await this.adoptionDao.save(mockAdoption);
        expect(result).to.have.property('_id');
        expect(result).to.have.property('owner');
        expect(result).to.have.property('pet');
    });

    it('El DAO puede obtener una adopción por owner', async function () {
        const mockOwnerId = new mongoose.Types.ObjectId();

        const mockAdoption = {
            owner: mockOwnerId,
            pet: new mongoose.Types.ObjectId(),
        };

        await this.adoptionDao.save(mockAdoption);
        const adoption = await this.adoptionDao.getBy({ owner: mockOwnerId });

        expect(adoption).to.be.an('object');
        expect(adoption.owner.toString()).to.equal(mockOwnerId.toString());
    });

    it('El DAO actualiza una adopción correctamente', async function () {
        const adoption = await this.adoptionDao.save({
            owner: new mongoose.Types.ObjectId(),
            pet: new mongoose.Types.ObjectId(),
        });

        const newPetId = new mongoose.Types.ObjectId();
        await this.adoptionDao.update(adoption._id, { pet: newPetId });

        const updatedAdoption = await this.adoptionDao.getBy({ _id: adoption._id });
        expect(updatedAdoption.pet.toString()).to.equal(newPetId.toString());
    });

    it('El DAO elimina una adopción correctamente', async function () {
        const adoption = await this.adoptionDao.save({
            owner: new mongoose.Types.ObjectId(),
            pet: new mongoose.Types.ObjectId(),
        });

        await this.adoptionDao.delete(adoption._id);
        const deletedAdoption = await this.adoptionDao.getBy({ _id: adoption._id });

        expect(deletedAdoption).to.be.null;
    });
});
