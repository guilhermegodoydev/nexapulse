import { useEffect, useState } from "react";
import { Card, CardSkeleton } from "./card/Card";
import { Search } from "lucide-react";
import { useDebounce } from "../lib/useDebounce";

export function SearchBar({ isLoading, onSearch, placeholder, initialValue = "", className = "" }) {
    const [ inputValue, setInputValue ] = useState(initialValue);
    const debouncedSearch = useDebounce(inputValue, 500);
    
    useEffect(() => {
        onSearch(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    if (isLoading) return <CardSkeleton className="min-h-100"/>;

    return (
        <Card className={`flex gap-3 ${className}`}>
            <Search className="text-content-base"/>
            <input 
                id="search-bar"
                type="text" 
                placeholder={placeholder} 
                className="w-full px-2 dark:text-white" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
            />
        </Card>
    );
};