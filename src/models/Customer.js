const { Schema, model } = require("mongoose");

const CustomerSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      default: ""
    },
    role: {
      type: Number,
      default: 2001,
    },
  },
  { timestamps: true }
);

module.exports = model("Customer", CustomerSchema);
