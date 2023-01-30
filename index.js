require('dotenv').config();

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// Customers

const customer = require('./app/controller/customer.controller');
const user = require('./app/controller/user.controller');
const auth = require('./app/auth/auth');


app.get('/all', auth, function (req, res) {

    customer.list(function (err, customers) {

        if (err) res.send(err);
        res.json(customers)
    });
});

app.post('/add', function(req, res){
    customer.add(req.body, function(err, customer){
        console.log(err);
        if(err) {
            res.status(404);
            res.json({
                error: "Record not created"
            });
        } else {
            res.json(customer);
        }
    })
});

app.get('/customer/:id', function(req, res){
    
    customer.get(req.params.id, function(err, customer){
        if(err) {
            res.json(err);
        } else {
            res.json(customer);
        }
    })
});

app.delete('/customer/delete/:id', function(req, res){
     
    customer.delete(req.params.id, function(err, customer){
        if(err) {
            console.log(err);
        } else {
            res.json(customer);
        }
    });
});

// Actions

const actionCustomer = require('./app/controller/actionCustomer.controller');

app.post('/actionCustomer/add', function(req, res){

    actionCustomer.add(req.body, function(err, action){
        console.log(err);
        if(err) {
            res.status(404);
            res.json({
                error: "Record not created"
            });
        } else {
            res.json(action);
        }
    })
});

//Users

app.post('/addUser', function(req, res){

    user.add(req.body, function(err, user){

        if(err) {
            res.status(404);
            res.json({
                error: "User not created"
            });
        } else {
            res.json(user);
        }
    })
});

app.post('/login', function(req, res){

    user.login(req.body, function(err, token){   
        if(err) {
            res.status(404);
            res.json({
                error: "User not logged"
            });
        } else if(token) {
            res.json({success: true, jwt: token});
        } else {
            res.json({success:false, massage: 'username or password do not match'})
        }
    })
});

app.get('/allUsers', function (req, res) {

    user.list(function (err, users) {

        if (err) res.send(err);
        console.log(users)
        res.json(users)
    });
});

app.listen(8080, function () {
    console.log('Serwer działa');
});