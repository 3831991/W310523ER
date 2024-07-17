import mongoose from "mongoose";
import { app } from "../../app.mjs";
import { userSchema } from "./users.model.mjs";

const User = mongoose.model("users", userSchema);

app.get("/users", async (req, res) => {
    res.send(await User.find());
});