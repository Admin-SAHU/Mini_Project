const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
renterName: String,
from: Date,
to: Date
}, { timestamps: true });


module.exports = mongoose.model('Booking', BookingSchema);