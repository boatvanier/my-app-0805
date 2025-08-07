import React from 'react';
import { Box, Container } from '@mui/material';
// import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        component="img"
        src="https://t3.ftcdn.net/jpg/05/69/00/64/240_F_569006489_NviUR6weQ58N5BVcAezAtlI1BHikRFWZ.jpg"
        alt="Banner"
        sx={{
          width: '100%',
          height: 250,
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          bgcolor: '#f5f5f5',
          p: 2,
        }}
      >
        <Container>
           {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
