const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ List of allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://temple-management-software-front-en.vercel.app',
];

// ✅ CORS config with credentials
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

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
app.use('/api/old-pending-payments', require('./routes/oldPendingPayments'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
