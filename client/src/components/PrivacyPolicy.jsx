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

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <StyledTypography variant="h4" component="h1" gutterBottom sx={{ color: '#4CAF50' }}>
          Privacy Policy
        </StyledTypography>
        
        <StyledPaper>
          <StyledTypography variant="h6" gutterBottom>
            1. Information We Collect
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            We collect minimal information necessary for the chat functionality:
            - Anonymous chat messages
            - Temporary video streams
            - Basic usage statistics
          </StyledTypography>

          <StyledTypography variant="h6" gutterBottom>
            2. How We Use Your Information
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            Your information is used solely for:
            - Providing chat services
            - Maintaining chat quality
            - Ensuring user safety
          </StyledTypography>

          <StyledTypography variant="h6" gutterBottom>
            3. Data Storage
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            - Chat messages are not permanently stored
            - Video streams are not recorded
            - No personal data is collected
          </StyledTypography>

          <StyledTypography variant="h6" gutterBottom>
            4. User Rights
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            You have the right to:
            - End any chat session
            - Report inappropriate behavior
            - Request account deletion
          </StyledTypography>

          <StyledTypography variant="h6" gutterBottom>
            5. Contact
          </StyledTypography>
          <StyledTypography variant="body1">
            For privacy concerns, contact us at:
            privacy@uschat.com
          </StyledTypography>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy; 