// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { PlacesMap } from './components/PlacesMap';
import { SearchPage } from './pages/SearchPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/searchpage" element={<SearchPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
