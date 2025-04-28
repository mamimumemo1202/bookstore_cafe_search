// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlacesMap } from './components/PlacesMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<PlacesMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
