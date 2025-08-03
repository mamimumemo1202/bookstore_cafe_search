import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchResultsPage } from './pages/SearchResultPage';
import { HomePage } from './pages/HomePage';
import { LoadScript } from '@react-google-maps/api';
import { AuthPage } from './pages/AuthPage';

function App() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </BrowserRouter>
    </LoadScript>
  );
}

export default App;
