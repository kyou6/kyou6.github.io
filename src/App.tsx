import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { World } from './pages/World';
import { Statistics } from './pages/Statistics';
import { Background } from './components/Background';
import { MusicPlayer } from './components/MusicPlayer';

function App() {
  return (
    <Router>
      <MusicPlayer />
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world" element={<World />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
