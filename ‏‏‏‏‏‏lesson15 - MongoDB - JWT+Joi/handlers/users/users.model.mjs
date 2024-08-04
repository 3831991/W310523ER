import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isBusiness: Boolean,
    isAdmin: Boolean,
});

export const User = mongoose.model("users", schema);