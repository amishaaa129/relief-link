const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret, jwtExpiresIn } = require('../config');


async function register(req, res) {
try {
const { name, phone, password, role = 'volunteer' } = req.body;
if (!name || !phone) return res.status(400).json({ error: 'name and phone required' });
const existing = await User.findOne({ phone });
if (existing) return res.status(409).json({ error: 'phone exists' });


const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
const user = await User.create({ name, phone, passwordHash, role });
const token = jwt.sign({ sub: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'server error' });
}
}


async function login(req, res) {
try {
const { phone, password } = req.body;
if (!phone || !password) return res.status(400).json({ error: 'phone and password required' });
const user = await User.findOne({ phone });
if (!user || !user.passwordHash) return res.status(401).json({ error: 'invalid' });


const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: 'invalid' });


const token = jwt.sign({ sub: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'server error' });
}
}


module.exports = { register, login };