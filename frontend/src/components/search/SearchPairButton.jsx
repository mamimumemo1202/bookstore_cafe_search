import { useLocationSearch } from '../../hooks/useLocationSearch';

export function SearchPairbutton(){
    const { handleSearch } = useLocationSearch();

    return(
        <>
            <div 
            className="text-gray-700 rounded-md border border-gray-700 px-4 py-2 m-1 text-starts cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={ ()=> handleSearch('pair') }>
                本屋とカフェをまとめてさがす（未実装）
            </div>
        </>
    )
}