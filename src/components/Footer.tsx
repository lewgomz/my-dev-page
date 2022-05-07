import React from 'react';
import Container from '@mui/material/Container';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation color="primary" >
            <Container maxWidth="md" sx={{ 
                borderBottom: 1, 
                borderColor: 'divider', 
                bgcolor: 'background.default',
                color: 'text.primary', 
            }}
            >
                <Typography variant="body1" color="inherit" align="center">
                Copyright © Lewis Gomez &reg; {new Date().getFullYear()}.
                </Typography>
            </Container>
        </BottomNavigation>
    </Paper>
  );
}