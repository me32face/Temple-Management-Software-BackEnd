const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Add this line
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for your frontend (Vite)
app.use(cors({
  origin: 'https://temple-management-software-front-en.vercel.app', // allow frontend during development
  credentials: true,               // needed if using cookies or auth headers
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/poojas', require('./routes/poojas'));
app.use('/api/devotees', require('./routes/devotees'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
