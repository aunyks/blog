import { UseWalletProvider } from 'use-wallet'
import Web3Modal from 'components/Web3Modal'
import { useState } from 'react'
import useWeb3 from 'hooks/use-web3'

function App() {
  const [modalActive, setModalActive] = useState(false)
  const { status, reset } = useWeb3()
  return (
    <div>
      <p>
        Status: {status}
      </p>
      <button onClick={() => setModalActive(true)}>
        Connect Wallet
      </button>
      <button onClick={() => reset()}>
        Reset
      </button>
      <Web3Modal id="web3modal" onClose={() => setModalActive(false)} active={modalActive} />
    </div>
  )
}

export default function Web3Page() {
  return (
    <UseWalletProvider connectors={{
      walletconnect: { rpcUrl: 'https://bridge.walletconnect.org' }
    }}>
      <App />
    </UseWalletProvider>
  )
}