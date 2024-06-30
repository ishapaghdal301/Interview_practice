const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGODB_URI);
        await mongoose.connect('mongodb+srv://ishapaghdal:ishapaghdal@todocluster.muxxfab.mongodb.net/ToDom?retryWrites=true&w=majority');
    }
    catch (err) {
        console.error(' Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;