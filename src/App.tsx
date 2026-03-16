import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

const LittleBlurb   = lazy(() => import('./components/blurp/LittleBlurb'));
const ProjectDetail = lazy(() => import('./components/projects/ProjectDetail'));

function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 flex flex-col items-center gap-4 text-center">
      <p className="text-5xl">🤔</p>
      <h1 className="text-2xl font-bold tracking-tight">Whoops</h1>
      <p className="text-muted-foreground text-sm">This route doesn't exist.</p>
      <Link to="/my-dev-page" className="text-sm text-sky-500 hover:underline underline-offset-4">
        ← Take me home
      </Link>
    </div>
  );
}

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  const toggleTheme = () => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <Header onToggleTheme={toggleTheme} themeMode={themeMode} />
      <main className="flex-1 w-full pt-4 pb-8">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/my-dev-page" element={<Content />} />
            <Route path="/my-dev-page/post/:id" element={<LittleBlurb />} />
            <Route path="/my-dev-page/projects/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
