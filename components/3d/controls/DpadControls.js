import {
  Html
} from 'components/3d/3d-html'

export default function DpadControls({ onForwardBack, onLeftRight, ...props }) {
  return (
    <Html
      center
      {...props}>
      <>
        <style jsx>{`
          .dpad-button {
            fill: rgba(48, 48, 48, 0.8);
            stroke: white;
            stroke-width: 5px;
          }

          .dpad-button:active {
            fill: rgba(48, 48, 48, 0.4);
          }
        `}</style>
        <svg id="dpad" width={200} viewBox="0 0 368 368" xmlns="http://www.w3.org/2000/svg">
          <path
            onTouchStart={() => onForwardBack(1)}
            onTouchEnd={() => onForwardBack(0)}
            id="dpad-up"
            className="dpad-button"
            d="M180.637 125.442L130.637 79.9879C129.594 79.0402 129 77.6969 129 76.2881V15C129 12.2386 131.239 10 134 10H234C236.761 10 239 12.2386 239 15V76.2881C239 77.6969 238.406 79.0402 237.363 79.9879L187.363 125.442C185.456 127.176 182.544 127.176 180.637 125.442Z" />
          <path
            onTouchStart={() => onForwardBack(-1)}
            onTouchEnd={() => onForwardBack(0)}
            id="dpad-down"
            className="dpad-button"
            d="M187.363 242.058L237.363 287.512C238.406 288.46 239 289.803 239 291.212V352.5C239 355.261 236.761 357.5 234 357.5H134C131.239 357.5 129 355.261 129 352.5V291.212C129 289.803 129.594 288.46 130.637 287.512L180.637 242.058C182.544 240.324 185.456 240.324 187.363 242.058Z" />
          <path
            onTouchStart={() => onLeftRight(1)}
            onTouchEnd={() => onLeftRight(0)}
            id="dpad-right"
            className="dpad-button"
            d="M242.058 179.637L287.512 129.637C288.46 128.594 289.803 128 291.212 128H352.5C355.261 128 357.5 130.239 357.5 133V233C357.5 235.761 355.261 238 352.5 238H291.212C289.803 238 288.46 237.406 287.512 236.363L242.058 186.363C240.324 184.456 240.324 181.544 242.058 179.637Z" />
          <path
            onTouchStart={() => onLeftRight(-1)}
            onTouchEnd={() => onLeftRight(0)}
            id="dpad-left"
            className="dpad-button"
            d="M125.442 188.363L79.9879 238.363C79.0402 239.406 77.6969 240 76.2881 240H15C12.2386 240 10 237.761 10 235L10 135C10 132.239 12.2386 130 15 130H76.2881C77.6969 130 79.0402 130.594 79.9879 131.637L125.442 181.637C127.176 183.544 127.176 186.456 125.442 188.363Z" />
        </svg>
      </>
    </Html>
  )
}

