const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://temple-management-software-front-en.vercel.app'
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// ✅ API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/poojas', require('./routes/poojas'));
app.use('/api/devotees', require('./routes/devotees'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/monthly-pooja', require('./routes/monthlyPoojaRoutes'));
app.use('/api/ramayana', require('./routes/ramayanaRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
