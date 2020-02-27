import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import {Button} from 'kc-react-widgets';
import './TopNav.css';

import LandingPage from '../pages/LandingPage/LandingPage.js';
import Project from '../pages/Project/Project.js';
import AddCard from '../pages/AddCard/AddCard.js';


class TopNav extends Component {




  render() {
    return (

      <div className="TopNav">
        <nav className="TopNav-navigation">
          <h1 className="TopNav-title">the scratchPost</h1>

          <Link to="/projects/">
          <Button>
                the post
             </Button>
          </Link>

          <Link to="/">
          <Button>
                home
             </Button>
          </Link>

          <Link to="/add/">
          <Button>
                add project
             </Button>
          </Link>


        </nav>

        <div className="TopNav-mainContent">

          <Switch>
            <Route exact path='/projects/' component={Project} />
            <Route exact path='/add/' component={AddCard} />
          </Switch>
        </div>

      </div>
    );
  }
}




export default TopNav;
