const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://shehnazshihab:shehnazzshifa@cluster0.e3vkxz7.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Connection error", error);
    });

module.exports = mongoose;
