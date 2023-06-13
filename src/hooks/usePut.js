import { useEffect, useState } from 'react';
import query from '../api/query';

const usePut =(url,payload)=>{
    const [err, setErr]  = useState(false);
    const [data, setData] = useState(null);
    useEffect(()=>{ (async()=>{
        try{
            await query.put(url,{data:payload})
            setData(payload)
            // console.log(item)
        }
        catch(e){
            console.log(e);
            setErr(true)
        }
    })()},[])
    
    return { data, err};
}
export default usePut;