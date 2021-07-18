import { providers } from 'ethers'
import { useWallet } from 'use-wallet'

export default function useEthers() {
  const wallet = useWallet()
  if (wallet.error) {
    return { ethers: null, ...wallet }
  }
  return { ethers: new providers.Web3Provider(wallet.ethereum), ...wallet }
}