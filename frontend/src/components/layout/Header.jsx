import { useNavigate } from 'react-router-dom';
import {
  BookOpenIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { SearchBar } from '../search/SearchByKeyword';
import { BackButton } from '../common/BackButton';
import { useAuthContext } from '../contexts/AuthContext';

export function Header({ variant }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-base-100 z-50 border-b-2 border-base-200">
        {variant === 'home' && (
          <div className="flex justify-between w-full items-center h-full ">
            <BookOpenIcon className="h-6 w-6 ml-6" onClick={() => navigate('/')} />

            <div className="flex flex-row items-end gap-3 mr-6">
              {!isLoggedIn && (
                <button
                  className="hover:font-bold underline"
                  onClick={() => navigate('/auth')}
                >
                  新規登録・ログイン
                </button>
              )}
            </div>
          </div>
        )}

        {variant === 'search' && (
          <div className="mx-auto max-w-screen-md h-full flex items-center">
            <div className=" w-6 h-6 mx-5">
              <BackButton />
            </div>
            <div className="mx-5">
              <SearchBar />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
