import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import {Button} from 'kc-react-widgets';
import './App.css';
import background from './crossline-lines.png'
import LandingPage from './components/pages/LandingPage/LandingPage.js'
import Project from './components/pages/Project/Project.js';
import NewProject from './components/pages/NewProject/NewProject.js';
import ProjectSelector from './components/ProjectSelector/ProjectSelector';

import TopNav from './components/TopNav/TopNav.js';



class App extends Component {
          state = {
            projects: [
              'parking-lot',
              'random',
              'jokes',
            ],
            selectedProject: 'parking-lot',
            newCards: [],
            availableCards: [],
            isStarred: true,
            highlight: false,
            textarea: '',
            isHidden: true
          }

          

          

  render() {
    return (

      <div className="App">

      <TopNav />
      <Switch>
        <Route exact path='/' component={LandingPage} />
      </Switch>

      {/* <div class="sidebar">
        <ProjectSelector
          projects={this.state.projects}
          selectedProject={this.state.selectedProject}
          onSelectProject={this.selectProject} />
        </div> */}


      </div>
    );
  }
}




export default App;
