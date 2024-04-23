import { Request, Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import { UserTypes } from "../../types";

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserTypes>}

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const headerValue = req.get('Authorization');

    if(!headerValue) {
        return res.status(401).send({error: 'No token provided!'});
    } 

    const [_, token] = headerValue.split(' ');
    const user = await User.findOne({token});

    if (!user) {
        return res.status(403).send({error: 'Wornd token!'});
    }

    req.user = user;
    next();
};

export default auth;