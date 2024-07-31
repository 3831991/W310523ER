import mongoose, { Schema } from "mongoose";

const Address = new Schema({
    state: String,
    country: String,
    city: String,
    street: String,
    houseNamber: Number,
    zip: String,
});

const Image = new Schema({
    url: String,
    alt: String,
});

const schema = new Schema({
    title: String,
    subtitle: String,
    description: String,
    phone: String,
    email: String,
    address: Address,
    image: Image,
    web: String,
    likes: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export const Card = mongoose.model("cards", schema);