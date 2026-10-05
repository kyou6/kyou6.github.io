import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { World } from './pages/World';
import { Social } from './pages/Social';
import { Background } from './components/Background';
import { MusicPlayer } from './components/MusicPlayer';
import { SettingsProvider } from './context/SettingsContext';
import { Settings } from './pages/Settings';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <MusicPlayer />
        <Background />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/world" element={<World />} />
          <Route path="/social" element={<Social />} />
          
          {/* Settings Routes */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/video" element={<Settings />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;
