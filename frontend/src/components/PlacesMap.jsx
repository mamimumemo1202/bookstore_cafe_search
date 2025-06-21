// src/components/PlacesMap.jsx
import { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



// 地図のスタイルを定数化
const containerStyle = {
  width: '100%',
  height: '100%'
};

export const PlacesMap = ({ lat, lng, type, bookstores, cafes, activeBookstore, activeCafe} ) => {
  const [isLoaded, setIsLoaded] = useState(false); // ロード完了フラグ
  const mapRef = useRef(null); // mapインスタンス保持用

  const defaultCenter = {lat, lng}; 

  const activePlace = activeBookstore || activeCafe;
  const places = bookstores || cafes || [];

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
        {console.log(places)}
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
  