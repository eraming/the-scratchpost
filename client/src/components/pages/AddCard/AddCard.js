import React, { Component } from 'react';
import './AddCard.css';

class AddCard extends Component {
  state = {
    title: '',
    text: '',
    isStarred: false,
    position: null
  }

  fetchCardsLength(callback) {
    console.log('Fetching data from API');
    fetch('/api/mongodb/projects/')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        console.log('array length:', data.length);
        callback(data.length);
        // return data.length;
      });
  }

  onChangeContent = (ev) => {
    this.setState({
      text: ev.target.value,
    });
  }

  onChangeTitle = (ev) => {
    this.setState({
      title: ev.target.value,
    });
  }

  submit = () => {
    this.fetchCardsLength((position) => {

    const formData = {
      title: this.state.title,
      text: this.state.text,
      isStarred: this.state.isStarred,
      position: position
    };    


    fetch('/api/mongodb/projects/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Redirect to profile
        this.props.history.push('/profile/');
      });

    });
  }


  render() {
    return (
      <div className="AddCard">
        <h1>add a beat</h1>
        <input
            name="title"
            placeholder="slugline"
            value={this.state.title}
            onChange={this.onChangeTitle}
          />
        <br />

        <textarea
            name="content"
            placeholder="content"
            value={this.state.details}
            onChange={this.onChangeContent}
          />

        <br />

        <button onClick={this.submit}>Add to project</button>
      </div>

    );
  }
}

export default AddCard;
