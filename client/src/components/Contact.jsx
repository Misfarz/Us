import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  text-align: center;
  background-color: ${props => props.theme.palette.background.paper};
  border: 3px solid #000;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 6px 6px 0px #000;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #000;
  }
`;

const StyledTypography = styled(Typography)`
  font-family: 'Press Start 2P', cursive;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    color: #000000;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.8rem;
    & fieldset {
      border-color: #4CAF50;
    }
    &:hover fieldset {
      border-color: #45a049;
    }
  }
  & .MuiInputLabel-root {
    color: #000000;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.7rem;
  }
`;

const StyledButton = styled(Button)`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  padding: 0.8rem 2rem;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Message sent successfully!',
      severity: 'success'
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 4,
            color: '#000000',
            textShadow: '3px 3px 0px #000',
            animation: 'pixelate 0.3s ease-in-out',
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 6,
            color: '#000000',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Have questions or feedback? We'd love to hear from you!
        </Typography>

        <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
          <StyledPaper>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <StyledTextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                />
                <StyledTextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                />
                <StyledTextField
                  required
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  variant="outlined"
                />
                <StyledTextField
                  required
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <StyledButton
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Send Message
                  </StyledButton>
                </Box>
              </Box>
            </form>
          </StyledPaper>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{
              fontFamily: 'Press Start 2P, cursive',
              fontSize: '0.7rem',
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Contact; 