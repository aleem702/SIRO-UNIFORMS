import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ViewerPage from './pages/ViewerPage';
import MagazinePage from './pages/MagazinePage';
import Products3DPage from './pages/Products3DPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<LandingPage />} />
        <Route path="/explore"    element={<Products3DPage />} />
        <Route path="/magazine"   element={<MagazinePage />} />
        <Route path="/viewer"     element={<ViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
