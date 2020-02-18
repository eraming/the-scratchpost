import React, { Component } from 'react';
import './Project.css';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import Highlight from 'react-highlight';
import _ from 'lodash'
import starEmpty from './star_empty.svg';
import starFilled from './star_filled.svg';


class Project extends Component {
  state = {
    blogPosts: [],
    isStarred: true,
    highlight: false,
    textarea: '',
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    console.log('Fetching data from API');
    fetch('/api/mongodb/blogposts/')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        this.setState({
          blogPosts: data,
        });
      });
  }

  deleteCard(documentId) {
    console.log('Sending DELETE for', documentId);
    // Do the DELETE, using "?_id=" to specify which document we are deleting
    fetch('/api/mongodb/blogposts/?_id=' + documentId, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Call method to refresh data
        this.fetchPosts();
      });
  }

  toggleStar = (indexOfpost) => {
    const postToStar = this.state.blogPosts[indexOfpost]
    postToStar.isStarred = !postToStar.isStarred

    this.setState({
      isStarred: '',
     })
  }

  virtualServerCallback = (newState) => {
   if (this.state.simulateXHR) {
   window.setTimeout(function() {
     this.changeState(newState);
   }.bind(this), this.state.XHRDelay);
   } else {
   this.changeState(newState);
   }
 };

isStringAcceptable = (string) => {
return (string.length >= 1);  // Minimum 4 letters long
};

changeState = (newState) => {
this.setState(newState);
};

  render() {

    let starIcon = starEmpty;
      if (this.props.isStarred) {
        starIcon = starFilled;
      }

    return (

      <div className="Project">
        <h1>east bay scenes project</h1>
        <div className="Project-board">
        {
          this.state.blogPosts.map((post, index) => (
            <div className="Project-card" key={post._id}>

              <h3>{post.title}</h3>
              <p>{post.text}
              
              <RIETextArea
         value={this.state.textarea}
         change={this.virtualServerCallback}
         propName="textarea"
         className={this.state.highlight ? "editable" : ""}
         validate={this.isStringAcceptable}
         classLoading="loading"
         classInvalid="invalid"
         isDisabled={this.state.isDisabled} />

              </p>

              <div className="Project-CardActions">
                <div onClick={() => this.deleteCard(post._id)}>
                  <span alt="delete this">🗑</span>
                </div>

                <div onClick={() => this.toggleStar(post._id)}>
                  <img src={starIcon} className="starEmpty" alt="star" />
                </div>


              </div>
            </div>
          ))
        }
        </div>
      </div>
    );
  }
}

export default Project;
