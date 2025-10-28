import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchResultsPage } from './pages/SearchResultPage';
import { HomePage } from './pages/HomePage';
import { LoadScript } from '@react-google-maps/api';
import { AuthPage } from './pages/AuthPage';
import { AuthProvider } from './components/contexts/AuthContext';
import { Mypage } from './pages/Mypage';
import { MyList } from './pages/MyList';
import { ModalProvider } from './components/contexts/ModalContext';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ConfirmedPage } from './pages/ConfimedPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO: 未ログイン時のアクセスを制限する認可の設定
export function App() {
  return (
    <>
    <ToastContainer
      toastStyle={{
            maxWidth: '60vw',
            borderRadius: '8px',
            padding: '12px 14px',
            fontSize: '14px',
          }}
      autoClose={1500}
      hideProgressBar />
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <BrowserRouter>
          <AuthProvider>
            <ModalProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/confirmed" element={<ConfirmedPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/mypage/password" element={<ChangePasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/mylist" element={<MyList />} />
                <Route path="/search" element={<SearchResultsPage />} />
              </Routes>
            </ModalProvider>
          </AuthProvider>
        </BrowserRouter>
      </LoadScript>
    </>
  );
}
