import axios from "axios";

export const fetchBookstores = async (lat, lng, type = 'book_store') => {
    const response = await axios.get('/api/v1/places', {
                    params: {  
                    lat,
                    lng,
                    type,
                    // keyword: 'book'
                    }
                })
                return response.data.places};
            

export const fetchCafes = async (lat, lng, type = 'cafe') => {
    const response = await axios.get('/api/v1/places', {
                    params: {  
                    lat,
                    lng,
                    type,
                    // TODO: keywordを反映させるにはRails側の処理が必要
                    // keyword: 'coffee'
                    }
                })
            return response.data.places};



export const fetchCafesNearBookstore = async (lat, lng, type ='cafe', keyword ='coffee') =>{
   const response = await axios.get('/api/v1/places', {
                    params: {
                    lat,
                    lng,            
                    type,
                    keyword,
                    }})
                return response.data.places}

export const fetchPairs = async(lat, lng) =>{
// TODO: ペア機構が完成したら
                return null
}