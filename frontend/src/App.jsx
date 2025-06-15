// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { PlacesMap } from './components/PlacesMap';
import { SearchPage } from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
