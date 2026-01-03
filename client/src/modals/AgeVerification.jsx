import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2C2C2C',
  padding: theme.spacing(4),
  borderRadius: '8px',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
  border: '2px solid #4CAF50',
}));

const AgeVerification = ({ onVerified, onDecline }) => {
  const [open, setOpen] = useState(true);

  const handleVerify = () => {
    setOpen(false);
    onVerified();
  };

  const handleDecline = () => {
    setOpen(false);
    onDecline();
  };

  return (
    <StyledModal
      open={open}
      onClose={(event, reason) => {
        // Prevent closing on backdrop click or escape key
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
      }}
    >
      <ModalContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#4CAF50', fontFamily: 'Press Start 2P, cursive' }}>
          Age Verification
        </Typography>
        <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 3, fontFamily: 'Press Start 2P, cursive', fontSize: '0.8rem' }}>
          You must be 18 years or older to access this chat.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleVerify}
            sx={{
              backgroundColor: '#4CAF50',
              fontFamily: 'Press Start 2P, cursive',
              fontSize: '0.7rem',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            I am 18 or older
          </Button>
          <Button
            variant="outlined"
            onClick={handleDecline}
            sx={{
              borderColor: '#f44336',
              color: '#f44336',
              fontFamily: 'Press Start 2P, cursive',
              fontSize: '0.7rem',
              '&:hover': {
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
              },
            }}
          >
            I am under 18
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default AgeVerification; 