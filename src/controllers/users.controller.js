//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\controllers\users.controller.js
import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

const uploadDocuments = async(req,res) => {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);

    if(!user) return res.status(404).send({status:"error", error: "User not found"});

    const files = req.files;
    const documents = files.map(file => ({
        name: file.filename,
        reference: file.path
    }));

    user.documents = user.documents.concat(documents);
    await usersService.update(userId, user);

    res.send({status:"success", message: "Documents upload"});
};

export default {
    deleteUser,
    getAllUsers,
    uploadDocuments,
    getUser,
    updateUser
}