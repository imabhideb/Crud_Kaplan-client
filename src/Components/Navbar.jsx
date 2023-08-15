import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <BugReportIcon sx={{ fontSize: 32, marginRight: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Bugs Portal
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
