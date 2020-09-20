import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import firebase from "firebase/app";
import './App.css'
function App() {
  const [currentUser, setCurrentUser] = useState()
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setAuthLoading(false)
    })
  }, [])

  return (
    <BrowserRouter>
      {!authLoading && <Switch>
        <Route exact path="/login">
          <Login currentUser={currentUser}/>
        </Route>
        <Route exact path="/signup">
          <SignUp currentUser={currentUser}/>
        </Route>
        <Route exact path="/">
          <Home currentUser={currentUser}/>
        </Route>
      </Switch>}
    </BrowserRouter>);
}
export default App;
