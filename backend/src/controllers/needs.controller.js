const Need = require('../models/need');
const { findVolunteersNearby } = require('../services/geo.service');
const notification = require('../services/notification.service');

async function createNeed(req, res) {
try {
const { title, description, category, lat, lng, urgent, contact } = req.body;
if (!title || lat == null || lng == null) return res.status(400).json({ error: 'missing fields' });


const need = await Need.create({
title, description, category,
location: { type: 'Point', coordinates: [lng, lat] },
urgent: !!urgent,
contact
});

const minimal = {
id: need._id,
title: need.title,
category: need.category,
coordinates: need.location.coordinates,
urgent: need.urgent,
status: need.status
};

// Notify organizers + nearby volunteers
notification.notifyOrganizers('need:created', minimal);
const volunteers = await findVolunteersNearby(lng, lat, 5);
for (const v of volunteers) notification.notifyVolunteer(v._id, 'need:created', minimal);
res.status(201).json({ success: true, need });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'server error' });
}
}

async function listNeeds(req, res) {
try {
const { lng, lat, radius = 5, status, category, urgent } = req.query;
const filters = {};
if (status) filters.status = status;
if (category) filters.category = category;
if (urgent) filters.urgent = urgent === 'true';


if (lng && lat) {
const meters = Math.round(Number(radius) * 1000);
const nearby = await Need.find({
...filters,
location: {
$near: {
$geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
$maxDistance: meters
}
}
}).limit(200);
return res.json({ needs: nearby });
}


const needs = await Need.find(filters).limit(200);
res.json({ needs });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'server error' });
}
}


module.exports = { createNeed, listNeeds };