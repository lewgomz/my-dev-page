import React from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Container from '@mui/material/Container';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WorkIcon from '@mui/icons-material/Work';
import Footer from './components/Footer';
import Content from './components/Content';
import LittleBlurb from './components/blurp/LittleBlurb';
import HomeIcon from '@mui/icons-material/Home';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const sections = [
    { title: 'Home', url: '/my-dev-page', icon: HomeIcon },
    { title: 'GitHub', url: 'https://github.com/lewgomz', icon: GitHubIcon },
    { title: 'Resume', url: '#', icon: WorkIcon },
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/lg-luisgomez/', icon: LinkedInIcon },
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <Header title="Hi, I'm Lewis Gomez 👋" sections={sections}/>
      <Container maxWidth="xl" sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
      >
        <Routes>
         <Route path="/my-dev-page" element={<Content />} />
         <Route path="/my-dev-page/post/:id" element={<LittleBlurb />} />
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
