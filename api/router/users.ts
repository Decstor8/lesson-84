import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();
        await user.save();
        return res.send(user);

    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(err);
        }
        next(err);
    };
});

 usersRouter.post('/sessions', async (req, res, next) => {
    try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username or password are not correct!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password are not correct!'});
    }

    user.generateToken();
    user.save();
    return res.send({message: 'Username and password correct!', user});
} catch (e) {
    next(e);
}
 });
export default usersRouter;