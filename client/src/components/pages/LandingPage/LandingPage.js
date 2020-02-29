import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Floppy from './floppy-disk-2.svg';
import Cat from './Ceres.png';


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
          <Link to="/projects/">go to projects</Link>
          <br />

          <div class="bounce-4">
        <img src={Cat} height="400px" width="666px"></img>
        </div>
        </header>
      </div>
    );
  }
}

export default LandingPage;
