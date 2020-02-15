import React, { Component } from 'react';
import './Profile.css';


class Profile extends Component {
  state = {
    blogPosts: [],
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

  deleteArticle(documentId) {
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

  voteArticle(article) {
    let newVoteCount = article.voteCount;

    // Increase the vote count
    if (!newVoteCount) {
      newVoteCount = 1;
    } else {
      newVoteCount++;
    }

    const formData = {
      voteCount: newVoteCount,
    };

    // Do the PUT, using "?_id=" to specify which document we are affecting
    const documentId = article._id;
    fetch('/api/mongodb/blogposts/?_id=' + documentId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Call method to refresh data
        this.fetchPosts();
      });
  }

  render() {
    return (
      <div className="Blog">
        <h1>account info stuff</h1>
        {
          this.state.blogPosts.map((post, index) => (
            <div className="Blog-article" key={post._id}>

              <h1>{post.title}</h1>
              <p>{post.text}</p>

              <div className="Blog-articleActions">
                <div onClick={() => this.deleteArticle(post._id)}>
                  <span alt="delete this">🗑</span>
                </div>
                <div onClick={() => this.voteArticle(post)}>
                  <span alt="upvote this">⬆ {post.voteCount}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Profile;
