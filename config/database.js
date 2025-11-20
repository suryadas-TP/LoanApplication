const mongoose = require('mongoose');
const MONGO_URI = process.env.CONNECTION_STRING;


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('mongoDB connected');

    } catch (error) {
        console.error('mongoDB connection error', error);
        process.exit(1);

    }
};

module.exports = connectDB;