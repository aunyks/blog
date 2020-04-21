import Head from 'next/head'
import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import firebase from '../firebase/clientApp'

export default () => {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser()

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user)
    }
    debugger
    // You also have your firebase app initialized
    console.log(firebase)
  }, [loadingUser, user])

  return (
    <div className="container">
      <Head>
        <title>Next.js w/ Firebase Client-Side</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title text-xs">Next.js w/ Firebase Client-Side</h1>
        <p className="description">Fill in your credentials to get started</p>
      </main>

      <footer>
        <a
          href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
        </a>
      </footer>
    </div>
  )
}
