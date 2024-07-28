import { app } from "../../app.mjs";
import { JWT_SECRET } from "../../config.mjs";
import { User } from "./users.model.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(403).send("email or password is incorrect");
    }

    // היות ולא לכולם יש סיסמה, אם אין סיסמה זה נופל באימות
    // משווים בין הסיסמה שקיבלנו מהלקוח לסיסמה המוצפנת שבמסד הנתונים
    // (הסדר משמעותי: קודם כל הסיסמה הלא-מוצפנת)
    if (!user.password || !await bcrypt.compare(password, user.password)) {
        return res.status(403).send("email or password is incorrect");
    }

    /**
     * 1. תוכן שבתוקן.
     * 2. מפתח סודי.
     * 3. עוד הגדרות.
     */
    const token = jwt.sign({
        _id: user._id,
        lastName: user.lastName,
        firstName: user.firstName
    }, JWT_SECRET, { expiresIn: '1h' });

    res.send(token);
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

app.get("/login", async (req, res) => {
    // if (req.session.user) {
    //     res.send(req.session.user);
    // } else {
    //     return res.status(401).send("user is not logged in");
    // }

    return res.status(401).send("user is not logged in");
});
