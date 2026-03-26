import { useSearchParams } from "react-router-dom";

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (key) => searchParams.get(key);

  const setParams = (paramsObj) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        newParams.set(key, String(value));
      } else {
        newParams.delete(key);
      }      
    });
    
    if (newParams.toString() !== searchParams.toString()) {
        setSearchParams(newParams);
    }
  };

  const clearParams = (keys) => {
    const newParams = new URLSearchParams(searchParams);
    keys.forEach((key) => newParams.delete(key));
    setSearchParams(newParams);
  };

  return { getParams, setParams, clearParams, searchParams };
}
