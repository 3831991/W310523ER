import { Schema } from "mongoose";

export const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
});