import { HomeIcon, MagnifyingGlassIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';

export function FooterNavigation() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();
  const { openModal } = useModal();

  return (
    <nav aria-label="footer navigation" className="fixed bottom-0 w-full h-16 flex justify-around items-center bg-primary-500 text-primary-100 border border-primary-200 border-t-2">
      <button className="flex flex-col items-center">
        <HomeIcon className="w-6 h-6" onClick={() => navigate('/')} />
        <p>ホーム</p>
      </button>

      <button className="flex flex-col items-center">
        <HeartIcon
          className="w-6 h-6"
          onClick={() => {
            isLoggedIn ? navigate('/mylist') : navigate('/auth');
          }}
        />
        <p>マイリスト</p>
      </button>

      <button className="flex flex-col items-center" onClick={openModal}>
        <MagnifyingGlassIcon className="w-6 h-6"  />
        <p>検索</p>
      </button>
      {/* TODO: ログイン時にアイコンの写真を挿入 */}
      <button className="flex flex-col items-center">
        <UserIcon
          className="w-6 h-6"
          onClick={() => {
            isLoggedIn ? navigate('/mypage') : navigate('/auth');
          }}
        />
        <p>マイページ</p>
      </button>
    </nav>
  );
}
