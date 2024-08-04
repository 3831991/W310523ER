import { Card } from "../handlers/cards/cards.model.mjs";
import { User } from "../handlers/users/users.model.mjs";
import { initialData as data } from './initial-data.mjs';

(async () => {
    const userAmount = await User.find().countDocuments();
    
    if (!userAmount) {
        const userIds = [];

        for (const u of data.users) {
            const user = new User(u);
            const obj = await user.save();

            if (obj.isBusiness) {
                userIds.push(obj._id);
            }
        }

        for (const c of data.cards) {
            const card = new Card(c);
            const i = Math.floor(Math.random() * userIds.length);
            card.user_id = userIds[i];
            await card.save();
        }
    }
})();