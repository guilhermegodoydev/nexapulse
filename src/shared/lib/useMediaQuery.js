import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => {
        return typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
    });


    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        
        const listener = (e) => setMatches(e.matches);
        mediaQueryList.addEventListener('change', listener);

        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, [query]);

    return matches;
}