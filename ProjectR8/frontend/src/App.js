import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(()=>{
    //Cant use async in the callback function of useEffect,
    //Hence using Immediately Invoked Function Expression and remember
    //To use ; before IIFE
    const controller = new AbortController()
    //It is not used for any throttling or debouncing purposes but for race conditions for APIs request that is
    //being fired upon every keystroke, it only sends the final API req
    ;(async()=>{
    try {
        setError(false)
        setLoading(true)
        const response = await axios.get("http://localhost:3000/api/products?search=" + search, {
          signal: controller.signal
        })
        console.log(response.data);
        setProducts(response.data)
        setLoading(false);
    } catch (error) {
        if(axios.isCancel(error)){
          console.log("Request Canceled", error.message)
          return;
        }
        setError(true)
        setLoading(false)
    }
    })()

    //Cleanup
    return () => {
      controller.abort()
    }
  }, [search])

  if(error){
    return <h1>Something went wrong</h1>
  }

  if(loading){
    return <h1>Loading...</h1>
  }
  let searchTimeout;

  return (
   <>
   <h1>
    Axios Practice 
   </h1>
   <h2>Number of Products are: {products.length}</h2>
   <input type='text' placeholder='Search'
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
   />
   </>
  );
}

export default App;