import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import VideoChat from './pages/VideoChat';
import TextChat from './pages/TextChat';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import ProtectedRoute from './utils/ProtectedRoutes';
import { SocketProvider } from './context/SocketContext';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <SocketProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video-chat" element={<ProtectedRoute> <VideoChat /></ProtectedRoute> }/>
                <Route path="/text-chat" element={<ProtectedRoute><TextChat /> </ProtectedRoute>  }/>
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