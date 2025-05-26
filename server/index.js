const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const Report = require('./models/Report');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling'],
  allowEIO3: true
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Database connection with retry
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB Atlas...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority'
    });
    console.log('Successfully connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.error('Connection URI:', process.env.MONGODB_URI);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB Atlas');
  // Attempt to reconnect
  setTimeout(connectDB, 5000);
});

// Connect to MongoDB
connectDB();

// Track online users and their interests
const onlineUsers = new Map(); // socketId -> { interests: [], roomId: null, username: null }
const textChatUsers = new Set(); // Track users in text chat

// Function to find matching users
const findMatchingUser = (socketId, interests) => {
  const currentUser = onlineUsers.get(socketId);
  if (!currentUser) return null;

  // First try to find users with matching interests
  for (const [id, user] of onlineUsers.entries()) {
    if (id !== socketId && !user.roomId && user.interests && Array.isArray(user.interests)) {
      const commonInterests = user.interests.filter(interest => 
        interests && Array.isArray(interests) && interests.includes(interest)
      );
      if (commonInterests.length > 0) {
        return id;
      }
    }
  }

  // If no matching interests, find any available user
  for (const [id, user] of onlineUsers.entries()) {
    if (id !== socketId && !user.roomId) {
      return id;
    }
  }

  return null;
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');
  const username = `User${Math.floor(Math.random() * 1000)}`;
  onlineUsers.set(socket.id, { interests: [], roomId: null, username });
  io.emit('user-count', onlineUsers.size);

  // Handle joining a room with interests
  socket.on('join-room', (data) => {
    if (!data) {
      console.log('No data received in join-room event');
      return;
    }
    
    const { roomId, interests = [] } = data;
    const currentUser = onlineUsers.get(socket.id);
    if (!currentUser) {
      console.log('User not found in onlineUsers map');
      return;
    }
    
    currentUser.interests = Array.isArray(interests) ? interests : [];
    currentUser.roomId = roomId;

    if (roomId === 'text-chat') {
      textChatUsers.add(socket.id);
      socket.join('text-chat');
      console.log('User joined text chat');
    } else {
      const matchingUser = findMatchingUser(socket.id, interests);
      if (matchingUser) {
        // Create a unique room for these users
        const chatRoom = `chat-${socket.id}-${matchingUser}`;
        socket.join(chatRoom);
        io.sockets.sockets.get(matchingUser).join(chatRoom);
        
        // Update room IDs for both users
        onlineUsers.get(socket.id).roomId = chatRoom;
        onlineUsers.get(matchingUser).roomId = chatRoom;

        // Notify both users
        io.to(chatRoom).emit('user-connected', {
          roomId: chatRoom,
          interests: interests
        });
      }
    }
  });

  // Handle text messages
  socket.on('send-message', (data) => {
    console.log('Message received:', data);
    const user = onlineUsers.get(socket.id);
    if (!user) return;

    const messageData = {
      ...data,
      sender: user.username,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString()
    };

    if (data.roomId === 'text-chat') {
      io.to('text-chat').emit('receive-message', messageData);
    } else {
      io.to(data.roomId).emit('receive-message', messageData);
    }
  });

  // Handle user reports
  socket.on('report-user', async (reportData) => {
    try {
      const report = new Report({
        ...reportData,
        reporterId: socket.id,
        reporterUsername: onlineUsers.get(socket.id)?.username
      });
      await report.save();
      
      console.log('New report received:', report);
      socket.emit('report-submitted', { success: true });
    } catch (error) {
      console.error('Error saving report:', error);
      socket.emit('report-submitted', { success: false, error: 'Failed to submit report' });
    }
  });

  // Handle video chat signaling
  socket.on('signal', (data) => {
    io.to(data.roomId).emit('signal', {
      signal: data.signal,
      userId: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    const user = onlineUsers.get(socket.id);
    if (user && user.roomId) {
      io.to(user.roomId).emit('user-disconnected');
    }
    if (textChatUsers.has(socket.id)) {
      textChatUsers.delete(socket.id);
      io.to('text-chat').emit('user-disconnected');
    }
    onlineUsers.delete(socket.id);
    io.emit('user-count', onlineUsers.size);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.get('/', (req, res) => {
  res.send('Us Chat Server is running');
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 