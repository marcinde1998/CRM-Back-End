const ActionCustomer = require('../model/actionCustomer');
const Customer = require('../model/Customer');


function actionAdd(data, cb) {
    let newAction = new ActionCustomer(data)

    newAction.save(function(err, action) {
        if(err) {
            cb(err);
        } else { 
            Customer.findById(data.customerId, function (err, customer) {
                if (err) return;
                
                customer.actions.push(newAction._id);
                customer.save();
              });
            cb(null, action)
        }
    })
}



module.exports = {
    add:actionAdd
}