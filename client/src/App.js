import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import {Button} from 'kc-react-widgets';
import './App.css';
import background from './crossline-lines.png'
import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Project from './components/pages/Project/Project.js';
import NewProject from './components/pages/NewProject/NewProject.js';
import ProjectSelector from './components/ProjectSelector/ProjectSelector';


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
          }

          selectProject = (projectName) => {
            this.setState({
              selectedProject: projectName,
            });
          }
  
  componentDidMount() {
    this.fetchProjects();
    // TODO:
    // Do fetch (GET) to get all "actualprojects"
    // After fetch, do setState to set the projects list to be
    // the ones that came from the database
  }

  fetchProjects() {
    console.log('Fetching projects: ');
    fetch('/api/mongodb/actualprojects/')
      .then(response => response.json())
      .then(data => {
        console.log('projects back: ', data);
        this.setState({
          projects: data,
        });
      });
  }
          


  render() {
    return (

      <div className="App">
        <nav className="App-navigation">
          <h1 className="App-title">the scratchPost</h1>

          

          <Link to="/profile/">
          <Button>
                home
             </Button>
          </Link>

          <Link to="/">
          <Button>
                account
             </Button>
          </Link>

          <Link to="/add/">
          <Button>
                new project
             </Button>
          </Link>


        </nav>

        <ProjectSelector
          projects={this.state.projects}
          selectedProject={this.state.selectedProject}
          onSelectProject={this.selectProject} />

        <div className="App-mainContent">

          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/profile/' component={Project} />
            <Route exact path='/add/' component={NewProject} />
          </Switch>
        </div>

      </div>
    );
  }
}




export default App;
