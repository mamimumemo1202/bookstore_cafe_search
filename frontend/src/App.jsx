import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchResultsPage } from './pages/SearchResultPage';
import { HomePage } from './pages/HomePage';
import { LoadScript } from '@react-google-maps/api';
import { AuthPage } from './pages/AuthPage';
import { Header } from './components/layout/Header';
import { AuthProvider } from './components/contexts/AuthContext';
import { Mypage } from './pages/Mypage';

export function App() {
  return (
    <>
    <AuthProvider>
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/mypage" element={<Mypage/>}/>
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </BrowserRouter>
    </LoadScript>
    </AuthProvider>
    </>
  );
}

