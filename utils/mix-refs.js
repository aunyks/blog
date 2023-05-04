export default function mixRefs(refList) {
  return function (domElement) {
    for (const ref of refList) {
      ref.current = domElement
    }
  }
}
