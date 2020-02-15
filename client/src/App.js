import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import {Button} from 'kc-react-widgets';

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Project from './components/pages/Project/Project.js';
import AddCard from './components/pages/AddCard/AddCard.js';

class App extends Component {
          state = {
            cards: [],
          }

  render() {
    return (

      <div className="App">
        <nav className="App-navigation">
          <h1 className="App-title">the scratchPost</h1>

          <Link to="/profile/">
          <Button onClick={() => console.log('Hello world!')}>
                home
             </Button>
          </Link>

          <Link to="/">
          <Button onClick={() => console.log('Hello world!')}>
                account
             </Button>
          </Link>

          <Link to="/add/">
          <Button onClick={() => console.log('Hello world!')}>
                add beat
             </Button>
          </Link>
        </nav>

        <div className="App-mainContent">



          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/profile/' component={Project} />
            <Route exact path='/add/' component={AddCard} />
          </Switch>
        </div>

      </div>
    );
  }
}




export default App;
