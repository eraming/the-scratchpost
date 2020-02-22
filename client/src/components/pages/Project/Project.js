import React, { Component } from 'react';
import './Project.css';
import Card from '../../Card/Card.js'
import {Button} from 'kc-react-widgets';


class Project extends Component {
  state = {
    cards: [],
    isStarred: false,
    highlight: true,
    textarea: `Multiline example
    text value`,
    slug: '',
    content: '',
    newCards: [],
    availableCards: [],
  }

  //added refreshCards invokation
  componentDidMount() {
    this.fetchCards();
    this.refreshCards();
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

  //refresh cards method
  refreshCards = () => {
    fetch('/get-contents/')
      .then(response => response.json())
      .then(data => {
        console.log('receiving message data!', data);
        this.setState({
          content: data,
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


  toggleStar = (card) => {
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
          cards: this.state.cards
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

//added sendContent method for saving
sendContent = (index) => {
  const content = this.state.content;
  const slug = this.state.slug;
  console.log("slug: ", slug, "content: ", content)

  this.setState({ 
    content: content,
    slug: slug
  });
  
  fetch('/send-contents/', {method: "POST", body: content})
    .then(response => response.json())
    .then(data => {
      this.refreshCards();
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
            toggleStar={() => this.toggleStar(card)}
            onChangeContent={this.onChangeContent}
            onChangeSlug={this.onChangeSlug}
            value={this.state.content}
            content={this.state.contents}
            isStarred={card.isStarred}
            onClickSend={this.sendContent}
            />

          ))
        }

        {this.state.newCards.map((index) => (
              <Card
                className="card--show card"
                contents={this.state.contents}
                value={this.state.content}
                onChangeContent={this.onChangeContent}
                onChangeTitle={this.onChangeTitle}
                onClickSend={this.sendContent}
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
