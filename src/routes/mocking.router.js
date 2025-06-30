//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\routes\mocking.router.js
import { Router } from "express";
import { generateMockPet } from "../mocking/pets.mock.js";
import { generateMockUser } from "../mocking/users.mock.js";
import userModel from "../dao/models/User.js";
import petModel  from "../dao/models/Pet.js";


const router = Router();

router.get('/mockingpets', (req, res) => {
    const pets =  []
    for (let i = 0; i < 100; i++) {
        pets.push(generateMockPet());
    }
    res.send({ status: "success", payload: pets });
})

router.get("/mockingusers", async (req, res) => {
  try {
    const users = await Promise.all(
      Array.from({ length: 50 }, () => generateMockUser())
    );
    res.send({ status: "success", payload: users });
  } catch (error) {
    req.logger.error("Error generando mockingusers", error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

router.post("/generateData", async (req, res) => {
  try {
    const usersQty = parseInt(req.query.users) || 0;
    const petsQty = parseInt(req.query.pets) || 0;

    const users = await Promise.all(
      Array.from({ length: usersQty }, () => generateMockUser())
    );
    const pets = Array.from({ length: petsQty }, () => generateMockPet());

    const createdUsers = await userModel.insertMany(users);
    const createdPets = await petModel.insertMany(pets);

    res.send({
      status: "success",
      message: `Se generaron ${createdUsers.length} usuarios y ${createdPets.length} mascotas`,
    });
  } catch (error) {
    req.logger.error("Error generando datos en /generateData", error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;