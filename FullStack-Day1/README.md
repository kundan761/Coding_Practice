
# useFetch Cache Hook

This hook fetches data from a given URL and caches the response in `sessionStorage` for 5 minutes to avoid repeated network requests. After the cache expires, the hook automatically refetches the data from the network. It also provides a `refetch` function to manually bypass the cache and fetch fresh data.

## Installation

```markdown
npm install
```

## Usage

### Basic Usage

```jsx
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
```

### Explanation of TTL (Time to Live)

The hook uses a **TTL of 5 minutes** for cached data. The TTL is defined as:

```js
const TTL = 5 * 60 * 1000; 
```

- **First call**: The data is fetched and cached in `sessionStorage` along with a timestamp (`ts`).
- **Subsequent calls** (within 5 minutes): The cached data is returned immediately, skipping the network request.
- **After 5 minutes**: The cache expires, and the data is refetched automatically.
- **`refetch()`**: If called, it bypasses the cache and fetches fresh data, regardless of TTL.

## Stretch Features (Optional)

- In-memory fallback when `sessionStorage` is unavailable.
- Abort ongoing fetch requests with `AbortController` on component unmount.

## License

MIT License

---
