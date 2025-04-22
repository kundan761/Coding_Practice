```markdown
# useFetch Cache Hook

This hook fetches data from a given URL and caches the response in `sessionStorage` for 5 minutes to avoid repeated network requests. After the cache expires, the hook automatically refetches the data from the network. It also provides a `refetch` function to manually bypass the cache and fetch fresh data.

## Installation

```bash
npm install
```

## Usage

### Basic Usage

```jsx
import useFetch from './hooks/useFetch';

const MyComponent = () => {
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};
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
