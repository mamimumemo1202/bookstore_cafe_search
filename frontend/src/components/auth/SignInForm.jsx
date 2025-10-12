// TODO: エラーをRailsでハンドリングするようにする

import { useState } from 'react';
import { signIn } from '../../apis/auth';
import { saveAuthInfo } from '../../apis/index';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { validateToken } from '../../apis/auth';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn({ email, password });
      saveAuthInfo(res);

      const tokenRes = await validateToken();
      setUser(tokenRes.data.data);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error.response) {
        const messages = error.response.data.errors;

        if (messages.some((e) => e.toLowerCase().includes('confirm'))) {
          setErrorMessage('認証を完了してください ＜再送する＞');
        } else if (messages.some((e) => e.toLowerCase().includes('invalid'))) {
          setErrorMessage('メールアドレスかパスワードが間違っています');
        }
      } else {
        setErrorMessage('Unexpected error occured');
      }
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="bg-red-200 text-error-500 p-2 rounded mb-2">{errorMessage}</div>
      )}

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="my-2 mx-5 p-2 shadow-sm rounded-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" パスワード"
          className="my-2 mx-5 p-2 shadow-sm rounded-full"
        />
        <button
          className="mx-5 p-2 text-sm text-blue-500 hover:underline"
          onClick={() => navigate('/forgot-password')}
        >
          パスワードを忘れた方はこちら
        </button>
        <button
          type="submit"
          className="my-10 mx-5 p-2 rounded-full bg-primary-600 text-primary-50"
        >
          ログイン
        </button>
      </form>
    </>
  );
}
