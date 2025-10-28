import { useGeolocation } from '../../hooks/useGeolocation';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import { useLoading } from '../contexts/LoadingContext';
import { toast } from 'react-toastify';


export function SearchButton({ label, searchMode }) {
  const { getLocation } = useGeolocation();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { withLoading } = useLoading();

  const handleSearch = async () => {
    await withLoading(async () => {
      try {
        const pos = await getLocation();
        navigate(`/search?lat=${pos.lat}&lng=${pos.lng}&mode=${searchMode}`);
        closeModal();
      } catch (error) {
        toast.error('位置情報を取得できませんでした');
        closeModal();
        navigate('/', { replace: true });
      }
    });
  };

  return (
    <>
      <button
        className="flex text-gray-700 rounded-md border border-gray-700 px-4 py-2 m-1 text-starts cursor-pointer hover:bg-gray-700 hover:text-white"
        onClick={() => handleSearch()}
      >
        {label}
      </button>
    </>
  );
}
