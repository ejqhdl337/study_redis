const user = require('../model/user.model')
const bcrypt = require('bcryptjs')
const bcryptConfig = require('../config/bcrypt.config')
const cache = require('../model/caches')

const getUser = async (req,res)=>{
    const {id,password} = req.query;

    if(!req.query){
        res.status(404).send({
            message:"content can not be empty"
        });
        return;
    }

    try{
        const data = await cache.get(id);
        const cachedUser = JSON.parse(data);
        if(cachedUser){
            if(bcrypt.compareSync(password, cachedUser.password)){
                console.log("cache hit: " + data);
                res.status(200).json(cachedUser);
                return;
            }else{
                res.status(400).send({error:true,message:"Incorrect password"});
                return;
            }
        }
        user.findById(id, (err,data)=>{
            if(err){
                console.log(err);
                throw err;
            }
            // console.log(data);
            bcrypt.compare(password, data.password,(err,result)=>{
                if(err){
                    throw err;
                }
                if(result){
                    console.log("cache set:" +JSON.stringify(data));
                    cache.set(data.id,JSON.stringify(data));
                    res.status(200).json(data);
                }else{
                    res.status(400).send({error:true,message:"Incorrect password"});
                    return;
                }
            })
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Error occured while login"});
    }
}

const createUser = async (req,res)=>{
    if(!req.body){
        res.status(404).send({
            message:"content can not be empty"
        });
        return;
    }
    try{
        console.log(req.body);
        req.body.password = bcrypt.hashSync(req.body.password,bcryptConfig.bcryptSalt);
        const newUser = new user(req.body);

        user.create(newUser,(err,data)=>{
            if(err){
                console.log("Mysql Error: " + err);
                throw err;
            }
            // console.log(data);
            res.status(200).send({message:"content is successfully created"});
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Error occured while login"});
    }
}

const updateUser = async (req,res)=>{
    const {id} = req.params;

    if(!id || !req.body){
        res.status(404).send({
            message:"content can not be empty"
        });
        return;
    }
    try{
        console.log(req.body);
        req.body.password = bcrypt.hashSync(req.body.password,bcryptConfig.bcryptSalt);
        const newUser = new user(req.body);

        user.updateById(id,newUser,(err,data)=>{
            if(err){
                console.log("Mysql Error: " + err);
                throw err;
            }
            // console.log(data);
            res.status(200).send({message:"content is successfully updated"});
            console.log("cache updated successfully");
            cache.set(id, JSON.stringify(data));
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Error occured while editing user"});
    }
}

const deleteUser = async (req,res)=>{
    
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}