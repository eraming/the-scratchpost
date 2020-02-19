import React, { Component } from 'react';
import './Project.css';
import Card from '../../Card/Card.js'
import {Button} from 'kc-react-widgets';


class Project extends Component {
  state = {
    cards: [],
    isStarred: true,
    highlight: true,
    textarea: `Multiline example
    text value`,
    slug: '',
    content: '',
    newCards: [],
    availableCards: [],
  }

  componentDidMount() {
    this.fetchCards();
  }

  fetchCards() {
    console.log('(log) Fetching data from API');
    fetch('/api/mongodb/projects/')
      .then(response => response.json())
      .then(data => {
        console.log('(log) Got data back', data);
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


  toggleStar = (documentId) => {
    console.log('Sending PUT for', documentId);
    // Do the DELETE, using "?_id=" to specify which document we are deleting
    fetch('/api/mongodb/projects/?_id=' + documentId, {
        method: 'PUT',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);
        const cardToStar = this.state.card._id;
        cardToStar.isStarred = !cardToStar.isStarred;

        this.setState({
          isStarred: cardToStar.isStarred,
         })
      });
  };


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

onChangeSlug = (ev) => {
  let value = ev.target.value;
  console.log('getting a new title', value);
  this.setState({
    slug: value,
  });
}

onChangeContent = (ev) => {
  let value = ev.target.value;
  console.log('getting a new value!', value);
  this.setState({
    content: value,
  });
}

onNewCard = (title, index) => {
  const newCards = this.state.newCards.slice();
  const availableCards = this.state.availableCards.slice();
  const newCard = availableCards[index];

  newCards.push(newCard);
  availableCards.splice(index, 1)

  // console.log('new card', index, title)
  console.log('new card', newCards)
  this.setState({
    newCards: newCards,
    availableCards: availableCards,
  });
};

removeCard = (title, index) => {
  const newCards = this.state.newCards.slice();
  const availableCards = this.state.availableCards.slice();
  const newCard = newCards[index];

  availableCards.push(newCard);
  newCards.splice(index, 1);

  console.log('new card', newCards)
  this.setState({
    availableCards: availableCards,
    newCards: newCards
  });
};




  render() {

    return (

      <div className="Project">

        <h1>east bay scenes project</h1>

        <Button onClick={this.onNewCard}>
              new card
        </Button>


        <div className="Project-board">

        {
          this.state.cards.map((card, index) => (
            <Card
            cardId={card._id}
            cardSlug={card.title}
            cardText={card.text}
            deleteCard={() => this.deleteCard(card._id)}
            toggleStar={() => this.toggleStar(card._id)}

            onChangeContent={this.onChangeContent}
            onChangeSlug={this.onChangeSlug}
            value={this.state.slug}
            content={this.state.content}
            isStarred={this.state.isStarred}
            />

          ))
        }



        </div>
      </div>
    );
  }
}

export default Project;
