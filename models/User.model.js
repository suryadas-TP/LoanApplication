const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    passwordHash:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    },
},{timestamps:true});

UserSchema.method.comparePassword = async function (plain){
    return bcrypt.compare(plain,this.passwordHash);
};
module.exports = mongoose.model('User',UserSchema);