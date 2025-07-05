//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\dao\Users.dao.js
import userModel from "./models/User.js";


export default class Users {
    
    get = (params) =>{
        return userModel.find(params);
    }

    getBy = (params) =>{
        return userModel.findOne(params);
    }

    save = (doc) =>{
        return userModel.create(doc);
    }

    update = (id,doc) =>{
        return userModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return userModel.findByIdAndDelete(id);
    }

    updateByEmail = (email, doc) => {
        return userModel.findOneAndUpdate({ email }, { $set: doc });
    }
}