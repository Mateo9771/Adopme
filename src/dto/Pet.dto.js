//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\dto\Pet.dto.js
export default class PetDTO {
    static getPetInputFrom = (pet) =>{
        return {
            name:pet.name||'',
            specie:pet.specie||'',
            image: pet.image||'',
            birthDate:pet.birthDate||'12-30-2000',
            adopted:false
        }
    }
}