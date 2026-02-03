import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { World } from './pages/World';
import { Background } from './components/Background';

function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world" element={<World />} />
      </Routes>
    </Router>
  );
}

export default App;
