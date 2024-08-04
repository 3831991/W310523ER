import { app } from "../../app.mjs";
import { getUser, guard } from "../../guard.mjs";
import { User } from "./users.model.mjs";

app.get("/users", guard, async (req, res) => {
    res.send(await User.find({ isDeleted: { $ne: true } }));
});

app.get("/users/:id", guard, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(403).send({ message: "User not found" });
    }

    if (getUser(req).isAdmin || user._id == getUser(req)._id) {
        res.send(user);
    } else {
        res.status(401).send('User is not authorized');
    }
});

app.post("/users", guard, async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
    });

    const newUser = await user.save();

    res.send(newUser);
});

app.put("/users/:id", guard, async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(403).send({ message: "User not found" });
    }

    user.firstName  = firstName;
    user.lastName   = lastName;
    user.email      = email;
    user.phone      = phone;

    await user.save();

    res.send(user);
});

app.delete("/users/:id", guard, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.end();
});

// שיטה נוספת ויותר נוחה (בהמלצת מיכאל וריאן)
// app.put("/users/:id", async (req, res) => {
//     const { firstName, lastName, email, phone } = req.body;
//     const user = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, email, phone });

//     if (!user) {
//         return res.status(403).send({ message: "User not found" });
//     }

//     res.send(user);
// });