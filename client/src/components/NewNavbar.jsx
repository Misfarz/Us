import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Modal, Box, Typography, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background-color: #2c3e50;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
`;

const NavButton = styled(Button)`
  color: white;
  margin: 0 8px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const GuideButton = styled(IconButton)`
  color: white;
  margin-left: 16px;
  padding: 8px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #2c3e50;
`;

const ModalText = styled(Typography)`
  margin-bottom: 12px;
  color: #34495e;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  margin: 16px 0;
  padding-left: 20px;
`;

const FeatureItem = styled.li`
  margin-bottom: 8px;
  color: #34495e;
`;

const ReportButton = styled(Button)`
  color: #e74c3c;
  margin: 0 8px;
  &:hover {
    background-color: rgba(231, 76, 60, 0.1);
  }
`;

const ReportOption = styled(Button)`
  margin: 8px;
  width: 100%;
  text-transform: none;
`;

const Navbar = () => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const location = useLocation();

  const handleGuideOpen = () => setGuideOpen(true);
  const handleGuideClose = () => setGuideOpen(false);
  const handleReportOpen = () => setReportOpen(true);
  const handleReportClose = () => setReportOpen(false);

  const handleReport = (reason) => {
    // TODO: Implement report functionality
    console.log('Reported for:', reason);
    handleReportClose();
  };

  const reportReasons = [
    'Inappropriate behavior',
    'Harassment',
    'Offensive language',
    'Technical issues',
    'Other'
  ];

  return (
    <>
      <StyledAppBar position="static">
        <StyledToolbar>
          <div>
            <NavButton component={Link} to="/">
              Home
            </NavButton>
            <NavButton component={Link} to="/contact">
              Contact
            </NavButton>
          </div>
          <div>
            {location.pathname === '/video-chat' && (
              <ReportButton onClick={handleReportOpen}>
                Report User
              </ReportButton>
            )}
            <GuideButton onClick={handleGuideOpen} aria-label="guide">
              <HelpOutlineIcon />
            </GuideButton>
          </div>
        </StyledToolbar>
      </StyledAppBar>

      <Modal open={guideOpen} onClose={handleGuideClose}>
        <ModalContent>
          <ModalTitle>Welcome to Us - Video Chat Guide</ModalTitle>
          <ModalText>
            Us is a platform that connects you with people who share your interests through video chat.
            Here's everything you need to know to get started:
          </ModalText>
          <FeatureList>
            <FeatureItem>
              <strong>Interest-Based Matching:</strong> Enter your interests on the home page to find people who share them.
            </FeatureItem>
            <FeatureItem>
              <strong>Video Chat Controls:</strong> You can toggle your camera and microphone, and skip to the next person if desired.
            </FeatureItem>
            <FeatureItem>
              <strong>Safety First:</strong> Use the report button if you encounter any inappropriate behavior.
            </FeatureItem>
            <FeatureItem>
              <strong>Browser Support:</strong> Works best on Chrome and Firefox. Make sure to allow camera and microphone permissions.
            </FeatureItem>
          </FeatureList>
          <ModalText>
            Remember to be respectful and follow our community guidelines. Happy chatting!
          </ModalText>
          <Button variant="contained" onClick={handleGuideClose} fullWidth>
            Got it!
          </Button>
        </ModalContent>
      </Modal>

      <Modal open={reportOpen} onClose={handleReportClose}>
        <ModalContent>
          <ModalTitle>Report User</ModalTitle>
          <ModalText>
            Please select the reason for reporting this user:
          </ModalText>
          {reportReasons.map((reason) => (
            <ReportOption
              key={reason}
              variant="outlined"
              onClick={() => handleReport(reason)}
            >
              {reason}
            </ReportOption>
          ))}
          <Button
            variant="outlined"
            onClick={handleReportClose}
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Cancel
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar; 