import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';


export function SearchBar({ searchMode }){
    const[query, setQuery] = useState("")
    const[predictions, setPredictions] = useState([])
    const[selectedPrediction, setSelectedPrediction] = useState(null)

    const navigate = useNavigate();

    useEffect(()=>{
        if(!query.trim() || query.trim().length < 2) {
            setPredictions([])
        return
    }

        const autocompleteTimer = setTimeout(()=>{
            const fetchSearchPredictions = async() => {
                try{
                    const res = await axios.post('/api/v1/autocomplete',{
                        input: query,
                    })
                    
                    setPredictions(res.data)
                } catch(err){
                    console.error(err)
                    setPredictions([])
                }
            } 

            fetchSearchPredictions()
        }, 300)

        return () => clearTimeout(autocompleteTimer)
    },[query])
    
    return(
        <div className="relative w-full max-w-md mx-auto">
            <div className="flex">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="例：神保町駅"
            />
            <button
            type="button"
            onClick={ async() => {            
                  const pos = await axios.get(`/api/v1/places/${selectedPrediction.place_id}`)
                    navigate(`/search?lat=${pos.data.place.lat}&lng=${pos.data.place.lng}&mode=${searchMode}`)

            }}><MagnifyingGlassIcon className="w-5 h-5 mx-2 hover:text-gray-500 cursor-pointer"/></button>
            </div>

                {/* INFO: 現在はdescriptionをそのまま検索予測として表示しているが
                今後はさらにPlaceAPIを叩いてより正確な検索予測として表示する可能性あり*/}
            <ul className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
                {predictions.map((prediction,index) => 
                <li key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                    setQuery(prediction.description)
                    setSelectedPrediction(prediction)
                    setPredictions([])
                }}>
                    {prediction.description}
                </li>
            )}
            </ul>
        </div>
    )
}