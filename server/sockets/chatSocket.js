import Report from '../models/Report.js';

const onlineUsers = new Map();
const textChatUsers = new Set();

const findMatchingUser = (socketId, interests) => {
  const currentUser = onlineUsers.get(socketId);
  if (!currentUser) return null;

  for (const [id, user] of onlineUsers.entries()) {
    if (
      id !== socketId &&
      !user.roomId &&
      user.interests &&
      Array.isArray(user.interests)
    ) {
      const common = user.interests.filter(i => interests && interests.includes(i));
      if (common.length > 0) return id;
    }
  }

  for (const [id, user] of onlineUsers.entries()) {
    if (id !== socketId && !user.roomId) return id;
  }
  return null;
};

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    const username = `User${Math.floor(Math.random() * 1000)}`;
    onlineUsers.set(socket.id, { interests: [], roomId: null, username });
    io.emit('user-count', onlineUsers.size);

    socket.on('join-room', (data) => {
      if (!data) return;

      const { roomId, interests = [] } = data;
      const user = onlineUsers.get(socket.id);
      if (!user) return;

      user.interests = Array.isArray(interests) ? interests : [];
      user.roomId = roomId;

      if (roomId === 'text-chat') {
        textChatUsers.add(socket.id);
        socket.join('text-chat');
      } else {
        const match = findMatchingUser(socket.id, interests);
        if (match) {
          const chatRoom = `chat-${socket.id}-${match}`;
          socket.join(chatRoom);
          io.sockets.sockets.get(match).join(chatRoom);

          onlineUsers.get(socket.id).roomId = chatRoom;
          onlineUsers.get(match).roomId = chatRoom;

          io.to(chatRoom).emit('user-connected', { roomId: chatRoom, interests });
        }
      }
    });

    socket.on('send-message', (data) => {
      const user = onlineUsers.get(socket.id);
      if (!user) return;

      const msg = {
        ...data,
        sender: user.username,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString()
      };

      if (data.roomId === 'text-chat') {
        io.to('text-chat').emit('receive-message', msg);
      } else {
        io.to(data.roomId).emit('receive-message', msg);
      }
    });

    socket.on('report-user', async (data) => {
      try {
        const report = new Report({
          ...data,
          reporterId: socket.id,
          reporterUsername: onlineUsers.get(socket.id)?.username
        });
        await report.save();
        socket.emit('report-submitted', { success: true });
      } catch (err) {
        socket.emit('report-submitted', { success: false });
      }
    });

    socket.on('signal', (data) => {
      io.to(data.roomId).emit('signal', { signal: data.signal, userId: socket.id });
    });

    socket.on('disconnect', () => {
      const user = onlineUsers.get(socket.id);
      if (user?.roomId) io.to(user.roomId).emit('user-disconnected');
      if (textChatUsers.has(socket.id)) io.to('text-chat').emit('user-disconnected');

      onlineUsers.delete(socket.id);
      textChatUsers.delete(socket.id);
      io.emit('user-count', onlineUsers.size);
      console.log('Client disconnected');
    });
  });
};

export default chatSocket;
