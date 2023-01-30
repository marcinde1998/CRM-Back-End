const Customer = require('../model/Customer');


function customerList(cb) {
    Customer.find().lean().exec(function(err, customers) {
        if(err) {
            cb(err)
        } else {
            cb(null, customers)
        }
    });
}

function customerAdd(data, cb) {
    let newCustomer = new Customer(data)

    newCustomer.save(function(err, user) {
        if(err) {
            cb(err);
        } else { 
            cb(null, user)
        }
    })
}

function customerGet(id, cb) {
    Customer.findById(id).populate("actions").exec(function(err, customer) {
        if(err) {
            cb(err)
        } else {
            cb(null, customer)
        }
    })
}

function customerDelete(id, cb) {
    Customer.deleteOne({_id: id},function(err, customer) {
        if (err) {
            cb(err);
        } else {
            cb(null, customer);
        }
    });
}

module.exports = {
    list: customerList,
    add: customerAdd,
    get: customerGet,
    delete: customerDelete
}