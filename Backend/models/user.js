const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    place: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    education: { type: String, required: true },
    contact: { type: String, required: true },
    termsAccepted: { type: Boolean, required: true },
    password: { type: String, required: true },
    rentedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
