import { useState } from 'react';
import { signUp } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import { toast } from 'react-toastify';

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { withLoading, isLoading } = useLoading();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    await withLoading(async () => {
      try {
        await signUp({ email, password, passwordConfirmation });
        navigate('/');
        toast.info('認証メールを送信しました', { autoClose: 5000 });
      } catch (error) {
        if (error.response) {
          const messages = error.response.data.errors.full_messages;
          setErrorMessage(messages.join('\n'));
        } else {
          setErrorMessage('予期せぬエラーが発生しました');
        }
      }
    });
  };

  return (
    <>
      {errorMessage && (
        <div className="bg-red-200 text-red-800 p-2 rounded mb-2 whitespace-pre-wrap">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="my-2 mx-5 p-2 shadow-sm rounded-full"
          disabled={isLoading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="my-2 mx-5 p-2 shadow-sm rounded-full"
          disabled={isLoading}
        />
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="パスワード（確認）"
          className="my-2 mx-5 p-2 shadow-sm rounded-full"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="my-6 mx-5 p-2 rounded-full bg-primary-600 text-white disabled:bg-primary-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? '登録中...' : '登録'}
        </button>
      </form>
    </>
  );
}
