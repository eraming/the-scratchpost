import React, { Component } from 'react';
import './Project.css';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import Highlight from 'react-highlight';
import _ from 'lodash'
import starEmpty from './star_empty.svg';
import starFilled from './star_filled.svg';

const arrayMove = require('array-move');


class Project extends Component {
  state = {
    cards: [],
    isStarred: true,
    highlight: false,
    textarea: '',
  }

  componentDidMount() {
    this.fetchCards();
  }

  fetchCards() {
    console.log('Fetching data from API');
    fetch('/api/mongodb/projects/')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        this.setState({
          cards: data,
        });
      });
  }

  deleteCard(documentId) {
    console.log('Sending DELETE for', documentId);
    // Do the DELETE, using "?_id=" to specify which document we are deleting
    fetch('/api/mongodb/projects/?_id=' + documentId, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Call method to refresh data
        this.fetchCards();
      });
  }

// use arrayMove
  moveCardLeft(documentId) {
    const cards = this.state.cards;
    const fromIndex = cards.findIndex(card => card._id === documentId);
    const toIndex = Number(fromIndex) - 1;
    const newCards = arrayMove(cards, fromIndex, toIndex);
    this.setState({
      cards: newCards,
    });
  }

  moveCardRight(documentId) {
    const cards = this.state.cards;
    const fromIndex = cards.findIndex(card => card._id === documentId);
    const toIndex = Number(fromIndex) + 1;
    const newCards = arrayMove(cards, fromIndex, toIndex);
    this.setState({
      cards: newCards,
    });
  }


  toggleStar = (indexOfCard) => {
    const cardToStar = this.state.cards[indexOfCard]
    cardToStar.isStarred = !cardToStar.isStarred

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
          this.state.cards.map((card, index) => (
            <div className="Project-card" key={card._id}>

              <h3>{card.title}</h3>
              <p>{card.text}
              
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
                <div onClick={() => this.deleteCard(card._id)}>
                  <span alt="delete this">🗑</span>
                </div>
                  <span alt="move left"><button onClick={() => this.moveCardLeft(card._id)}>&larr;</button></span>
                  <span alt="move right"><button onClick={() => this.moveCardRight(card._id)}>&rarr;</button></span>
                
                <div onClick={() => this.toggleStar(card._id)}>
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
