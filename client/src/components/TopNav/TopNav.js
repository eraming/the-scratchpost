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
            projects: [],
            selectedProject: '',
            isHidden: true,
          }

    componentDidMount() {
      this.fetchProjects();

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

    //set state of current selected project
    selectProject = (projectName) => {
      console.log('selected project: ', projectName)
      this.setState({
        selectedProject: projectName,
      });
    }

    //toggle sidebar visibility
    toggleHidden () {
      console.log('toggling div');
      // this.state.isHidden = !this.state.isHidden
      this.setState({
        isHidden: !this.state.isHidden
      })
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

      <h2>{this.state.selectedProject}</h2>
          <Switch>
            <Route exact path='/projects/' component={Project} />
            <Route exact path='/add/' component={NewProject} />
          </Switch>
        </div>

        <div class="sidebar">
          {!this.state.isHidden ?
             <ProjectSelector
             projects={this.state.projects}
             selectedProject={this.state.selectedProject}
             onSelectProject={this.selectProject}
             isHidden={this.state.isHidden}
             onToggleHidden={() => this.toggleHidden()}
             />
          : <button onClick={() => this.toggleHidden()}
          className="right-arrow-btn"
          > →</button>}

        </div>

      </div>
    );
  }
}




export default TopNav;
