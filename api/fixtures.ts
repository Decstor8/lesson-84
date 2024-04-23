import mongoose from "mongoose";
import config from "./config";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collections ${collectionName} was missing, skipping drop...`);
    }
};

const collections = ['tasks', 'users'];

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    for (const collection of collections) {
        await dropCollection(db, collection);
    }
};

void run();