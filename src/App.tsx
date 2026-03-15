import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import LittleBlurb from './components/blurp/LittleBlurb';

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  const toggleTheme = () => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <Header onToggleTheme={toggleTheme} themeMode={themeMode} />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-4 pb-8">
        <Routes>
          <Route path="/my-dev-page" element={<Content />} />
          <Route path="/my-dev-page/post/:id" element={<LittleBlurb />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
