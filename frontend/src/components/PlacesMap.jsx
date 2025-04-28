// src/components/PlacesMap.jsx
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

// 地図のスタイルを定数化
const containerStyle = {
  width: '100vw',
  height: '100vh'
};

// ピンの位置を定数化
// 今後ここを現在地、駅、書店名みたいに変わる予定
const center = {
  lat: 35.681236, // 東京駅
  lng: 139.767125
};

export const PlacesMap = () => {
    const [places, setPlaces] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // ロード完了フラグ追加！
  
    useEffect(() => {
      axios.get('/api/v1/places', {
        params: {
          lat: center.lat,
          lng: center.lng,
          keyword: 'station'
        }
      })
    //   .then()の中身は必ずAPIからの返事
      .then(response => {
        console.log(response)
        setPlaces(response.data.places);
      })
      .catch(error => {
        console.error('APIエラー:', error);
      });
    }, []);
  
    return (
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsLoaded(true)} // ロード完了したらセット！
      >
        {isLoaded && ( // ロード完了後だけ地図を出す！
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            {places.map((place) => (
              <Marker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                title={place.name}
              />
            ))}
          </GoogleMap>
        )}
      </LoadScript>
    );
  };
  