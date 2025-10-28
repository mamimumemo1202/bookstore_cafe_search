import { useGeolocation } from './useGeolocation';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../components/contexts/ModalContext';
import { useLoading } from '../components/contexts/LoadingContext';
import { toast } from 'react-toastify';

export function useLocationSearch() {
  const { getLocation } = useGeolocation();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { withLoading } = useLoading();

  const handleSearch = async (searchMode) => {
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
  return { handleSearch };
}
