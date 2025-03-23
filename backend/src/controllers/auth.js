const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });

    res.status(201).json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signOut = (req, res) => {
  res.json({ message: 'User signed out' });
};

exports.getMe = async (req, res) => {
  const userId = req.headers['x-user-id'];

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};