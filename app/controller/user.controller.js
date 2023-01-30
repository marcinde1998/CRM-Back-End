const User = require('../model/User');
const bcrypt = require('bcrypt');

function userAdd(data, cb) {
    let newUser = new User (data);
    newUser.save(function(err, user){
        if(err) {
            cb(err);
        } else { 
            cb(null, user)
        }
    });
}

function userLogin(data, cb) {
    User.findOne({username: data.username}).exec(function(err, user){
        if(err) {
            cb(err);
            return;
        } 
        if(!user) {
            cb(null, user);
            return;
        } 

        bcrypt.compare(data.password, user.password, function(err, logged) {
            if(err) {
                cb(err);
            } if (logged) {
                const token = user.generateAuthToken();
                cb(null, token);
            } else {
                cb(null, null)
            }
        })
    })
}

function usersList(cb) {
    User.find().lean().exec(function(err, users) {
        if(err) {
            cb(err)
        } else {
            cb(null, users)
        }
    });
}

module.exports = {
    add: userAdd,
    login: userLogin,
    list: usersList
}