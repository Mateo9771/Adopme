import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

export async function generateMockUser() {
    return { 
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: await createHash("coder123"),
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: []
    };
}