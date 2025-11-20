const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const{generateToken} = require('../utils/jwt.utils');


const register = async(req , res)=>{
    const {username,password} = req.body;
    if(!username||!password){
        return res.status(400).json({message:'username and password required'});
    }

    const existing = await User.findOne({username});
    if(existing){
        return res.status(409).json({message:'user already exists'});
    }

    const passwordHash = await bcrypt.hash(password,10);
    const user = await User.create({username,passwordHash});
    res.status(201).json({message:'user created',user:{id:user._id,username: user.username}});
};

const login = async(req ,res)=>{
    const {username,password}= req.body;
    if(!username || !password){
        return res.status(400).json({message:'username and password required'})
    };

    const user = await User.findOne({username});
    if(!user){
        return res.status(401).json({message:'invalid credentials'})
    };
    

    const match = await user.comparePassword(password);
    if(!match){
        return res.status(401).json({message:'invalid credentials'})
    };

    const token = generateToken(user);
    res.json({token,user:{id:user._id, username:user.username}});
};

module.exports = {register,login};