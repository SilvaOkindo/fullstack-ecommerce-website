import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String, required: true },
});

export const Address = mongoose.model("Address", addressSchema);
