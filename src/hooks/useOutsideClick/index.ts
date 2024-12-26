import { useEffect } from 'react'

const useOutsideClick = (ref:HTMLElement,cb:() => void) => {
    const handleClick =(e: Event) => {
        if (ref && !ref.contains(e.target as HTMLElement)) {
            cb()
        }
    }

    useEffect(() => {
        document.addEventListener("click",handleClick )
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [ref])
}

export default useOutsideClick