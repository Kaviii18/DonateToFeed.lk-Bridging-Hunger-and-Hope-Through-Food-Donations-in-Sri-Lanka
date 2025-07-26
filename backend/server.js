require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

// ✅ Socket.IO
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  socket.on('sendMessage', (msg) => {
    io.emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

// ✅ Import Routes
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const donationRoutes = require('./routes/donationRoutes');
const feedRequestRoutes = require('./routes/feedRequestRoutes');
const chatRoutes = require('./routes/chatRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const availableDonationRoutes = require('./routes/availableDonationRoutes');
const statsRoutes = require('./routes/statsRoutes');
const contactRoutes = require('./routes/contactRoutes');

// ✅ Models
const AvailableDonation = require('./models/AvailableDonation');
const User = require('./models/userModel');

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routing
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/feed-requests', feedRequestRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/available-donations', availableDonationRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);

// ✅ Serve React Frontend (for Heroku deployment)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// ✅ Sample Admin Seeder
async function insertSampleAdmin() {
  const exists = await User.findOne({ email: 'admin@demo.com' });
  if (!exists) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@demo.com',
      address: 'Admin HQ',
      contact: '0771234567',
      password: hashedPassword,
      role: 'Admin'
    });
    console.log('✅ Sample admin user created.');
  } else {
    console.log('✅ Sample admin already exists.');
  }
}

// ✅ Sample Doner and Receiver Seeder
async function insertSampleUsers() {
  const doner = await User.findOne({ email: 'doner@demo.com' });
  const receiver = await User.findOne({ email: 'receiver@demo.com' });

  if (!doner) {
    const hashed = await bcrypt.hash('Doner@123', 10);
    await User.create({
      name: 'Doner Kumar',
      email: 'doner@demo.com',
      address: 'Colombo',
      contact: '0770001111',
      password: hashed,
      role: 'Doner'
    });
    console.log('✅ Sample Doner user created.');
  } else {
    console.log('✅ Sample Doner already exists.');
  }

  if (!receiver) {
    const hashed = await bcrypt.hash('Receiver@123', 10);
    await User.create({
      name: 'Receiver Silva',
      email: 'receiver@demo.com',
      address: 'Kandy',
      contact: '0770002222',
      password: hashed,
      role: 'Receiver'
    });
    console.log('✅ Sample Receiver user created.');
  } else {
    console.log('✅ Sample Receiver already exists.');
  }
}

// ✅ Connect MongoDB + Seed
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected.");
    await insertSampleAdmin();
    await insertSampleUsers();

    const count = await AvailableDonation.countDocuments();
    if (count === 0) {
      await AvailableDonation.insertMany([
        {
          img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
          location: "Colombo 03",
          category: "Fresh Vegetables",
          availability: "Available",
          amount: "5 kg",
          expiry: "in 4 hours",
          note: "Expires soon"
        },
        {
          img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
          location: "Kandy",
          category: "Bread and Pastries",
          availability: "Available",
          amount: "20 pieces",
          expiry: "in 1 day",
          note: "Donor: City Bakery"
        },
        {
          img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
          location: "Galle",
          category: "Cooked Meals",
          availability: "Available",
          amount: "5 kg",
          expiry: "in 6 hours",
          note: "Rice and curry"
        },
        {
          img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
          location: "Negombo",
          category: "Fresh Fruits",
          availability: "Available",
          amount: "3 kg",
          expiry: "in 12 hours",
          note: "Avocados"
        },
        {
          img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
          location: "Jaffna",
          category: "Rice and Grains",
          availability: "Available",
          amount: "10 kg",
          expiry: "in 2 days",
          note: "Long grain rice"
        },
        {
          img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
          location: "Tangalle",
          category: "Dairy Products",
          availability: "Available",
          amount: "5 kg",
          expiry: "in 8 hours",
          note: "Milk packets"
        },
        {
          img: "https://images.unsplash.com/photo-1590080876805-300d636f7f3d?auto=format&fit=crop&w=600&q=80",
          location: "Matara",
          category: "Dry Goods",
          availability: "Available",
          amount: "4 kg",
          expiry: "in 10 hours",
          note: "Note for dry goods"
        },
        {
          img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80",
          location: "Kurunegala",
          category: "Fresh Fruits",
          availability: "Available",
          amount: "9 kg",
          expiry: "in 5 hours",
          note: "Note for fresh fruits"
        }
      ]);
      console.log("📦 Sample donations added!");
    } else {
      console.log("📦 Sample donations already exist.");
    }
  })
  .catch((err) => console.log("❌ MongoDB error:", err));

// ✅ Server Listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
