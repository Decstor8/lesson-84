import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import { randomUUID } from 'crypto';
import { Methods, Models, UserTypes } from '../../types';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserTypes, Models, Methods>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.methods.checkPassword = function(password: string) {
    return bcrypt.compare(password, this.password); 
};

UserSchema.methods.generateToken = function() {
    this.token = randomUUID();
}

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash ;
    next();
});

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model<UserTypes, Models>('User', UserSchema);
export default User;