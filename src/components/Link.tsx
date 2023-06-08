import React, { ReactNode } from 'react'

type LinkProps = {
  to: string
  children: ReactNode
}

const Link = ({ to, children }: LinkProps) => {
  const preventReload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault() // prevents setting path and stepping on state
    window.history.pushState({}, '', to)
    const navigationEvent = new PopStateEvent('popstate') // tell router that path has been changed and page needs rerendering
    window.dispatchEvent(navigationEvent)
  }

  return (
    <a href={to} onClick={preventReload}>
      {children}
    </a>
  )
}

export default Link
