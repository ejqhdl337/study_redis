const sql = require('./db');

const User = function(user){
    this.id = user.id;
    this.password = user.password;
    this.name = user.name;
    this.email = user.email;
    this.address = user.address;
}

User.create = (newUser, result)=>{
    sql.query('INSERT INTO user SET ?', newUser,(err,res)=>{
        if(err){
            console.log("insert error: " + err);
            result(err,null);
            return;
        }

        console.log("Create User: ",{id:res.insertId, ...newUser});
        result(null,newUser);
    });
}

User.findById = (userid, result)=>{
    sql.query('SELECT * FROM user WHERE id = ?', userid,(err,res)=>{
        if(err){
            console.log("findOne error: " + err);
            result(err,null);
            return;
        }

        if(res.length){
            console.log("found user:",res[0]);
            result(null,res[0]);
            return;
        }

        result({kind:"not found"},null);
    })
}

User.updateById = (userid, user, result)=>{
    sql.query('UPDATE user SET password=?, name=?, email=?, address=? WHERE id =?', [user.password,user.name,user.email,user.address,userid],(err,res)=>{
        if(err){
            console.log("update error: " + err);
            result(err,null);
            return;
        }

        if(res.affectedRows == 0){
            result({kind:"not found"},null);
            return;
        }

        console.log("update user: ",{id:userid,user});
        result(null,user);
    });
}

User.remove = (userid, result)=>{
    sql.query('DELETE FROM user WHERE id =?', userid,(err,res)=>{
        if(err){
            console.log("delete error: " + err);
            result(err,null);
            return;
        }

        if(res.affectedRows == 0){
            result({kind:"not found"},null);
            return;
        }

        console.log("delete user: ",{id:userid});
        result(null,userid);
    });
}

module.exports = User;