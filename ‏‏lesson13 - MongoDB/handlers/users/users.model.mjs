import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
});

export const User = mongoose.model("users", schema);