import { BackButton } from '../components/common/BackButton';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../apis/auth';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const resetPasswordToken = searchParams.get('reset_password_token')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage('パスワードが一致しません。');
      return;
    }

    setSubmitting(true);

    try {
      await resetPassword({ password, passwordConfirmation, resetPasswordToken });

      setNotice('パスワードを更新しました。ログインしてください。');
      navigate('/auth', {state: { from: "resetPassword"}});
    } catch {
      setErrorMessage('リンクが無効です。もう一度送信してください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
        <BackButton />
      </div>

      <div className="text-center mt-5">新しいパスワードを入力してください</div>

      {notice && <div className="alert alert-info p-2 rounded mb-2">{notice}</div>}
      {errorMessage && <div className="alert alert-error p-2 rounded mb-2">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-9 items-center">
        <input
          type="password"
          name="password"
          value={password}
          className="input"
          placeholder="新しいパスワード"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          className="input"
          placeholder="新しいパスワード（確認）"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button type="submit" disabled={submitting} className="btn btn-wide">
          パスワードを更新
        </button>
      </form>
    </>
  );
}
