import { useSearchParams } from 'react-router-dom';

export function useSearchQuerySync(){
    const[searchParams, setSearchParams] = useSearchParams()

    const lat = Number(searchParams.get('lat'));
    const lng = Number(searchParams.get('lng'));
    const searchMode = searchParams.get('mode') ?? 'bookstore';
    const view = searchParams.get('view') ?? 'bookstore'

    const onPairClick = (activeBookstore, cafe) => {
        const p = new URLSearchParams(searchParams);
        (p.set('bpid', activeBookstore.place_id), p.set('cpid', cafe.place_id));
        p.set('mode', 'pair');
        p.set('view', 'cafe')
        console.log('[onPairClick]', p.toString())
        setSearchParams(p);
    };

  const onBookstoreClick = (activeBookstore) => {
    const p = new URLSearchParams(searchParams);
    p.set('bpid', activeBookstore.place_id);
    p.set('mode', 'bookstore');
    p.set('view', 'bookstore')
    console.log('[onBookstoreClick]', p.toString())
    setSearchParams(p);
  };

  const onCafeClick = (activeCafe) => {
    const p = new URLSearchParams(searchParams);
    p.set('cpid', activeCafe.place_id);
    p.set('mode', 'cafe');
    setSearchParams(p);
  };

  const handleBookstoreDetailToggle = (bookstore, isOpen) => {
    const p = new URLSearchParams(searchParams);
    if (isOpen) {
      p.set('bpid', bookstore.place_id);
    } else if (p.get('bpid') === bookstore.place_id) {
      p.delete('bpid');
    }

    console.log('[handleBookstoreDetailToggle]', p.toString())
    setSearchParams(p);
  };

  const handleCafeDetailToggle = (cafe, isOpen) => {
    const p = new URLSearchParams(searchParams);
    if (isOpen && searchMode === 'pair') {
      p.set('cpid', cafe.place_id);
      p.set('mode', 'pair');
    } else if (p.get('cpid') === cafe.place_id) {
      p.delete('cpid');
    } else {
        
    }

    setSearchParams(p);
  };

  const onChangeViewClick = (isOpenCafeCard) => {
    const p = new URLSearchParams(searchParams)
    if(searchMode === 'pair') {
      p.set('mode', 'bookstore');
      p.delete('cpid')
      p.delete('bpid')
      p.set('view', 'bookstore')
      console.log('[onChangeViewClick]', p.toString())
    } else {
      p.set('view', isOpenCafeCard? 'cafe': 'bookstore')
      console.log('[else: onChangeViewClick]', p.toString())
    }
    
    setSearchParams(p);

  }

    return{ 
        searchParams, 
        onPairClick, 
        onBookstoreClick, 
        onCafeClick,
        handleBookstoreDetailToggle,  
        handleCafeDetailToggle,
        onChangeViewClick,
        lat, 
        lng, 
        searchMode, 
        view }
}
