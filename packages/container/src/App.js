import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/auth" component={AuthLazy}>
                  <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                </Route>
                <Route path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
      </StylesProvider>
    </BrowserRouter>
  )
}