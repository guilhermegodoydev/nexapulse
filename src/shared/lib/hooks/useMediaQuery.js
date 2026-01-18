import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        setMatches(mediaQueryList.matches);
        
        const listener = (e) => setMatches(e.matches);
        mediaQueryList.addEventListener('change', listener);

        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, [query]);

    return matches;
}