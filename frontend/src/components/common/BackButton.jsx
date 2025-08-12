import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid';


export function BackButton(){
    const navigate = useNavigate()

    const handleBack = () =>{
        if(window.history.length > 1)
            navigate(-1)
        else navigate('/')
    }

    return (
        <button 
        onClick={()=>handleBack()}
        className='w-full h-full'>
            <ChevronLeftIcon />
        </button>
    )

}