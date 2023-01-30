const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/customer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema (
    {
        date: { type: Date, required: true },
        type: { type: String, required: true},
        description: { type: String, required: true},
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
          }
    },
    { timestamps: true }
);

module.exports = mongoose.model('ActionCustomer', schema);