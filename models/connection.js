const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || "mongodb://localhost/podster";

mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to mongo at: " + connectionString);
    })
    .catch((err) => {
        console.log("Failed to connect to Mongoose")
    })


module.exports = mongoose