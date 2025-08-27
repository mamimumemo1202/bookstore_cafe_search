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



export const fetchCafesNearBookstore = async (lat, lng, type ='Cafe', keyword ='coffee') =>{
   const authInfo = getAuthInfo()    
   const response = await axios.get('/api/v1/places', {
                    params: {
                    lat,
                    lng,            
                    type,
                    keyword,
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