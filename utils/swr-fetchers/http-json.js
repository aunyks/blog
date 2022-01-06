import useSWR from 'swr'

// This assumes that the api will return json
// *even if the status code isn't 2xx*
const httpJsonFetcher = async (url) => {
  const res = await fetch(url)
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.status = res.status
    error.info = await res.json()
    throw error
  }
  return res.json()
}

// Example user / auth hook. Can call sign in and out separately
// since on they'll handle cookies. This will just work, as long as those handle
// receiving & deleting cookies
// function useUser (id) {
//   const { data, error } = useSWR(`/api/user/${id}`, httpJsonFetcher)
//   return {
//     user: data,
//     isLoading: !error && !data,
//     error
//   }
// }

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>

export default httpJsonFetcher
