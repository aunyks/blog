import Modal from 'components/Modal'
import useWeb3 from 'hooks/use-web3'

function WalletOption({
  // To be passed into useWallet's connect function 
  // https://github.com/aragon/use-wallet/tree/master#connectors
  connectorType,
  onSelect
}) {
  let optionTitle = null
  switch (connectorType) {
    case 'injected':
      optionTitle = 'MetaMask'
      break
    case 'fortmatic':
      optionTitle = 'Fortmatic'
      break
    case 'walletconnect':
      optionTitle = 'WalletConnect'
      break
    case 'walletlink':
      optionTitle = 'WalletLink'
      break
    default:
      throw new Error('Unrecognized connectorType given to WalletOption')
  }
  return (
    <>
      <style jsx>{`
      li {
        border-width: 4px;
      }
    `}</style>
      <li className="list-none mx-0 my-2 p-2 rounded solid" >
        <button onClick={onSelect} className="m-0 p-0">
          {optionTitle}
        </button>
      </li>
    </>
  )
}

const supportedConnectorTypes = [
  'injected',
  'walletconnect'
]

export default function Web3Modal({
  active,
  children,
  ...props
}) {
  if (children) {
    throw new Error('Web3Modal does not accept children')
  }
  const { error, web3, status, connect } = useWeb3()
  if (active && status === 'connected') {
    console.warn('Web3Modal set to active while web3 status is connected. Consider logging out / resetting first')
  }

  return (
    <Modal title="Connect your wallet" active={active && status !== 'connected'} {...props}>
      <ul>
        {supportedConnectorTypes.map(type => (
          <WalletOption key={type} connectorType={type} onSelect={() => connect(type)} />
        ))}
      </ul>
    </Modal>
  )
}