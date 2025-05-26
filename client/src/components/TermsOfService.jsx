import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
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

const TermsOfService = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <StyledTypography variant="h4" component="h1" gutterBottom sx={{ color: '#4CAF50' }}>
          Terms of Service
        </StyledTypography>
        
        <StyledPaper>
          <StyledTypography variant="h6" gutterBottom>
            1. Age Requirement
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            - Must be 18 years or older
            - Age verification required
            - No exceptions to age policy
          </StyledTypography>

          <StyledTypography variant="h6" gutterBottom>
            2. User Conduct
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            Users must not:
            - Share inappropriate content
            - Harass other users
            - Spam or flood chat
            - Use hate speech
          </StyledTypography>

          <StyledTypography variant="h6" gutterBottom>
            3. Privacy
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            - Chat is anonymous
            - No personal data stored
            - Report violations
          </StyledTypography>

          <StyledTypography variant="h6" gutterBottom>
            4. Moderation
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            We reserve the right to:
            - Ban violators
            - Remove content
            - End chat sessions
          </StyledTypography>

          <StyledTypography variant="h6" gutterBottom>
            5. Disclaimer
          </StyledTypography>
          <StyledTypography variant="body1">
            We are not responsible for:
            - User behavior
            - Chat content
            - External links
          </StyledTypography>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default TermsOfService; 