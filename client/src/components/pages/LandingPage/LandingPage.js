import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Cat from './ceres.png';

import './LandingPage.css';
class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <header className="LandingPage-header">
          <p>
            <strong> the ScratchPost</strong> <br />
            a lo-fi digital beatsheet organizer<br />
            for screenwriters and creatives
          </p>
          <Link to="/projects/">add a project</Link>

          <img src={Cat} height="200px" width="400px"></img>

        </header>


      </div>
    );
  }
}

export default LandingPage;
