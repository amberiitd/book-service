// routes/auth.js
const express = require('express');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    return res.json({ token });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userModel.findByUsername(username);

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const userId = await userModel.createUser(username, password);

    const token = jwt.sign({ id: userId }, 'your-secret-key', { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
