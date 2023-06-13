import { useEffect, useState } from 'react';
import query from '../api/query';

const useFetch =(url)=>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]  =useState(false);
    
    useEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const {data} = await query.get(url);
                setData(data)
            }
            catch(e){
                console.log(e);
                setError(true);
            }
            setLoading(false);
        })()
    },[url]);
    return {data, loading, error};
}
export default useFetch;