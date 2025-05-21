// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import GamePage from '../src/pages/GamePage';
import Profile from '../src/pages/Profile';
import Rewards from '../src/pages/Rewards';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
    <Router>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </Router>
  </>
  );
}
export default App;