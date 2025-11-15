import { useState } from 'react';
import { SignOutButton } from '../components/auth/SignOutButton';
import { useAuthContext } from '../components/contexts/AuthContext';
import { signOut } from '../apis/auth';
import { clearAuthInfo } from '../apis';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/common/BackButton';


export function Mypage() {
  const { setIsLoggedIn, user, setUser, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const [ isSigningOut, setIsSigningOut ] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut();
    } catch {
      await signOut();
    } finally {
      clearAuthInfo();
      navigate('/', { replace: true });
      // ログインの評価に時間がかかるため少し待ってから、状態破棄
      setTimeout(() => {
        setUser(null);
        setIsLoggedIn(false);
      }, 1)
      setIsSigningOut(false)
    }
  };

  if (isLoading) return null;

  // TODO: 編集できるようにする
  return (
    <>
      <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
        <BackButton />
      </div>

      <div className="flex flex-col justify-center mx-10">
        <div className="avator avatar-placeholder flex justify-center">
          <div className=" bg-neutral text-neutral-content h-24 w-24 rounded-full">
            <span className="text-3xl">DEV</span>
          </div>
        </div>

        <div className="flex flex-col items-center mb-10">
          <div className="text-gray-900 text-3xl pt-5">{user?.name}</div>

          <div className="text-gray-500 truncate">{user?.email}</div>

          <div className="text-gray-900 break-normal mt-2">
            本屋に行ってカフェによく行きます。好きな本は「コンビニ人間」です。よろしくお願いいたします。あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
          </div>
        </div>

        <button
          type="button"
          className="flex justify-start text-sm mb-2 underline"
          onClick={() => navigate('/mypage/password')}
        >
          パスワードを変更する
        </button>
        <SignOutButton handleSignOut={handleSignOut} isSigningOut={isSigningOut} />
      </div>
    </>
  );
}
