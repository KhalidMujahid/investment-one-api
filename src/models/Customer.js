const { Schema, model } = require("mongoose");

const CustomerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 2001,
    },
  },
  { timestamps: true }
);

module.exports = model("Customer", CustomerSchema);
