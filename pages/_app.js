import UserProvider from '../context/userContext'
import '../styles/index.css'

// Custom App to wrap it with context provider
export default ({ Component, pageProps }) => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
)
