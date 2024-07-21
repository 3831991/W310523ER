import { app } from "../../app.mjs";
import { User } from "./users.model.mjs";
import bcrypt from 'bcrypt';

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(403).send("email or password is incorrect");
    }

    if (!user.password || user.password !== password) {

    }

    res.send(user);
});

app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    if (await User.findOne({ email })) {
        return res.status(403).send("Already exists");
    }

    const user = new User({
        firstName,
        lastName,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
    });

    const newUser = await user.save();

    res.send(newUser);
});