import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import ReportIcon from '@mui/icons-material/Report';
import { useSocket } from '../context/SocketContext';

const StyledAppBar = styled(AppBar)`
  background-color: ${props => props.theme.palette.primary.main};
  border-bottom: 4px solid #000;
  box-shadow: 0 4px 0 #000;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 600px) {
    padding: 0.5rem 2rem;
  }
`;

const Logo = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 2px 2px 0px #000;
  transition: all 0.2s ease-in-out;

  @media (min-width: 600px) {
    font-size: 1.5rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const OnlineCount = styled(Typography)`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  color: #4CAF50;
  background-color: #000;
  padding: 0.4rem 0.8rem;
  border: 2px solid #4CAF50;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 600px) {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #4CAF50;
    border-radius: 50%;
    display: inline-block;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ReportButton = styled(IconButton)`
  background-color: #000;
  color: #f44336;
  border: 2px solid #f44336;
  padding: 0.4rem;
  transition: all 0.2s ease-in-out;

  @media (min-width: 600px) {
    padding: 0.5rem;
  }

  &:hover {
    background-color: #f44336;
    color: #fff;
    transform: translate(2px, 2px);
  }
`;

const Layout = ({ children }) => {
  const { onlineUsers } = useSocket();
  const location = useLocation();
  const isChatPage = location.pathname.includes('/video-chat') || location.pathname.includes('/text-chat');

  const handleReport = () => {
    // Implement report functionality
    console.log('Report button clicked');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Logo
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontFamily: 'Press Start 2P, cursive',
            }}
          >
            Us
          </Logo>
          {isChatPage ? (
            <Tooltip title="Report User">
              <ReportButton onClick={handleReport}>
                <ReportIcon />
              </ReportButton>
            </Tooltip>
          ) : (
            <OnlineCount>
              Online: {onlineUsers}
            </OnlineCount>
          )}
        </StyledToolbar>
      </StyledAppBar>
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout; 