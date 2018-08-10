import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import signup from './components/signup.js';
import Signin from './components/signin.js';
import Jokes from './components/jokes.js';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Signin} />
        <Route path='/signup' component={signup} />
        <Route path='/jokes' component={Jokes} />
      </div>
    );
  }
}

export default App;
