import { useState } from 'react';
import { signUp, resentConfirmation } from '../../apis/auth';
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
  const [notice, setNotice] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    await withLoading(async () => {
      try {
        await signUp({ email, password, passwordConfirmation });
        setNotice('認証メールを送信しました。');
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
      {errorMessage && <div className="p-2 rounded mb-2 alert alert-error">{errorMessage}</div>}
      {notice && (
        <div className="p-2 rounded mb-2 alert alert-info">
          {notice}
          <button
            type="button"
            className="underline"
            onClick={() => {
              resentConfirmation(email);
            }}
          >
            再送する
          </button>
        </div>
      )}

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
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="パスワード（確認）"
          className="input"
          disabled={isLoading}
        />
        <button type="submit" className=" btn disabled:cursor-not-allowed" disabled={isLoading}>
          {isLoading ? '登録中...' : '登録'}
        </button>
      </form>
    </>
  );
}
