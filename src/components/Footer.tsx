import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        py: 1.5,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        Copyright &copy; Lewis Gomez &reg; {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
