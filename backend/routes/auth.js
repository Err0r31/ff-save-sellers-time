import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ where: { login } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Неверные учетные данные" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
