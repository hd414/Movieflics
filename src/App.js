import React from 'react'
import { Route, Switch } from 'react-router-dom';
import RowContainer from './containers/Row.container';
import { IsProtectedPage, IsUserRedirect } from './helpers/routes';
import { UseAuthListener } from './hooks/use-auth-listener';
import { Home } from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';


function App() {
  const user = UseAuthListener();

  return (
    <>

      <Switch>
        <Route
          exact
          path="/"
          render={() => (<IsUserRedirect user={user} exact loggedInPath={'/browse'}><Home /></IsUserRedirect>)}
        />

        <Route
          exact
          path="/signin"
          render={() => (<IsUserRedirect user={user} exact loggedInPath={'/browse'}><Signin /></IsUserRedirect>)}
        />

        <Route
          exact
          path="/signup"
          render={() => (<IsUserRedirect user={user} exact loggedInPath={'/browse'}><Signup /></IsUserRedirect>)}
        />

        <Route
          exact
          path="/browse"
          render={() => (<IsProtectedPage user={user} Path={'/'} exact><RowContainer /></IsProtectedPage>)}
        />

      </Switch>


    </>
  );
}

export default App;
