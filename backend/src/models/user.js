const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
name: { type: String, required: true },
phone: { type: String, index: true },
email: { type: String, index: true },
passwordHash: String,
role: { type: String, enum: ['volunteer', 'organizer'], default: 'volunteer' },
skills: [String],
availability: {
from: Date,
to: Date,
status: { type: String, enum: ['available', 'unavailable'], default: 'available' }
},
location: {
type: { type: String, enum: ['Point'], default: 'Point' },
coordinates: { type: [Number], index: '2dsphere' }
}
}, { timestamps: true });


module.exports = mongoose.model('user', UserSchema);