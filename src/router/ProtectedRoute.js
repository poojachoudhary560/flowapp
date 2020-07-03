import React from 'react'
import { Route, Redirect } from 'react-router-dom'
//import { AuthConsumer } from './AuthContext'
import UserContext from '../context/user/UserContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ authenticated }) => (
      <Route
        render={props =>
          (authenticated) ? <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </UserContext.Consumer>
)

export default ProtectedRoute
