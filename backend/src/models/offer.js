const mongoose3 = require('mongoose');
const Schema3 = mongoose3.Schema;


const OfferSchema = new Schema3({
title: { type: String, required: true },
description: String,
category: { type: String, index: true },
quantityAvailable: Number,
providerName: String,
contact: String,
location: {
type: { type: String, enum: ['Point'], default: 'Point' },
coordinates: { type: [Number], index: '2dsphere' }
},
availableUntil: Date,
status: { type: String, enum: ['available','reserved','distributed'], default: 'available' },
metadata: Schema3.Mixed
}, { timestamps: true });


module.exports = mongoose3.model('offer', OfferSchema);