import { useState } from 'react';
import { signIn, validateToken } from '../../apis/auth';
import { saveAuthInfo } from '../../apis/index';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import { toast } from 'react-toastify';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuthContext();
  const { withLoading, isLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    await withLoading(async () => {
      try {
        const res = await signIn({ email, password });
        saveAuthInfo(res);

        const tokenRes = await validateToken();
        setUser(tokenRes.data.data);
        setIsLoggedIn(true);
        navigate('/');
        toast.info('ログインしました！');
      } catch (error) {
        if (error.response) {
          const messages = error.response.data.errors ?? [];

          if (messages.some((msg) => msg.toLowerCase().includes('confirm'))) {
            setErrorMessage('認証を完了してください（確認メールを再送できます）');
          } else if (error.response.status === 401) {
            setErrorMessage('メールアドレスかパスワードが間違っています');
          } else {
            setErrorMessage('ログインに失敗しました。時間をおいて再試行してください。');
          }
        } else {
          setErrorMessage('予期せぬエラーが発生しました');
        }
      }
    });
  };

  return (
    <>
      {errorMessage && <div className="mb-2 rounded alert alert-error">{errorMessage}</div>}

      <form className="flex flex-col gap-5 my-5" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="input"
          disabled={isLoading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="input"
          disabled={isLoading}
        />
        <button
          type="button"
          className="text-sm underline"
          onClick={() => navigate('/forgot-password')}
          disabled={isLoading}
        >
          パスワードを忘れた方はこちら
        </button>
        <button type="submit" className="btn disabled:cursor-not-allowed " disabled={isLoading}>
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </>
  );
}
