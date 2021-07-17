import Modal from 'components/Modal'
import useDeviceSize from 'hooks/use-device-size'
import useWeb3 from 'hooks/use-web3'

function MetaMaskVector({ width }) {
  return (
    <svg className="force-default-colors" width={`${width}`} viewBox="0 0 30 30" fill="none">
      <path d="M28.4229 1.17953L16.7889 9.82025L18.9403 4.72235L28.4229 1.17953Z" fill="#E2761B" stroke="#E2761B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.56537 1.17953L13.1058 9.9021L11.0596 4.72235L1.56537 1.17953Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.237 21.2087L21.1385 25.9558L27.7682 27.7798L29.674 21.3139L24.237 21.2087Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.337646 21.3139L2.23182 27.7798L8.86144 25.9558L5.76294 21.2087L0.337646 21.3139Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.48724 13.1877L6.63983 15.9822L13.2227 16.2745L12.9888 9.20056L8.48724 13.1877Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.5009 13.1877L16.9409 9.11871L16.7889 16.2745L23.36 15.9822L21.5009 13.1877Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.86145 25.9558L12.8135 24.0266L9.3993 21.3607L8.86145 25.9558Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.1748 24.0266L21.1385 25.9558L20.589 21.3607L17.1748 24.0266Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.1385 25.9558L17.1748 24.0266L17.4905 26.6106L17.4554 27.698L21.1385 25.9558Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.86145 25.9558L12.5446 27.698L12.5212 26.6106L12.8135 24.0266L8.86145 25.9558Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.603 19.6536L9.30573 18.6831L11.6325 17.6191L12.603 19.6536Z" fill="#233447" stroke="#233447" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.3852 19.6536L18.3557 17.6191L20.6942 18.6831L17.3852 19.6536Z" fill="#233447" stroke="#233447" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.86144 25.9558L9.42267 21.2087L5.76294 21.3139L8.86144 25.9558Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.5773 21.2087L21.1385 25.9558L24.237 21.3139L20.5773 21.2087Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.36 15.9821L16.7889 16.2745L17.3969 19.6536L18.3674 17.6191L20.7058 18.6831L23.36 15.9821Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.30498 18.6831L11.6435 17.6191L12.6022 19.6536L13.2219 16.2745L6.6391 15.9821L9.30498 18.6831Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.63983 15.9821L9.39925 21.3607L9.30571 18.6831L6.63983 15.9821Z" fill="#E4751F" stroke="#E4751F" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.7059 18.6831L20.589 21.3607L23.3601 15.9821L20.7059 18.6831Z" fill="#E4751F" stroke="#E4751F" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.2227 16.2745L12.603 19.6536L13.3747 23.6407L13.5501 18.3908L13.2227 16.2745Z" fill="#E4751F" stroke="#E4751F" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.7889 16.2745L16.4732 18.3791L16.6135 23.6407L17.3969 19.6536L16.7889 16.2745Z" fill="#E4751F" stroke="#E4751F" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.3969 19.6536L16.6135 23.6407L17.1748 24.0266L20.589 21.3607L20.7059 18.6831L17.3969 19.6536Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.30573 18.6831L9.39927 21.3607L12.8135 24.0266L13.3747 23.6407L12.603 19.6536L9.30573 18.6831Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.4554 27.698L17.4905 26.6106L17.1982 26.3534H12.7901L12.5212 26.6106L12.5446 27.698L8.86145 25.9558L10.1476 27.0081L12.755 28.8205H17.2332L19.8523 27.0081L21.1385 25.9558L17.4554 27.698Z" fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.1747 24.0266L16.6135 23.6407H13.3747L12.8134 24.0266L12.5211 26.6106L12.79 26.3534H17.1981L17.4904 26.6106L17.1747 24.0266Z" fill="#161616" stroke="#161616" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28.914 10.3815L29.9079 5.61097L28.4229 1.17953L17.1748 9.52794L21.501 13.1877L27.6162 14.9766L28.9725 13.3981L28.3879 12.9772L29.3233 12.1237L28.5983 11.5624L29.5337 10.8492L28.914 10.3815Z" fill="#763D16" stroke="#763D16" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.0921021 5.61097L1.08596 10.3815L0.454568 10.8492L1.38996 11.5624L0.676724 12.1237L1.61212 12.9772L1.0275 13.3981L2.37213 14.9766L8.48728 13.1877L12.8135 9.52794L1.56535 1.17953L0.0921021 5.61097Z" fill="#763D16" stroke="#763D16" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.6162 14.9766L21.501 13.1877L23.3601 15.9821L20.589 21.3607L24.237 21.3139H29.674L27.6162 14.9766Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.48728 13.1877L2.37213 14.9766L0.337646 21.3139H5.76294L9.39929 21.3607L6.63988 15.9821L8.48728 13.1877Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.7889 16.2745L17.1748 9.52795L18.952 4.72235H11.0596L12.8135 9.52795L13.2227 16.2745L13.363 18.4025L13.3747 23.6407H16.6135L16.6369 18.4025L16.7889 16.2745Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.116924" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WalletConnectVector({ width }) {
  return (
    <svg className="force-default-colors" width={`${width}`} viewBox="0 0 300 185">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill="#3B99FC" fillRule="nonzero">
          <path d="M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z" id="WalletConnect"></path>
        </g>
      </g>
    </svg>
  )
}

function CBWalletVector({ width }) {
  return (
    <svg className="force-default-colors" width={`${width}`} viewBox="0 0 30 30" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M15 -8.9407e-07C6.71573 -8.9407e-07 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 -8.9407e-07 15 -8.9407e-07Z" fill="url(#paint0_linear)" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.16229 15C6.16229 10.1191 10.1191 6.16232 15 6.16232C19.8809 6.16232 23.8377 10.1191 23.8377 15C23.8377 19.8809 19.8809 23.8377 15 23.8377C10.1191 23.8377 6.16229 19.8809 6.16229 15ZM12.7415 17.8477C12.4161 17.8477 12.1523 17.5839 12.1523 17.2585V12.7415C12.1523 12.4161 12.4161 12.1523 12.7415 12.1523H17.2585C17.5839 12.1523 17.8477 12.4161 17.8477 12.7415V17.2585C17.8477 17.5839 17.5839 17.8477 17.2585 17.8477H12.7415Z" fill="white" />
      <defs>
        <linearGradient id="paint0_linear" x1="15" y1="30" x2="15" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2E66F8" />
          <stop offset="1" stopColor="#124ADB" />
        </linearGradient>
      </defs>
    </svg>

  )
}

function FortmaticVector({ width }) {
  return (
    <svg className="force-default-colors" width={`${width}`} viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#6851FF" fillRule="evenodd" clipRule="evenodd" d="M52.9991 16.0312H72.483H91.967V35.4789H72.483H52.9991H33.5151V54.9266V56.1736V74.261V74.3743V93.709H14.0312V74.3743V74.261V56.1736V54.9266V35.4789V16.0312H33.5151H52.9991ZM72.4823 74.26H53.1119V54.9256H91.955V74.9402C91.955 79.9156 89.975 84.688 86.452 88.207C82.928 91.726 78.1483 93.705 73.1636 93.708H72.4823V74.26Z" fill="#6851FF" />
    </svg>
  )
}

function WalletOption({
  // To be passed into useWallet's connect function 
  // https://github.com/aragon/use-wallet/tree/master#connectors
  connectorType,
  onSelect
}) {
  const deviceSize = useDeviceSize()
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

  let imageWidth = null
  switch (deviceSize) {
    case 'xs':
      imageWidth = 30
      break
    case 'sm':
      imageWidth = 45
      break
    case 'md':
      imageWidth = 45
      break
    case 'lg':
      imageWidth = 45
      break
    default:
      throw new Error('Unknown device size found in WalletOption')
  }

  return (
    <>
      <style jsx>{`
      li {
        border-width: 4px;
      }

      svg {
        fill: initial;
        stroke: initial;
      }
    `}</style>
      <li className="list-none mx-0 my-2 p-0 rounded solid" >
        <button onClick={onSelect} className="flex items-center m-0 w-full h-full p-2">
          <div className="mx-1 inline-block">
            {(() => {
              switch (connectorType) {
                case 'injected':
                  return <MetaMaskVector width={imageWidth} />
                  break
                case 'fortmatic':
                  return <FortmaticVector width={imageWidth} />
                  break
                case 'walletconnect':
                  return <WalletConnectVector width={imageWidth} />
                  break
                case 'walletlink':
                  return <CBWalletVector width={imageWidth} />
                  break
                default:
                  throw new Error('Unrecognized connectorType given to WalletOption')
              }
            })()}
          </div>
          <span className="mx-1 sm:text-md md:text-lg">{optionTitle}</span>
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