const jwt = require('jsonwebtoken');

const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.login_user = function(req, res){
    User.find({username : req.body.username})
    .exec()
    .then(user => {
        if(user.length<1)
        {
            res.status(401).json({
                message : 'Auth Failed!'
            })
        }
        else
        {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err)
                {
                    return res.status(401).json({
                        message : 'Auth Failed!'
                    })
                }
                else if(result)
                {
                    try{
                        const token = jwt.sign({
                            _id : user[0]._id,
                            username : user[0].username,
                            imei : user[0].imei,
                            phone : user[0].phone
                        }, 
                        config.JWT_KEY, 
                        {
                            expiresIn : "1hr"
                        });	                        
                        res.status(200).json({
                            message : 'Auth Success',
                            token : token
                        })        
                    }
                    catch(e){
                        res.status(500).json({
                            message : 'Unexpected Error!'
                        })
                    }    
                }
                else{
                    return res.status(401).json({
                        message : 'Auth Failed!'
                    })
                }
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            error : err
        })
    });
}

exports.add_user = function (req, res) {
    bcrypt.hash(req.body.password,11, (err, hash) => {
        if(err){
            return res.status(500).json({
                error : 'Unexpected error while creating user!'
            })
        } else {
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                imei : req.body.imei,
                phone : req.body.phone,
                email : req.body.email,
                password : hash,
                username : req.body.username             
            });
            user.save().then(result => {
                return res.status(200).json({
                    message : "Registration success!",
                    result : result.imei + ' registered!'
                })
            }).catch(err => {
                var msg = err.message.split(':');
                msg = msg[0];
                if(err.code === 11000)
                {
                    return res.status(409).json({
                        message : "User already exist!"
                    })
                }
                else
                {
                    return res.status(401).json({
                        message : "Registration Failed!",
                        error : {
                            name : err.name,
                            message : msg,
                            code : err.code
                        }
                    })
                }
            });            
        }
    });   
}

