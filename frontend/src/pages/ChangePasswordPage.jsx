import { BackButton } from '../components/common/BackButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordChange } from '../apis/auth';
import { getAuthInfo } from '../apis';

export function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setNotice('');

    if (newPassword !== passwordConfirmation) {
      setErrorMessage('パスワードが一致しません。');
      return;
    }

    setSubmitting(true);

    try {
      const authInfo = getAuthInfo();
      const uid = authInfo.uid;
      await requestPasswordChange({ currentPassword, newPassword, passwordConfirmation, uid });

      setNotice('パスワードを更新しました。');
      navigate('/');
    } catch (error) {
      setErrorMessage('やり直してください。（何度してもできない場合は、リセットをお試しください）');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
        <BackButton />
      </div>

      <div className="flex flex-col mx-10 gap-5">
        <div className="text-3xl text-center">パスワード変更</div>

        {notice && <div className="bg-green-200 text-green-800 p-2 rounded mb-2">{notice}</div>}

        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-2">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            name="current_password"
            value={currentPassword}
            className="input"
            placeholder="現在のパスワード"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            name="new_password"
            value={newPassword}
            className="input"
            placeholder="新しいパスワード"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            name="new_password_confirmation"
            value={passwordConfirmation}
            className="input"
            placeholder="新しいパスワード（確認）"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <button type="submit" disabled={submitting} className="btn">
            パスワードを更新
          </button>
        </form>
      </div>
    </>
  );
}
