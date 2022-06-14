import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (element, { onNavigate, defaultHistory, initialPath }) => {
  // defaultHistory for running in isolation, otherwise use memory history
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  })

  // listen to navigation and call the onNavigate callback from container
  // no onNavigate if running in isolation
  if(onNavigate) history.listen(onNavigate)

  ReactDom.render(
    <App history={history} />,
    element
  )

  return {
    onParentNavigate({ pathname: nextPathname}) {
      if (history.location.pathname !== nextPathname) history.push(nextPathname)
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root')

  if (devRoot) {
    // run in isolation so create a defaultHistory
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

export { mount }