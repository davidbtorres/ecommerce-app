import { useState, useEffect } from 'react'

const Route = ({ path, component: Component, ...props }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname) // after a navigation event, check what current window path is set to
    }
    window.addEventListener('navigate', onLocationChange) // listen for navigation events
    return () => window.removeEventListener('navigate', onLocationChange) // must remove event to prevent multiple path changes
  }, [])

  // will test that the url matches the format without needing to be exact.
  const isMatch = new RegExp(`^${path.replace(/:\w+/g, '\\d+')}$`).test(
    currentPath
  )

  return isMatch ? <Component {...props} /> : null // return set path after useEffect
}

export default Route
