const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');


function optional(req, res, next) {
const auth = req.headers.authorization;
if (!auth) return next();
const token = auth.split(' ')[1];
try {
const payload = jwt.verify(token, jwtSecret);
req.user = payload;
} catch (err) {
// ignore invalid token
}
next();
}


function required(req, res, next) {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ error: 'missing token' });
const token = auth.split(' ')[1];
try {
const payload = jwt.verify(token, jwtSecret);
req.user = payload;
next();
} catch (err) {
return res.status(401).json({ error: 'invalid token' });
}
}


module.exports = { optional, required };