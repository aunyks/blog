import Web3 from 'web3'
import { useWallet } from 'use-wallet'

export default function useWeb3() {
  const wallet = useWallet()
  if (wallet.error) {
    return { web3: null, ...wallet }
  }
  return { web3: new Web3(wallet.ethereum), ...wallet }
}