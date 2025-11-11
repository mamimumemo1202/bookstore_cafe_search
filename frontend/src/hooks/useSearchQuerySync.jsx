import { useSearchParams } from 'react-router-dom';

export function useSearchQuerySync(){
    const[searchParams, setSearchParams] = useSearchParams()

    const lat = Number(searchParams.get('lat'));
    const lng = Number(searchParams.get('lng'));
    const searchMode = searchParams.get('mode') ?? 'bookstore';
    const view = searchParams.get('view') ?? 'bookstore'

    const onBookstoreClick = (bookstore) => {
        const p = new URLSearchParams(searchParams);
        const modeParams = p.get('mode');

        if (modeParams === 'bookstore') {
            if (p.get('bpid') === bookstore.place_id){
                p.delete('bpid');
            } else {
                p.set('bpid', bookstore.place_id);
            }
        }

        console.log('[onBookstoreClick]', p.toString())
        setSearchParams(p);
    };

    const onCafeClick = (cafe) => {
        const p = new URLSearchParams(searchParams);
        const modeParams = p.get('mode');

        if (modeParams === 'pair') {
            if(p.get('cpid') === cafe.place_id){
                p.delete('cpid');
            } else {
                p.set('cpid', cafe.place_id);
                p.set('mode', 'pair');
        }} else if (modeParams === 'cafe') {
                if(p.get('cpid') === cafe.place_id){
                p.delete('cpid');
            } else {
                p.set('cpid', cafe.place_id);
            }}
        setSearchParams(p);
    };

    const onPairClick = (activeBookstore, cafe) => {
        const p = new URLSearchParams(searchParams);
        p.set('bpid', activeBookstore.place_id);
        p.set('cpid', cafe.place_id);

        p.set('mode', 'pair');
        p.set('view','cafe')
        console.log('[onPairClick]', p.toString())
        setSearchParams(p);
    };

    const onChangeViewClick = () => {
        const p = new URLSearchParams(searchParams);
        const modeParams = p.get('mode');
        const viewParams = p.get('view');
        
        if(modeParams === 'pair') {
        p.set('mode', 'bookstore');
        p.delete('cpid')
        p.delete('bpid')
        p.set('view', 'bookstore')
        console.log('[onChangeViewClick]', p.toString())
        } else {
        p.set('view', viewParams === 'cafe'? 'bookstore': 'cafe')
        console.log('[else: onChangeViewClick]', p.toString())
        }
        
        setSearchParams(p);

    }

    return{ 
        searchParams, 
        onPairClick, 
        onBookstoreClick, 
        onCafeClick,
        onChangeViewClick,
        lat, 
        lng, 
        searchMode, 
        view }
}
