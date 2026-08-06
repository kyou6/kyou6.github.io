import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { World } from './pages/World';
import { Statistics } from './pages/Statistics';
import { Background } from './components/Background';
import { MusicPlayer } from './components/MusicPlayer';

// Import new sub-pages
import { Video } from './pages/settings/Video';
import { Introduction } from './pages/world/load/Introduction';
import { EducationalBackground } from './pages/world/load/EducationalBackground';
import { Achievements } from './pages/world/load/Achievements';
import { Resume } from './pages/world/load/Resume';
import { Facebook } from './pages/world/social/Facebook';
import { Instagram } from './pages/world/social/Instagram';
import { Youtube } from './pages/world/social/Youtube';
import { Wangshu } from './pages/world/repository/Wangshu';
import { Doomcraft } from './pages/world/repository/Doomcraft';

function App() {
  return (
    <Router>
      <MusicPlayer />
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world" element={<World />} />
        <Route path="/statistics" element={<Statistics />} />
        
        {/* Settings Routes */}
        <Route path="/settings/video" element={<Video />} />
        
        {/* World Load Routes */}
        <Route path="/world/load/introduction" element={<Introduction />} />
        <Route path="/world/load/educational-background" element={<EducationalBackground />} />
        <Route path="/world/load/achievements" element={<Achievements />} />
        <Route path="/world/load/resume" element={<Resume />} />
        
        {/* World Social Routes */}
        <Route path="/world/social/facebook" element={<Facebook />} />
        <Route path="/world/social/instagram" element={<Instagram />} />
        <Route path="/world/social/youtube" element={<Youtube />} />
        
        {/* World Repository Routes */}
        <Route path="/world/repository/wangshu" element={<Wangshu />} />
        <Route path="/world/repository/doomcraft" element={<Doomcraft />} />
      </Routes>
    </Router>
  );
}

export default App;
