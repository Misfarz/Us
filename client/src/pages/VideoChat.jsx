import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, Paper, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSocket } from '../context/SocketContext';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const VideoContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const VideoBox = styled(Paper)`
  position: relative;
  aspect-ratio: 16/9;
  background-color: #000;
  border: 4px solid #000;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 767px) {
    max-width: 100%;
    margin-bottom: 1rem;
  }
`;

const LocalVideoBox = styled(VideoBox)`
  &::after {
    content: 'You';
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    z-index: 2;
  }
`;

const RemoteVideoBox = styled(VideoBox)`
  &::after {
    content: 'Stranger';
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    z-index: 2;
  }
`;

const Controls = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0 1rem;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CameraButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 2;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 767px) {
    padding: 8px;
  }
`;

const StatusMessage = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 90%;
  max-width: 400px;
  z-index: 2;
  padding: 1rem;

  @media (max-width: 767px) {
    width: 95%;
  }
`;

const VideoChat = () => {
  const location = useLocation();
  const { socket, onlineUsers } = useSocket();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [error, setError] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef();
  const interests = location.state?.interests || '';
  const roomId = useRef(`video-chat-${Date.now()}`);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing media devices:', err);
        setError('Failed to access camera and microphone. Please check your permissions.');
      }
    };

    initializeMedia();

    if (socket) {
      socket.on('signal', handleSignal);
      socket.on('user-connected', handleUserConnected);
      socket.on('user-disconnected', handleUserDisconnected);
      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setError('Failed to connect to server. Please try again later.');
      });

      return () => {
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
        }
        if (peerConnection.current) {
          peerConnection.current.close();
        }
        socket.off('signal');
        socket.off('user-connected');
        socket.off('user-disconnected');
        socket.off('connect_error');
      };
    }
  }, [socket]);

  const handleSignal = async (data) => {
    try {
      if (!peerConnection.current) {
        createPeerConnection();
      }
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.signal));
      if (data.signal.type === 'offer') {
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit('signal', {
          signal: answer,
          roomId: roomId.current
        });
      }
    } catch (err) {
      console.error('Error handling signal:', err);
      setError('Failed to establish video connection. Please try again.');
    }
  };

  const handleUserConnected = async (data) => {
    try {
      if (!peerConnection.current) {
        createPeerConnection();
      }
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit('signal', {
        signal: offer,
        roomId: roomId.current
      });
    } catch (err) {
      console.error('Error creating offer:', err);
      setError('Failed to create video connection. Please try again.');
    }
  };

  const handleUserDisconnected = () => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    setIsConnected(false);
    setError('The other user has disconnected.');
  };

  const createPeerConnection = () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    };

    peerConnection.current = new RTCPeerConnection(configuration);

    localStream.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, localStream);
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('signal', {
          signal: {
            type: 'candidate',
            candidate: event.candidate
          },
          roomId: roomId.current
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setRemoteStream(event.streams[0]);
        setIsConnected(true);
        setIsWaiting(false);
      }
    };

    peerConnection.current.oniceconnectionstatechange = () => {
      if (peerConnection.current.iceConnectionState === 'disconnected') {
        handleUserDisconnected();
      }
    };
  };

  const startChat = () => {
    setIsWaiting(true);
    setError(null);
    socket.emit('join-room', {
      roomId: roomId.current,
      interests: interests ? interests.split(',').map(i => i.trim()) : []
    });
  };

  const endChat = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setIsConnected(false);
    setIsWaiting(false);
    socket.emit('leave-room', roomId.current);
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box sx={{ 
      textAlign: 'center', 
      py: { xs: 2, sm: 3, md: 4 },
      px: { xs: 1, sm: 2, md: 3 }
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: { xs: 2, sm: 3, md: 4 }, 
          color: 'primary.main',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
        }}
      >
        Video Chat
      </Typography>

      <VideoContainer>
        <LocalVideoBox>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
              display: isCameraOn ? 'block' : 'none'
            }}
          />
          <CameraButton onClick={toggleCamera}>
            {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </CameraButton>
        </LocalVideoBox>

        <RemoteVideoBox>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
              display: isConnected ? 'block' : 'none'
            }}
          />
          {!isConnected && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                zIndex: 1
              }}
            >
              {isWaiting ? (
                <StatusMessage>
                  {onlineUsers === 1 ? (
                    <>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          color: 'white',
                          fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                      >
                        You're the only one online right now
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'white', 
                          mb: 2,
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                      >
                        Share this link with friends to start chatting!
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          color: 'white',
                          fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                      >
                        Finding a match...
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'white', 
                          mb: 2,
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                      >
                        {onlineUsers} users online
                      </Typography>
                      <CircularProgress size={60} thickness={4} sx={{ color: 'white' }} />
                    </>
                  )}
                </StatusMessage>
              ) : (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    textAlign: 'center',
                    px: 2
                  }}
                >
                  Waiting for stranger...
                </Typography>
              )}
            </Box>
          )}
        </RemoteVideoBox>
      </VideoContainer>

      <Controls>
        {!isConnected ? (
          <Button
            variant="contained"
            color="primary"
            onClick={startChat}
            disabled={isWaiting}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              minWidth: { xs: '200px', sm: '120px' }
            }}
          >
            {isWaiting ? 'Searching...' : 'Start Chat'}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={endChat}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              minWidth: { xs: '200px', sm: '120px' }
            }}
          >
            End Chat
          </Button>
        )}
      </Controls>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VideoChat; 