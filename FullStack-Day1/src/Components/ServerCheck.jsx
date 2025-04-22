import React from 'react'
import useFetch from '../hooks/useFetch';

const ServerCheck = () => {
    const {data, error, loading, refetch} = useFetch('https://jsonplaceholder.typicode.com/posts');
  return (
    <>
    <div style={{padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', fontFamily: 'Arial, sans-serif'}}>
        <h2>Post Lists</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>Error: {error.message}</p>}
        {data && (
            <ul>
                {data.slice(0, 30).map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        )}
        <button onClick={refetch} style={{marginTop: '10px'}}>Refetch</button>

    </div>
    </>
  )
}

export default ServerCheck