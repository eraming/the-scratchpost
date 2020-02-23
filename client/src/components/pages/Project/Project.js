import React, { Component } from 'react';
import './Project.css';
import Card from '../../Card/Card.js'
import {Button} from 'kc-react-widgets';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const arrayMove = require('array-move');


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
      <div className="ProjectNavBar">



  <Tabs>
  <TabList>
    <Tab>project 1</Tab>
    <Tab>proj 2</Tab>
  </TabList>

  <TabPanel>
    <h2>east bay scenes project</h2>
  </TabPanel>
  <TabPanel>
    <h2>east bay scenes </h2>
  </TabPanel>
</Tabs>

        <Button onClick={this.onNewCard}>
              new card
        </Button>
      </div>

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
            value={this.state.slug}
            content={this.state.content}
            isStarred={card.isStarred}
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


                   {/* <Star>
                  onClick={() => this.Toggle}
                  stars={this.state.stars}
                  onStarToggle={this.toggleStar}
                  </Star> */}



              </Card>
              ))
            }





        </div>
      </div>
    );
  }
}

export default Project;
