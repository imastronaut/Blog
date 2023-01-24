import {useState, useEffect} from 'react'
import axios form 'axios'


const useAxiosFetch = (dataUrl)=>{
    const [data, setData] =useState([])
    const [fetchError, setFetchError] = useState(false)
    const [isLoading, setIsLoading] = useState(null)

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async(Url)=>{
            setIsLoading(true)
            try{
                const response = axios.get(Url,{
                    cancelToken : source.token
                });
                if(isMounted)
            }
        }
    })

}

export default useAxiosFetch;