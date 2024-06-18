//Making our own custom hook
import {useState, useEffect} from 'react'

//Custom hook we defined to get the json data of the from currency
function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`)
        .then((res)=>res.json())
        .then((res)=>setData(res[currency]))
        console.log(data);
    }, [currency])
    //Making an API call when the currency changes
    return data
}

export default useCurrencyInfo;