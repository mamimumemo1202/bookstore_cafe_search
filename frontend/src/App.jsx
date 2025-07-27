// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { PlacesMap } from './components/PlacesMap';
import { SearchResultsPage } from './pages/SearchResultPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SearchResultsPage" element={<SearchResultsPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
