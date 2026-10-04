import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { World } from './pages/World';
import { Social } from './pages/Social';
import { Background } from './components/Background';
import { MusicPlayer } from './components/MusicPlayer';

// Import new sub-pages
import { Video } from './pages/settings/Video';
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
        <Route path="/social" element={<Social />} />
        
        {/* Settings Routes */}
        <Route path="/settings/video" element={<Video />} />
        
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
