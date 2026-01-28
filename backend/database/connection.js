const mongoose = require('mongoose');

const connectToDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connection successful');

    } catch (err) {
        console.error(err)
    }
}

module.exports = { connectToDB }
