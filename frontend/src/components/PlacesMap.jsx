// src/components/PlacesMap.jsx
import { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



// 地図のスタイルを定数化
const containerStyle = {
  width: '100%',
  height: '100%'
};

export const PlacesMap = ({ lat, lng, bookstores, cafes, activeBookstore, activeCafe} ) => {
  const [isLoaded, setIsLoaded] = useState(false); // マップ用のLoading
  const mapRef = useRef(null); // mapインスタンス保持用

  const defaultCenter = {lat, lng}; 

  const activePlace = activeBookstore || activeCafe;
  const center = activePlace ? {lat: activePlace.lat, lng: activePlace.lng} : defaultCenter; 

 
// なくても動くけどPanToで滑らかに動かすのがねらい
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
            center={center}
            zoom={16}
            onLoad={(map) => (mapRef.current = map)} // map インスタンスを保存
          > 
            {/* 本屋のピン */}
            {bookstores.map((bookstore) => (
              <Marker
                key={bookstore.id}
                position={{ lat: bookstore.lat, lng: bookstore.lng }}
                title={bookstore.name}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                }}
              />
            ))}
            {/* カフェのピン */}
            {cafes.map((cafe) => (
              <Marker
                key={cafe.id}
                position={{ lat: cafe.lat, lng: cafe.lng }}
                title={cafe.name}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                }}
              />
            ))}
          </GoogleMap>
        )}
      </LoadScript>
    );
  };
  