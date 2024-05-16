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
    let timer;
    const fetchData =  async()=>{
    try {
        setError(false)
        setLoading(true)
        const response = await axios.get("http://localhost:3000/api/products?search=" + search, {
          signal: controller.signal
        })
        //The await keyword indeed ensures that the asynchronous operation (the Axios request) 
        //completes before moving to the next line within the async function. However, the subsequent lines are not blocked from execution while awaiting the completion of the Axios request.
        //Once the Axios request completes, the await keyword resolves, and the response is received. 
        //Then, setProducts(response.data) is called to update the state with the fetched data.
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
  }

    const delayedFetchedData = () =>{
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fetchData()
      }, 1000)
    }

    delayedFetchedData();

    //Cleanup
    return () => {
      controller.abort()
      clearTimeout(timer);
    }
  }, [search])

  //This debounce mechanism helps to reduce the number of API calls and unnecessary re-renders of the component. 
  //Adjust the delay time as needed based on your requirements.

  if(error){
    return <h1>Something went wrong</h1>
  }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
   <>
   <h1>
    Axios Practice 
   </h1>
   <h2>Number of Products are: {products.length}</h2>
   <h2> Number of Products you searched:</h2>
   <ul>
    {products.map(product => (
      <li key={product.id}>
        {product.name}
      </li>
    ))}
   </ul>
   <input type='text' placeholder='Search'
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
   />
   </>
  );
}

export default App;