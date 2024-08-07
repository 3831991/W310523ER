import { app } from "../../app.mjs";
import { User } from "./users.model.mjs";
import bcrypt from 'bcrypt';

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

    // שמירת היוזר בסשיין
    req.session.user = user;
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

app.get("/login", async (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        return res.status(401).send("user is not logged in");
    }
});

app.get("/logout", (req, res) => {
    delete req.session.user;

    res.end();
});