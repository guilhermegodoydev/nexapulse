import { useSearchParams } from "react-router-dom";

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (key) => searchParams.get(key);

  const setParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const clearParams = (keys) => {
    const newParams = new URLSearchParams(searchParams);
    keys.forEach((key) => newParams.delete(key));
    setSearchParams(newParams);
  };

  return { getParams, setParams, clearParams, searchParams };
}
