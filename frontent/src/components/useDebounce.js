import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => {
    const [debounceSearch, setDebounceSearch] = useState(value);
    useEffect(() => {
        let timer = setTimeout(() => {
            setDebounceSearch(value);
        }, delay)

        return (() => {
            clearTimeout(timer);
        })
    }, [value, delay])

    return debounceSearch;
}