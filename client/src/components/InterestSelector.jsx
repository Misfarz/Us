import React, { useState } from 'react';
import { Box, Typography, Chip, Paper, Button } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  background-color: #2C2C2C;
  color: #FFFFFF;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px #000;
`;

const StyledTypography = styled(Typography)`
  font-family: 'Press Start 2P', cursive;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const InterestChip = styled(Chip)`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  margin: 0.5rem;
  background-color: ${props => props.selected ? '#4CAF50' : '#000'};
  color: ${props => props.selected ? '#000' : '#FFFFFF'};
  border: 2px solid #4CAF50;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
`;

const StyledButton = styled(Button)`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  padding: 0.8rem 2rem;
  background-color: #4CAF50;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  transition: all 0.2s ease-in-out;
  margin-top: 1rem;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
    background-color: #45a049;
  }
`;

const interests = [
  'Gaming',
  'Music',
  'Movies',
  'Sports',
  'Technology',
  'Art',
  'Books',
  'Travel',
  'Food',
  'Fitness',
  'Science',
  'History',
  'Fashion',
  'Photography',
  'Nature',
  'Cars',
  'Politics',
  'Education',
  'Business',
  'Health'
];

const InterestSelector = ({ onInterestsSelected }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestClick = (interest) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedInterests.length > 0) {
      onInterestsSelected(selectedInterests);
    }
  };

  return (
    <StyledPaper>
      <StyledTypography variant="h5" gutterBottom>
        Select Your Interests
      </StyledTypography>
      <StyledTypography variant="body2" sx={{ mb: 2, fontSize: '0.7rem' }}>
        Choose at least one interest to match with similar users
      </StyledTypography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {interests.map((interest) => (
          <InterestChip
            key={interest}
            label={interest}
            onClick={() => handleInterestClick(interest)}
            selected={selectedInterests.includes(interest)}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <StyledButton
          variant="contained"
          onClick={handleSubmit}
          disabled={selectedInterests.length === 0}
        >
          Start Chat
        </StyledButton>
      </Box>
    </StyledPaper>
  );
};

export default InterestSelector; 