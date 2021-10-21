import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (element, { onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  })
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
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

export { mount }