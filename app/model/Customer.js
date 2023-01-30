const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/customer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema (
    {
        name: { type: String, required: true },
        address1: { type: String, required: true},
        address2: { type: String, required: true},
        nip: { type: String, required: true},
        actions: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ActionCustomer",
          },
        ]        
    },
    { timestamps: true }
);

module.exports = mongoose.model('Customer', schema);