import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

export const User = mongoose.model("users", schema);