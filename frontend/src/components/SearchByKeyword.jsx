import { useEffect, useState } from "react"
import axios from 'axios'

export function SearchBar(){
    const[query, setQuery] = useState("")
    const[predictions, setPredictions] = useState([])

    useEffect(()=>{
        if(!query || query.length < 2) return

        const autocompleteTimer = setTimeout(()=>{
        const fetchSearchPredictions = async() => {
            try{
                const res = await axios.post('/api/v1/autocomplete',{
                    input: query
                })
                setPredictions(res.data)
            } catch(err){
                console.error(err)
                setPredictions([])
            }
        } 

        fetchSearchPredictions()}, 300)

        return () => clearTimeout(autocompleteTimer)
    },[query])
    
    return(
        <div>
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索ワードを入力してください。"
            />

            <ul>
                {predictions.map((prediction,index) => 
                <li key={index}>
                    {prediction.description}
                </li>
            )}
            </ul>
        </div>
    )
}