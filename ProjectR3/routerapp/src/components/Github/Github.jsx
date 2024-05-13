import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Github = () => {
    const data = useLoaderData();
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      Github Repos: {data.public_repos} <br/>
      Username: {data.login} <br/>
      Bio: {data.bio} <br/>
      <img src={data.avatar_url} alt='Github Picture' width={300}/>
    </div>
  )
}

export default Github

export const githubInfoLoader = async()=>{
    const response = await fetch('https://api.github.com/users/sharmatushar14')
    return response.json();
}
