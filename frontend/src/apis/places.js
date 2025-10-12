import axios from 'axios';
import { getAuthInfo } from '.';

export const fetchBookstores = async (lat, lng, type = 'Bookstore') => {
  const authInfo = getAuthInfo();

  const response = await axios.get('/api/v1/places', {
    params: {
      lat,
      lng,
      type,
      // keyword: 'book'
    },
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return response.data.places;
};

export const fetchCafes = async (lat, lng, type = 'Cafe') => {
  const authInfo = getAuthInfo();
  const response = await axios.get('/api/v1/places', {
    params: {
      lat,
      lng,
      type,
    },
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return response.data.places;
};

export const fetchCafesNearBookstore = async (lat, lng, type, bookstore_place_id) => {
  const authInfo = getAuthInfo();
  const response = await axios.get('/api/v1/places', {
    params: {
      lat,
      lng,
      type,
      bookstore_place_id,
    },
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return response.data.places;
};

export const fetchPairs = async (lat, lng) => {
  // TODO: ペア機構が完成したら
  return null;
};

export const fetchGeometry = async (place_id) => {
  const authInfo = getAuthInfo();

  const response = await axios.get(`/api/v1/places/${place_id}/geometry`, {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return response.data.geometry.geometry.location;
};

export const fetchPlaceDetails = async (place_id) => {
  const authInfo = getAuthInfo();

  const response = await axios.get(`/api/v1/places/${place_id}`, {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return response.data.place;
};

export const fetchPlaceDetailsBulk = async (place_ids) => {
  const authInfo = getAuthInfo();

  const response = await axios.get('/api/v1/places/get_details_bulk/', {
    params: { place_ids: place_ids },
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return response.data.details_bulk;
};

export const fetchLikes = async () => {
  const authInfo = getAuthInfo();

  const res = await axios.get('/api/v1/likes', {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return res.data.liked_places;
};

export const likePlace = async (placeId, type) => {
  const authInfo = getAuthInfo();

  const res = await axios.post(
    '/api/v1/likes',
    {
      place_id: placeId,
      type,
    },

    {
      headers: {
        'access-token': authInfo['access-token'],
        client: authInfo['client'],
        uid: authInfo['uid'],
      },
    }
  );
  return res.data.like_id;
};

export const unlikePlace = async (likeId) => {
  const authInfo = getAuthInfo();

  const res = await axios.delete(`/api/v1/likes/${likeId}`, {
    headers: {
      'access-token': authInfo['access-token'],
      client: authInfo['client'],
      uid: authInfo['uid'],
    },
  });
  return res.data.like;
};

export const likePair = async (bookstorePlaceId, activeCafePlaceId) => {
  const authInfo = getAuthInfo();

  const res = await axios.post(
    '/api/v1/likes',
    {
      bookstore_place_id: bookstorePlaceId,
      cafe_place_id: activeCafePlaceId,
      type: 'Pair',
    },

    {
      headers: {
        'access-token': authInfo['access-token'],
        client: authInfo['client'],
        uid: authInfo['uid'],
      },
    }
  );
  return res.data;
};
