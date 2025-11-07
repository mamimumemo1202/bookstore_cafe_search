import { requestPasswordReset } from '../apis/auth';
import { useState } from 'react';
import { BackButton } from '../components/common/BackButton';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      await requestPasswordReset({ email });
      setNotice('送信しました。届かない場合はメールアドレスをご確認ください。');
    } catch (error) {
      setNotice('送信しました。届かない場合はメールアドレスをご確認ください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
        <BackButton />
      </div>

      <div className="text-center mt-5">
        リセットするアカウントのメールアドレスを入力してください。
      </div>
      {notice && <div className="alert alert-info p-2 rounded mb-2 mx-5">{notice}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 px-9 mt-5">
        <input
          type="email"
          name="email"
          value={email}
          required
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <button type="submit" className="btn" disabled={submitting}>
          送信
        </button>
      </form>
    </>
  );
}
