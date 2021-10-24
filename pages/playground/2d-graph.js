import ReactFlow, { Background } from 'react-flow-renderer'

export default function TwoDGraph() {
  // Only style props work, so probably best 
  // to use with JS darkmode and devicesize hooks for reponsiveness
  return (
    <>
      <div style={{ width: '2000px', height: '1000px' }}>
        <ReactFlow elements={[
          { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
          // you can also pass a React Node as a label
          { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
          { id: 'e1-2', source: '1', target: '2', animated: true, style: { fill: 'rgba(0, 0, 0, 0)' } },
        ]}>
          <Background
            variant="dots"
          />
        </ReactFlow>
      </div>
    </>
  )
}