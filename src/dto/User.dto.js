//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\dto\User.dto.js
export default class UserDTO {
    static getUserTokenFrom = (user) =>{
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email:user.email
        }
    }
}