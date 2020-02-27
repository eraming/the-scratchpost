import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import {Button} from 'kc-react-widgets';
import './TopNav.css';

import LandingPage from '../pages/LandingPage/LandingPage.js';
import Project from '../pages/Project/Project.js';
import NewProject from '../pages/NewProject/NewProject.js';

import ProjectSelector from '../ProjectSelector/ProjectSelector.js'
import '../ProjectSelector/ProjectSelector.css';


class TopNav extends Component {
          state = {
            newCards: [],
            availableCards: [],
            isStarred: true,
            highlight: false,
            textarea: '',
            projects: [
              'parking-lot',
              'random',
              'jokes',
            ],
            selectedProject: 'parking-lot'
          }

          componentDidMount() {
            this.fetchProjects();
        
          }
        
          // componentDidMount() {
            
          //   // TODO:
          //   // Do fetch (GET) to get all "actualprojects"
          //   // After fetch, do setState to set the projects list to be
          //   // the ones that came from the database
          // }
        
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
        
          selectProject = (projectName) => {
            this.setState({
              selectedProject: projectName,
            });
          }



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
            <Route exact path='/add/' component={NewProject} />
          </Switch>
        </div>

        <div class="sidebar">
        <ProjectSelector
          projects={this.state.projects}
          selectedProject={this.state.selectedProject}
          onSelectProject={this.selectProject} />
        </div>
        
      </div>
    );
  }
}




export default TopNav;
