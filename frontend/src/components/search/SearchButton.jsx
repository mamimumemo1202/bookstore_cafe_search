import { useGeolocation } from '../../hooks/useGeolocation';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import { useLoading } from '../contexts/LoadingContext';
import { toast } from 'react-toastify';

export function SearchButton({ label, searchMode }) {
  const { getLocation } = useGeolocation();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { isLoading, withLoading } = useLoading();

  const handleSearch = async () => {
    await withLoading(async () => {
      try {
        const pos = await getLocation();
        navigate(`/search?lat=${pos.lat}&lng=${pos.lng}&mode=${searchMode}&view=${searchMode}`);
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
      <button className="btn text-base-content" onClick={() => handleSearch()}>
        {isLoading? 
        <span className="loading loading-dots loading-xl"></span>
        :
         label}
      </button>
    </>
  );
}
