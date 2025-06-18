const jwt = require('jsonwebtoken');

// Simple hardcoded user for demo
const adminUser = {
  id: '1',
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username || password !== adminUser.password) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const payload = { user: { id: adminUser.id } };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};

exports.getMe = (req, res) => {
  res.json({ id: req.user.id, username: adminUser.username });
};
