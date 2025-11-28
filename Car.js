const mongoose = require('mongoose');


const CarSchema = new mongoose.Schema({
make: String,
model: String,
year: Number,
pricePerDay: Number,
available: { type: Boolean, default: true }
}, { timestamps: true });


module.exports = mongoose.model('Car', CarSchema);