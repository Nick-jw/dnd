import { Box, Link, Typography } from '@mui/material';

const Header = (): JSX.Element => {
  return (
    <Box component="header" sx={{ backgroundColor: 'lightGrey', mb: '20px' }}>
      <Typography variant="h2">Monsters</Typography>
      <Link
        href="https://www.youtube.com/watch?v=g8arEVfJoGc"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{
          fontSize: '0.8rem',
          display: 'inline-block',
          marginTop: '-0.5rem',
          marginBottom: '1rem',
        }}
      >
        Need help?
      </Link>
    </Box>
  );
};

export default Header;
