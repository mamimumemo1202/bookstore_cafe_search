// src/components/PlacesMap.jsx
import { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';


// 地図のスタイルを定数化
const containerStyle = {
  width: '100%',
  height: '100%'
};

export const PlacesMap = ({ onPlacesFetched, lat, lng, type, activePlace} ) => {
    const [places, setPlaces] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // ロード完了フラグ追加！
    const mapRef = useRef(null); // mapインスタンス保持用


    // 今後ここを現在地、駅、書店名みたいに変わる予定
    const defaultCenter = {lat, lng}; 
  
    useEffect(() => {
      axios.get('/api/v1/places', {
        params: {
          lat: lat,
          lng: lng,
          keyword: type
        }
      })
    //   .then()の中身は必ずAPIからの返事
      .then(response => {
        console.log(response)
        setPlaces(response.data.places);
        onPlacesFetched(response.data.places);
      })
      .catch(error => {
        console.error('APIエラー:', error);
      });
    }, []);


    useEffect(()=>{
      if(mapRef.current && activePlace){
        mapRef.current.panTo({lat: activePlace.lat, lng: activePlace.lng});
      };
    },[activePlace])
  
    return (
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsLoaded(true)} // ロード完了したらセット！
      >
        {isLoaded && ( // ロード完了後だけ地図を出す！
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={14}
            onLoad={(map) => (mapRef.current = map)} // map インスタンスを保存
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
  