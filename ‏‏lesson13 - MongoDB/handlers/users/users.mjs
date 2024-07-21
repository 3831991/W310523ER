import { app } from "../../app.mjs";
import { User } from "./users.model.mjs";

app.get("/users", async (req, res) => {
    res.send(await User.find());
});

app.post("/users", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
    });

    const newUser = await user.save();

    res.send(newUser);
});
