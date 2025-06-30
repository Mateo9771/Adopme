//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\mocking\pets.mock.js
import { faker } from "@faker-js/faker";

export function generateMockPet () {
    return{
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
        adopted: false,
        owner: undefined,
        image: `https://loremflickr.com/640/480/animal`
    }
}