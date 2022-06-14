import { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default () => {
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    // onParentNavigate is the callback to update the child memory router
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        if (history.location !== nextPathname) history.push(nextPathname)
      }
    })

    // listen to changes in the browser history and send it to the child
    history.listen(onParentNavigate)

    // only run when child app is mounted
  }, [])


  return (
    <div ref={ref} />
  )
}