# Us Chat Application

A Minecraft-themed anonymous chat application with video and text chat capabilities.

## Features

- Anonymous video and text chat
- Age verification
- User reporting system
- Real-time online user count
- Minecraft-style UI
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd us-chat
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

## Development

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm run dev
```

## Production Deployment

### Server Deployment

1. Set up environment variables in `server/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
CLIENT_URL=your_client_url
NODE_ENV=production
```

2. Build and start the server:
```bash
cd server
npm start
```

### Client Deployment

1. Build the client:
```bash
cd client
npm run build
```

2. Serve the built files:
```bash
npm start
```

## Deployment Options

### Option 1: Traditional Hosting

1. Deploy the server to a Node.js hosting service (e.g., Heroku, DigitalOcean)
2. Deploy the client to a static hosting service (e.g., Netlify, Vercel)
3. Update the environment variables accordingly

### Option 2: Docker Deployment

1. Build the Docker images:
```bash
docker build -t us-chat-server ./server
docker build -t us-chat-client ./client
```

2. Run the containers:
```bash
docker run -d -p 5000:5000 us-chat-server
docker run -d -p 80:80 us-chat-client
```

## Environment Variables

### Server
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `CLIENT_URL`: Client application URL
- `NODE_ENV`: Environment (development/production)

### Client
- `VITE_API_URL`: Server API URL
- `VITE_SOCKET_URL`: WebSocket server URL

## Security Considerations

1. Enable HTTPS
2. Set up proper CORS configuration
3. Implement rate limiting
4. Set up proper MongoDB authentication
5. Use environment variables for sensitive data

## Monitoring

1. Set up logging
2. Monitor server resources
3. Track user activity
4. Set up error reporting

## Support

For support, please contact:
- Email: support@uschat.com
- GitHub Issues: [Repository Issues](https://github.com/your-repo/issues) 