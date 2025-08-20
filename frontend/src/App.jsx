import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchResultsPage } from './pages/SearchResultPage';
import { HomePage } from './pages/HomePage';
import { LoadScript } from '@react-google-maps/api';
import { AuthPage } from './pages/AuthPage';
import { AuthProvider } from './components/contexts/AuthContext';
import { Mypage } from './pages/Mypage';
import { ModalProvider } from './components/contexts/ModalContext'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { ConfirmedPage } from './pages/ConfimedPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'

// TODO: 未ログイン時のアクセスを制限する認可の設定
export function App() {
  return (
    <>
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <BrowserRouter>
    <AuthProvider>
    <ModalProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/confirmed" element={<ConfirmedPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* <Route path="/mypage/password" element={<ResetPasswordPage/>} /> */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />        
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/mypage" element={<Mypage/>}/>
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </ModalProvider>
    </AuthProvider>
    </BrowserRouter>
    </LoadScript>

    </>
  );
}

