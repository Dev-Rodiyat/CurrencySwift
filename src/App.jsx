import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Currencies from './pages/Currencies';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/currencies" element={<Currencies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
