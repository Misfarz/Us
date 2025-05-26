import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import Home from './components/Home';
import VideoChat from './components/VideoChat';
import TextChat from './components/TextChat';
import AgeVerification from './components/AgeVerification';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import { SocketProvider } from './context/SocketContext';

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!isAgeVerified) {
      return (
        <AgeVerification 
          onVerified={() => setIsAgeVerified(true)} 
          onDecline={() => {
            window.location.href = 'https://youtu.be/YAg5Dg2jSF8?si=Sa8F6L_NjaOIjXTy';
          }}
        />
      );
    }
    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <SocketProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/video-chat" 
                  element={
                    <ProtectedRoute>
                      <VideoChat />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/text-chat" 
                  element={
                    <ProtectedRoute>
                      <TextChat />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          </Router>
        </SocketProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App; 