import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
          <Link to="/profile/">add a project</Link>
        </header>
      </div>
    );
  }
}

export default LandingPage;
