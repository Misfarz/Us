import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    border: '2px solid #4CAF50',
  },
}));

const ReportDialog = ({ open, onClose, onReport, reportedUserId }) => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!reason) {
      setError('Please select a reason for reporting');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a description of the violation');
      return;
    }
    onReport({
      reportedUserId,
      reason,
      description: description.trim(),
      timestamp: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: '#4CAF50' }}>Report User</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: '#FFFFFF' }}>Reason for Report</InputLabel>
            <Select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              label="Reason for Report"
              sx={{
                color: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4CAF50',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#45a049',
                },
              }}
            >
              <MenuItem value="inappropriate_content">Inappropriate Content</MenuItem>
              <MenuItem value="harassment">Harassment</MenuItem>
              <MenuItem value="spam">Spam</MenuItem>
              <MenuItem value="hate_speech">Hate Speech</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': {
                  borderColor: '#4CAF50',
                },
                '&:hover fieldset': {
                  borderColor: '#45a049',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FFFFFF',
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
        >
          Submit Report
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ReportDialog; 