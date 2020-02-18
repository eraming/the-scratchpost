import React, { Component } from 'react';
import './Project.css';
import Card from '../../Card/Card.js'



class Project extends Component {
  state = {
    cards: [],
    isStarred: true,
    highlight: true,
    textarea: `Multiline example
    text value`,
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



    return (

      <div className="Project">
        <h1>east bay scenes project</h1>
        <div className="Project-board">
        {
          this.state.cards.map((card, index) => (
            <Card
            cardId={card._id}
            cardSlug={card.title}
            cardText={card.text}
            deleteCard={() => this.deleteCard(card._id)}
            toggleStar={() => this.toggleStar(card._id)}
            />

          ))
        }



        </div>
      </div>
    );
  }
}

export default Project;
