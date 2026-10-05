import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { World } from './pages/World';
import { Social } from './pages/Social';
import { Background } from './components/Background';
import { MusicPlayer } from './components/MusicPlayer';

// Import new sub-pages
import { Video } from './pages/settings/Video';

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
      </Routes>
    </Router>
  );
}

export default App;
