import axios from "axios";
import { getAuthInfo } from ".";

export const fetchBookstores = async (lat, lng, type = 'Bookstore') => {
    const authInfo = getAuthInfo()

    const response = await axios.get('/api/v1/places', {
                    params: {  
                    lat,
                    lng,
                    type,
                    // keyword: 'book'
                    },
                    headers: {
                        "access-token": authInfo["access-token"],
                        "client": authInfo["client"],
                        "uid": authInfo["uid"]
        }
                },  )
                return response.data.places};
            

export const fetchCafes = async (lat, lng, type = 'Cafe') => {
    const authInfo = getAuthInfo()    
    const response = await axios.get('/api/v1/places', {
                    params: {  
                    lat,
                    lng,
                    type,
                    // TODO: keywordを反映させるにはRails側の処理が必要
                    },
                    headers: {
                        "access-token": authInfo["access-token"],
                        "client": authInfo["client"],
                        "uid": authInfo["uid"]
        }
                })
            return response.data.places};



export const fetchCafesNearBookstore = async (lat, lng, type, bookstore_place_id) =>{
   const authInfo = getAuthInfo()    
   const response = await axios.get('/api/v1/places', {
                    params: {
                    lat,
                    lng,            
                    type,
                    bookstore_place_id
                    },
                    headers: {
                        "access-token": authInfo["access-token"],
                        "client": authInfo["client"],
                        "uid": authInfo["uid"]
        }
                })
                return response.data.places}

export const fetchPairs = async(lat, lng) =>{
// TODO: ペア機構が完成したら
                return null
}

export const fetchLikes = async () => {
    const authInfo = getAuthInfo()

    const res = await axios.get('/api/v1/likes', 
        { headers: {
            "access-token": authInfo["access-token"],
            "client": authInfo["client"],
            "uid": authInfo["uid"]
        }})
        console.log(res.data)
    return res.data
}

export const likePlace = async(placeId, type) => {
    const authInfo = getAuthInfo()

    const res = await axios.post('/api/v1/likes', {
        place_id: placeId,
        type }, 
        
        { headers: {
            "access-token": authInfo["access-token"],
            "client": authInfo["client"],
            "uid": authInfo["uid"]
        }})
    return res.data.like
}

export const unlikePlace = async(likeId) => {
    const authInfo = getAuthInfo()

    const res = await axios.delete(`/api/v1/likes/${likeId}`,        
        { headers: {
            "access-token": authInfo["access-token"],
            "client": authInfo["client"],
            "uid": authInfo["uid"]
        }})
    return res.data.like
}

export const likePair = async(bookstorePlaceId, activeCafePlaceId) => {
    const authInfo = getAuthInfo()

    const res = await axios.post('/api/v1/likes', {
        bookstore_place_id: bookstorePlaceId,
        cafe_place_id: activeCafePlaceId,
        type: "Pair" }, 
        
        { headers: {
            "access-token": authInfo["access-token"],
            "client": authInfo["client"],
            "uid": authInfo["uid"]
        }})
    return res.data
}