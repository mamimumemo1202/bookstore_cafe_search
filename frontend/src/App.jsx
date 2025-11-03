import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchResultsPage } from './pages/SearchResultPage';
import { HomePage } from './pages/HomePage';
import { LoadScript } from '@react-google-maps/api';
import { AuthPage } from './pages/AuthPage';
import { AuthProvider } from './components/contexts/AuthContext';
import { Mypage } from './pages/Mypage';
import { MyList } from './pages/MyList';
import { ModalProvider } from './components/contexts/ModalContext';
import { LoadingProvider } from './components/contexts/LoadingContext';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RequireAuth, GuestOnly } from './routes';

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
        hideProgressBar
      />
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <BrowserRouter>
          <AuthProvider>
            <ModalProvider>
              <LoadingProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  <Route element={<RequireAuth />}>
                    <Route path="/mypage/password" element={<ChangePasswordPage />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/mylist" element={<MyList />} />
                  </Route>

                  <Route element={<GuestOnly />}>
                    <Route path="/auth" element={<AuthPage />} />
                  </Route>

                  <Route path="*" element={<test />} />
                </Routes>
              </LoadingProvider>
            </ModalProvider>
          </AuthProvider>
        </BrowserRouter>
      </LoadScript>
    </>
  );
}
