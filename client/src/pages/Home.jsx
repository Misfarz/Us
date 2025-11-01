import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  gap: 2rem;
`;

const Title = styled(Typography)`
  font-family: 'Press Start 2P', cursive;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Subtitle = styled(Typography)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #34495e;
  max-width: 600px;
  line-height: 1.8;
  animation: fadeIn 1s ease-in 0.3s both;
  padding: 0 1rem;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

const ChatOptionsContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;
  animation: fadeIn 1s ease-in 0.6s both;
  padding: 0 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

const ChatOption = styled(Paper)`
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 600px) {
    padding: 2rem;
    gap: 1rem;
  }
`;

const InterestInput = styled(TextField)`
  width: 100%;
  max-width: 600px;
  margin: 2rem 0;
  animation: fadeIn 1s ease-in 0.9s both;
  padding: 0 1rem;

  .MuiInputBase-root {
    background: white;
    border-radius: 8px;
    font-size: 1rem;
    padding: 0.5rem;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #2c3e50;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #3498db;
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #3498db;
  }

  @media (max-width: 600px) {
    max-width: 100%;
    margin: 1.5rem 0;
  }
`;

const StyledButton = styled(Button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 8px;
  text-transform: none;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState('');

  const handleStartChat = (type) => {
    navigate(`/${type}-chat`, { state: { interests } });
  };

  return (
    <HomeContainer>
      <Title variant="h1">
        Welcome to Us
      </Title>
      <Subtitle variant="h5">
        Connect with people who share your interests through video or text chat
      </Subtitle>

      <InterestInput
        label="Enter your interests (comma separated)"
        variant="outlined"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder="e.g., gaming, music, sports, movies, books"
        fullWidth
        multiline
        rows={2}
      />

      <ChatOptionsContainer>
        <ChatOption>
          <Typography variant="h5" color="primary" gutterBottom>
            Video Chat
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Connect face-to-face with others who share your interests
          </Typography>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => handleStartChat('video')}
          >
            Start Video Chat
          </StyledButton>
        </ChatOption>

        <ChatOption>
          <Typography variant="h5" color="secondary" gutterBottom>
            Text Chat
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Chat with others through text in a clean, minimalist interface
          </Typography>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => handleStartChat('text')}
          >
            Start Text Chat
          </StyledButton>
        </ChatOption>
      </ChatOptionsContainer>
    </HomeContainer>
  );
};

export default Home; 