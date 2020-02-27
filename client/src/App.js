import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import {Button} from 'kc-react-widgets';
import './App.css';
import background from './crossline-lines.png'
import LandingPage from './components/pages/LandingPage/LandingPage.js'
import Project from './components/pages/Project/Project.js';
import AddCard from './components/pages/AddCard/AddCard.js';
import TopNav from './components/TopNav/TopNav.js';


class App extends Component {
  componentDidMount(){
   document.title = "the scratchPost"
 }




  render() {
    return (

      <div className="App">
      <TopNav />
      <Switch>
        <Route exact path='/' component={LandingPage} />
      </Switch>

      </div>
    );
  }
}




export default App;
