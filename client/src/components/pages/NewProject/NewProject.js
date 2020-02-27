import React, { Component } from 'react';
import './NewProject.css';

class NewProject extends Component {
  state = {
    projects: '',
  }

  fetchProjectLength(callback) {
    console.log('Fetching data from API');
    fetch('/api/mongodb/projects/')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        console.log('array length:', data.length);
        callback(data.length);
      });
  }

  onChangeProjectNotes = (ev) => {
    this.setState({
      notes: ev.target.value,
    });
  }

  onChangeProjectName = (ev) => {
    this.setState({
      title: ev.target.value,
    });
  }



  submit = () => {
    this.fetchProjectLength((position) => {
      const formData = {
      title: this.state.title,
      notes: this.state.notes
    };

    fetch('/api/mongodb/actualprojects/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);
        this.setState({
          projects: this.state.projects
        });
        // Redirect to profile
        this.props.history.push('/profile/');
       
      });

    });
  }


  render() {
    return (
      <div className="NewProject">
        <h1>new project:</h1>
        <input
            name="project name"
            placeholder="project name"
            value={this.state.projectName}
            onChange={this.onChangeProjectName}
          />
        <br />

        <textarea
            name="notes"
            placeholder="project notes"
            value={this.state.projectNotes}
            onChange={this.onChangeProjectNotes}
          />

        <br />

        <button onClick={this.submit}>add project</button>

      </div>


    );
  }
}

export default NewProject;
