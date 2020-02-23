import React, { Component } from 'react';
import './Project.css';
import Card from '../../Card/Card.js'
import {Button} from 'kc-react-widgets';

const arrayMove = require('array-move');


class Project extends Component {
  state = {
    cards: [],
    isStarred: false,
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
        this.setState({
          newCards: this.state.cards
         })
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

  toggleStar = (card, documentId) => {
    console.log('Sending PUT for', card._id);
      card.isStarred = !card.isStarred

    fetch('/api/mongodb/projects/?_id=' + card._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify({isStarred: !card.isStarred})

      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        this.setState({
          newCards: this.state.cards
         })
         this.fetchCards();
      });
  };


  // virtualServerCallback = (newState) => {
  //    if (this.state.simulateXHR) {
  //    window.setTimeout(function() {
  //      this.changeState(newState);
  //    }.bind(this), this.state.XHRDelay);
  //    } else {
  //    this.changeState(newState);
  //    }
  //  };

  // isStringAcceptable = (string) => {
  // return (string.length >= 1);  // Minimum 4 letters long
  // };

changeState = (newState) => {
this.setState(newState);
};

onChangeSlug = (ev, index) => {
  let value = ev.target.value;
  console.log('getting a new title', value);
  const cardsCopy = this.state.cards.slice();
  cardsCopy[index].slug = value;
  this.setState({
    cards: cardsCopy,
  });
}

onChangeContent = (ev, index) => {
  let value = ev.target.value;
  console.log('getting a new value!', value);
  const cardsCopy = this.state.cards.slice();
  cardsCopy[index].content = value;
  this.setState({
    cards: cardsCopy,
  });
}

sendContent = (index) => {
  const cardData = this.state.cards[index];
  const formData = {
    slug: cardData.slug,
    content: cardData.content,
    isStarred: cardData.isStarred,
  };

  const documentId = cardData._id;
  fetch('/api/mongodb/projects/?_id=' + documentId, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Got this back', data);
      console.log(formData)
      this.setState ({
        newCards: this.state.cards
      })
      
    });
}


onNewCard = (card, index, formData) => {
  const documentId = card._id;
  fetch('/api/mongodb/projects/?_id=' + documentId, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Got this back', data);
    console.log(formData)
    this.setState ({
      newCards: this.state.cards,
      isStarred: false
    });
    this.fetchCards();
  });
  // const newCards = this.state.newCards.slice();
  // const availableCards = this.state.availableCards.slice();
  // const newCard = availableCards[index];

  // newCards.push(newCard);
  // availableCards.splice(index, 1)

  // console.log('new card', index, title)
  // console.log('new card', newCards)
  // this.setState({
  //   newCards: this.state.cards,
  //   availableCards: availableCards,
  // });
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

      

        {this.state.cards.map((card, index) => (
          
              <Card
                cardId={card._id}
                cardSlug={card.slug}
                cardText={card.content}
                deleteCard={() => this.deleteCard(card._id)}
                toggleStar={() => this.toggleStar(card, index)}
                
                className="card--show card"
                slugValue={this.state.slug}
                contentValue={this.state.content}
                
                onChangeSlug={(ev) => this.onChangeSlug(ev, index)}
                onClickSend={() => this.sendContent(index)}
                onChangeContent={(ev) => this.onChangeContent(ev, index)}
                >

              </Card>
              ))
              
            }
        </div>
      </div>
    );
  }
}

export default Project;
