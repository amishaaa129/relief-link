const mongoose2 = require('mongoose');
const Schema2 = mongoose2.Schema;


const NeedSchema = new Schema2({
title: { type: String, required: true },
description: String,
category: { type: String, index: true },
quantity: Number,
reporterName: String,
contact: String,
location: {
type: { type: String, enum: ['Point'], default: 'Point' },
coordinates: { type: [Number], index: '2dsphere' }
},
status: { type: String, enum: ['pending','assigned','fulfilled','rejected'], default: 'pending' },
assignedTo: { type: Schema2.Types.ObjectId, ref: 'User', default: null },
urgent: { type: Boolean, default: false },
metadata: Schema2.Mixed
}, { timestamps: true });


NeedSchema.index({ createdAt: 1 });


module.exports = mongoose2.model('need', NeedSchema);