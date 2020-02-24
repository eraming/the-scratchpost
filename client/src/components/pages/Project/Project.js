import React, { Component } from 'react';
import './Project.css';
import Card from '../../Card/Card.js'
import {Button} from 'kc-react-widgets';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const arrayMove = require('array-move');

//CHANGE EVERYTHING TO CARDINDEX

class Project extends Component {
  state = {
    projects: [],
    currentProjectId: null
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {

    console.log('(log) Fetching data from API');
    fetch('/api/mongodb/projects2/')
      .then(response => response.json())
      .then(data => {
        console.log('(log) Projects:', data);
        this.setState({
          projects: data
        });
        console.log('cards:', this.state.projects[0].cards)
      });
  }

  deleteCard(projectId) {
    console.log('Sending DELETE for', projectId);
    // Do the DELETE, using "?_id=" to specify which document we are deleting
    fetch('/api/mongodb/projects2/?_id=' + projectId, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);
        // Call method to refresh data
        this.fetchProjects();
      });
  }

// use arrayMove
  moveCardLeft(cardIndex) {
    const cards = this.state.projects[0].cards;
    const fromIndex = cardIndex;
    const toIndex = Number(fromIndex) - 1;
    const newCards = arrayMove(cards, fromIndex, toIndex);
    
    fetch('/api/mongodb/projects2/?_id=' + this.state.projects[0]._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify({cards: newCards})

      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        this.setState({
          projects: data
         })
      });

  }

  moveCardRight(cardIndex) {
    const cards = this.state.projects[0].cards;
    const fromIndex = cardIndex;
    const toIndex = Number(fromIndex) + 1;
    const newCards = arrayMove(cards, fromIndex, toIndex);
    
    fetch('/api/mongodb/projects2/?_id=' + this.state.projects[0]._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify({cards: newCards})

      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        this.setState({
          projects: data
         })
      });
  }

  toggleStar = (card) => {
    console.log('Sending PUT for', this.state.projects[0]._id);
      card.isStarred = !card.isStarred

    fetch('/api/mongodb/projects2/?_id=' + this.state.projects[0]._id, {
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
          projects: data
        });
      });
  };


  isStringAcceptable = (string) => {
  return (string.length >= 1);  // Minimum 4 letters long
  };


onChangeSlug = (ev, cardIndex) => {
  let value = ev.target.value;
  console.log('getting a new title', value);
  const cardsCopy = this.state.cards.slice();
  cardsCopy[cardIndex].slug = value;
  this.setState({
    cards: cardsCopy,
  });
}

onChangeContent = (ev, cardIndex) => {
  let value = ev.target.value;
  console.log('getting a new value!', value);
  const cardsCopy = this.state.cards.slice();
  cardsCopy[cardIndex].content = value;
  this.setState({
    cards: cardsCopy,
  });
}


sendContent = (cardIndex) => {
  const cardData = this.state.projects[0].cards[cardIndex];
  const formData = {
    slug: cardData.slug,
    content: cardData.content,
    isStarred: cardData.isStarred,
  };


  const projectId = this.state.projects[0]._id;
  fetch('/api/mongodb/projects2/?_id=' + projectId, {
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


onNewCard = (card ) => {
  const projectId = this.state.projects[0]._id;
  const formData = {
    slug: '',
    content: '',
    isStarred: false
  };

  fetch('/api/mongodb/projects2/?_id=' + projectId, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Got this back', data);
    console.log()
    this.setState ({
      newCards: this.state.cards
    });
    this.fetchProjects();
  });
};

// removeCard = (title, index) => {
//   const newCards = this.state.newCards.slice();
//   const availableCards = this.state.availableCards.slice();
//   const newCard = newCards[index];

//   availableCards.push(newCard);
//   newCards.splice(index, 1);

//   console.log('new card', newCards)
//   this.setState({
//     availableCards: availableCards,
//     newCards: newCards
//   });
// };


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


        {this.state.projects.map((project) => (
          project.cards.map((card, index) => (
          
              <Card
                cardId={index}
                cardSlug={card.slug}
                cardText={card.content}
                deleteCard={() => this.deleteCard(card)}
                toggleStar={() => this.toggleStar(card)}
                isStarred={card.isStarred}
                
                className="card--show card"
                slugValue={this.state.slug}
                contentValue={this.state.content}
                
                onChangeSlug={(ev) => this.onChangeSlug(ev, index)}
                onClickSend={() => this.sendContent(index)}
                onChangeContent={(ev) => this.onChangeContent(ev, index)}>                  
              </Card>
              ))
          ))

          
            }
        </div>
      </div>
    );
  }
}

export default Project;
