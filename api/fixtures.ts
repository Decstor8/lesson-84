import mongoose from "mongoose";
import config from "./config";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collections ${collectionName} was missing, skipping drop...`);
    }
};

const collections = ['products', 'categories', 'users'];

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    for (const collection of collections) {
        await dropCollection(db, collection);
    }
//модели категор
    const [cpuCategory, ssdCategory] = await Category.create({
        title: 'Cpus',
        description: 'Central Proccesing Units',
    }, {
        title: 'Ssd',
        description: 'Solid State Drives',
    });

    await Product.create({
        title: 'Intel core i7',
        price: 450,
        category: cpuCategory,
        image: 'fixtures/cpu.jpg',
    }, {
        title: 'Samsung 990 Pro 1TB',
        price: 150,
        category: ssdCategory,
        image: 'fixtures/ssd.jpg',
    },);

    await User.create({
        username: 'user',
        password: '123Qwerty',
        token: crypto.randomUUID(),
    });

    await db.close();
};

void run();