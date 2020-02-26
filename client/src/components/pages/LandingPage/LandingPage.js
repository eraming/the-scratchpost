import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './LandingPage.css';
class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <header className="LandingPage-header">
          <p>
            the ScratchPost<br />
            a digital beatsheet organizer for screenwriters
          </p>
          <Link to="/profile/">Projects</Link>
          <Link to="/write/">Add a beat</Link>
        </header>
      </div>
    );
  }
}

export default LandingPage;
