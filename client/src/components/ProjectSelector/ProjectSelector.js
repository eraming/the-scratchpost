import React, { Component } from 'react';
import './ProjectSelector.css';



class ProjectSelector extends Component {
  

  render() {
    return (
      <div className="ProjectSelector">
        <div className="ProjectSelector-projectHeader">
          All Projects <div onClick={() => this.props.onToggleHidden()}   className="collapse-left-btn">←</div>
         </div>
        {
          this.props.projects.map((projects, index) => (
            this.props.selectedProject === projects.title? (
              <div key={index} className="ProjectSelector-project ProjectSelector-project--selected">{projects.title}</div>
            ) : (
              <div onClick={() => this.props.onSelectProject(projects.title)} key={index} className="ProjectSelector-project"> {projects.title}</div>
            )
          ))
        }
      </div>
    );
  }
}

export default ProjectSelector;