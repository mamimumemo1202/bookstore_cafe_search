import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useModal } from '../contexts/ModalContext';
import { fetchGeometry, autocomplete } from '../../apis/places';
import { toast } from 'react-toastify';
import { useLoading } from '../contexts/LoadingContext'

export function SearchBar({ searchMode: propSearchMode }) {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const { isLoading, withLoading } = useLoading();

  const navigate = useNavigate();
  const location = useLocation();

  const notify = (status) => {
    if (status) toast.error('エラーが発生しました。ホームに戻ってください。');
  };

  // INFO: URLからsearchModeを取得するー＞モーダルからのpropと評価し、props優先
  const searchModeParams = new URLSearchParams(location.search).get('mode') || 'bookstore';
  const searchMode = propSearchMode ?? searchModeParams;

  const { closeModal } = useModal();

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setPredictions([]);
      return;
    }

    const autocompleteTimer = setTimeout(() => {
      const fetchSearchPredictions = async () => {
        try {
          const res = await autocomplete(query);
          setPredictions(res);
        } catch (error) {
          notify(error.response.status);
          setPredictions([]);
        }
      };

      fetchSearchPredictions();
    }, 300);

    return () => clearTimeout(autocompleteTimer);
  }, [query]);

  const handleSearch = async () => {
    if (!selectedPrediction) return;

    await withLoading(async() => {
      try {
        const res = await fetchGeometry(selectedPrediction?.place_id);
        closeModal();
        navigate(`/search?lat=${res.lat}&lng=${res.lng}&mode=${searchMode}&view=${searchMode}`);
      } catch (error) {
        notify(error.response.status);
        closeModal();
      }
   }) 
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
          placeholder="例：神保町駅"
        />
        <button type="submit">
          {isLoading? 
          <span className="loading loading-dots loading-xl"></span>
          :
          <MagnifyingGlassIcon className="w-5 h-5 mx-2 hover:text-gray-500 cursor-pointer" />}
        </button>
      </form>

      {/* INFO: 現在はdescriptionをそのまま検索予測として表示しているが
                今後はさらにPlaceAPIを叩いてより正確な検索予測として表示する可能性あり*/}
      <ul className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
        {predictions?.map((prediction, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setQuery(prediction.description);
              setSelectedPrediction(prediction);
              setPredictions([]);
            }}
          >
            {prediction.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
