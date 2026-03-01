import { useEffect, useState } from "react";
import { Card, CardSkeleton } from "./card/Card";
import { Search, Loader2 } from "lucide-react";
import { useDebounce } from "../lib/useDebounce";

export function SearchBar({ isLoading, onSearch, placeholder, initialValue = "", className = "" }) {
    const [ inputValue, setInputValue ] = useState(initialValue);
    const debouncedValue = useDebounce(inputValue, 500);
    
    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    if (isLoading && !inputValue) return <CardSkeleton className="min-h-[40px] mt-10 mb-5"/>;

    return (
        <Card className={`flex gap-3 ${className}`}>
            {isLoading ? (
                <Loader2 className="animate-spin text-content-base" size={20} />
            ) : (
                <Search className="text-content-base" size={20} />
            )}
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