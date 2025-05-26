import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import styled from 'styled-components';

const StyledFooter = styled(Box)`
  background-color: ${props => props.theme.palette.primary.main};
  border-top: 4px solid #000;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterLink = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  margin: 0 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #4CAF50;
    transform: scale(1.05);
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, sm: 4 },
          }}
        >
          <FooterLink href="/privacy-policy">
            Privacy Policy
          </FooterLink>
          <FooterLink href="/terms-of-service">
            Terms of Service
          </FooterLink>
          <FooterLink href="/contact">
            Contact Us
          </FooterLink>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            color: '#FFFFFF',
            fontFamily: 'Press Start 2P, cursive',
            fontSize: '0.6rem',
          }}
        >
          © {new Date().getFullYear()} Us Chat. All rights reserved.
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer; 