import mongoose from "mongoose";
import chai from "chai";
import User from "../../src/dao/Users.dao.js";

const expect = chai.expect;

mongoose.connect('mongodb://127.0.0.1:27017/Adoptme?directConnection=true');

describe('🧪 DAO: Users', function () {
    before(async function () {
        this.usersDao = new User();
    });

    beforeEach(async function () {
        await mongoose.connection.collections.users.drop().catch(() => {});
        this.timeout(5000);
    });

    it('Debe poder obtener los usuarios en formato de arreglo', async function () {
        const users = await this.usersDao.get({});
        expect(users).to.be.an('array');
    });

    it('El dao debe agregar un usuario correctamente', async function () {
        const mockUser = {
            first_name: 'Coder',
            last_name: 'House',
            email: 'correoprueba@correo.com',
            password: '123456',
        };

        const result = await this.usersDao.save(mockUser);
        expect(result).to.have.property('_id');
    });

    it('El dao agregara al documento insertado un arreglo de mascotas vacio', async function () {
        const mockUser = {
            first_name: 'Coder',
            last_name: 'House',
            email: 'correoprueba@correo.com',
            password: '123456',
        };

        const result = await this.usersDao.save(mockUser);
        expect(result).to.have.property('pets').that.is.an('array').that.is.empty;
    });

    it('El DAO puede obtener a un usuario por email', async function () {
        const mockUser = {
            first_name: 'House',
            last_name: 'Coder',
            email: 'correoprueba@correo.com',
            password: '123456',
        };

        await this.usersDao.save(mockUser);
        const user = await this.usersDao.getBy({ email: mockUser.email });
        expect(user).to.be.an('object');
        expect(user.email).to.equal(mockUser.email);
    });

    it('El DAO actualiza un usuario correctamente', async function () {
        const mockUser = {
            first_name: 'Mateo',
            last_name: 'Baldoni',
            email: 'mateo@test.com',
            password: 'test123',
        };

        const user = await this.usersDao.save(mockUser);
        const updated = await this.usersDao.update(user._id, { first_name: 'Matías' });

        const userUpdated = await this.usersDao.getBy({ _id: user._id });
        expect(userUpdated.first_name).to.equal('Matías');
    });

    it('El DAO elimina un usuario correctamente', async function () {
        const mockUser = {
            first_name: 'Eliminar',
            last_name: 'Usuario',
            email: 'delete@test.com',
            password: 'test123',
        };

        const user = await this.usersDao.save(mockUser);
        await this.usersDao.delete(user._id);

        const userDeleted = await this.usersDao.getBy({ _id: user._id });
        expect(userDeleted).to.be.null;
    });
});