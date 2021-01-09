import {
  useState,
  useEffect
} from 'react'
import useDarkMode from 'hooks/use-dark-mode'

const BOX_STATES = {
  AWAITING_ACCESS: 'awaiting-access',
  READY_TO_SEND: 'ready-to-send',
  SENDING: 'sending',
  SENT: 'sent',
  ERROR: 'error'
}

export default function Web3TipBox() {
  const {
    AWAITING_ACCESS,
    READY_TO_SEND,
    SENDING,
    SENT,
    ERROR
  } = BOX_STATES
  const isDark = useDarkMode()
  const [hasEthWallet, setEthWalletExistence] = useState(false)
  const [boxState, setBoxState] = useState(AWAITING_ACCESS)

  useEffect(() => {
    setEthWalletExistence(!!window.ethereum || !!window.web3)
  }, [])

  return !hasEthWallet ? null : (
    <div className="my-5 w-full p-6 rounded-lg text-white" style={{ background: isDark ? '#5d44f8' : '#fab700', color: isDark ? 'white' : 'black' }}>
      <h4>Care to Donate?</h4>
      <p className="my-3 text-sm">
        {[AWAITING_ACCESS, READY_TO_SEND, SENDING].includes(boxState) && 'I see you like Ethereum as much as I do. If you liked this article, you can tip me some ETH.'}
        {boxState === ERROR && 'An error occured, but no worries! I\'ll take care of it some time later. Thanks anyway!'}
        {boxState === SENT && <>I really appreciate your generosity. If there's something in particular you think I should write about more, <a target="_blank" className="text-white" href="https://aunyks.com/contact" style={{ color: isDark ? 'white' : 'black' }}>let me know</a>!</>}
      </p>
      <button
        className="text-left text-sm px-4 bg-white text-black rounded"
        disabled={boxState === SENDING || boxState === SENT || boxState === ERROR}
        onClick={async () => {
          switch (boxState) {
            case AWAITING_ACCESS:
              const requestWallet = async () => {
                const NO_WALLET = 'no-wallet'
                const WALLET_DENIED = 'denied'
                const WALLET_ALLOWED = 'allowed'
                if (window.ethereum) {
                  window.web3 = new window.Web3(window.ethereum)
                  try {
                    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    return WALLET_ALLOWED
                  } catch (accessDeniedError1) {
                    try {
                      await window.ethereum.enable()
                      return WALLET_ALLOWED
                    } catch (accessDeniedError2) {
                      window.web3 = null
                      return WALLET_DENIED
                    }
                  }
                } else if (window.web3) {
                  window.web3 = new window.Web3(window.web3.currentProvider)
                  return WALLET_ALLOWED
                } else {
                  return NO_WALLET
                }
              }
              if (await requestWallet() === 'allowed') {
                setBoxState(READY_TO_SEND)
              }
              break;
            case READY_TO_SEND:
              const sendEth = async (toAddr, weiAmount) => {
                let newMethodSupported = false
                try {
                  // Try the latest method
                  let account = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
                  newMethodSupported = true
                  // See https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters
                  const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                      from: account,
                      to: toAddr,
                      value: weiAmount,
                    }],
                  })
                  return txHash
                } catch (txDenied1) {
                  // If the new method is supported but we're in 
                  // this catch block, the new method txion was denied
                  // If it isn't supported, we can try the old method
                  if (!newMethodSupported) {
                    return new Promise((resolve, reject) => {
                      // See https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction
                      window.web3.eth.sendTransaction({
                        from: window.web3.eth.accounts[0],
                        to: toAddr,
                        value: parseInt(weiAmount)
                      }, (receipt, error) => {
                        if (error) {
                          reject(error)
                          return
                        }
                        resolve(receipt)
                      })
                    })
                  } else {
                    throw new Error('Transaction request denied')
                  }
                }
              }
              try {
                // Try sending 0.005 ETH
                await sendEth('0x2125E5963f17643461bE3067bA75c62dAC9f3D4A', '20000000000000')
                setBoxState(SENT)
              } catch (e) {
                console.error(e)
                setBoxState(ERROR)
              }
              break;
            case SENDING:
            case SENT:
              // Button should be disabled now
              break;
            default:
              console.error('Default case met in Web3TipBox. Should never be met!')
          }
        }}>
        {boxState === AWAITING_ACCESS && 'Grant Wallet Access'}
        {boxState === READY_TO_SEND && 'Send 0.01 ETH'}
        {boxState === SENT && 'Thank you!'}
        {boxState === ERROR && 'Error'}
      </button>
    </div>
  )
}