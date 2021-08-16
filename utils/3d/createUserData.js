const defaultUserData = {
  type: 'Unknown',
  name: 'None'
}

export default function createUserData(overrideUserData) {
  return Object.assign(defaultUserData, overrideUserData)
}