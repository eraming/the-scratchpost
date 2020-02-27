import React, { Component } from 'react';
import './Project.css';
import Card from '../../Card/Card.js';
// import Tabs from '../../Tabs/Tabs.js';
// import Tab from '../../Tab/Tab.js';
import ProjectSelector from '../../ProjectSelector/ProjectSelector.js';
import {Button} from 'kc-react-widgets';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const arrayMove = require('array-move');


class Project extends Component {
  state = {
    cards: [],
    projectNames: [],
    projects: [
      'parking-lot',
      'random',
      'jokes',
    ],
    selectedProject: 'parking-lot'
    
  }

  componentDidMount() {
    this.fetchCards();
    this.fetchProjects();

  }

  // componentDidMount() {
    
  //   // TODO:
  //   // Do fetch (GET) to get all "actualprojects"
  //   // After fetch, do setState to set the projects list to be
  //   // the ones that came from the database
  // }

  fetchProjects() {
    console.log('Fetching projects: ');
    fetch('/api/mongodb/actualprojects/')
      .then(response => response.json())
      .then(data => {
        console.log('projects back: ', data);
        this.setState({
          projects: data,
        });
      });
  }

  selectProject = (projectName) => {
    this.setState({
      selectedProject: projectName,
    });
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

// use arrayMove
  moveCardRight(documentId) {
    const cards = this.state.cards;
    const fromIndex = cards.findIndex(card => card._id === documentId);
    const toIndex = Number(fromIndex) + 1;
    const newCards = arrayMove(cards, fromIndex, toIndex);
    this.setState({
      cards: newCards,
    });
  }

  //method to toggle stars
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


//update card title
  onChangeSlug = (ev, index) => {
    let value = ev.target.value;
    console.log('getting a new title', value);
    const cardsCopy = this.state.cards.slice();
    cardsCopy[index].slug = value;
    this.setState({
      cards: cardsCopy,
    });
  }

//update card content
  onChangeContent = (ev, index) => {
    let value = ev.target.value;
    console.log('getting a new value!', value);
    const cardsCopy = this.state.cards.slice();
    cardsCopy[index].content = value;
    this.setState({
      cards: cardsCopy,
    });
  }

//save card's title and content
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


//function to generate a new card
  onNewCard = (card ) => {
    const documentId = card._id;
    const formData = {
      slug: '',
      content: '',
      isStarred: false
    };

    fetch('/api/mongodb/projects/?_id=' + documentId, {
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
      this.fetchCards();
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

        {/* <Tabs>
          <Tab linkClassName={'link-class-0'}>
            <p>project 0</p>
        </Tab>
        <Tab linkClassName={'link-class-1'}>
          <CustomComponent propA={'foo'} propB={this.handleSomething}/>
          <p>project 1</p>
        </Tab>
        <Tab linkClassName={'link-class-1'}>
          <CustomComponent propA={'foo'} propB={this.handleSomething}/>
          <p>project 2</p>
        </Tab>
        </Tabs> */}

      {/* <Tabs>
      <TabList>
        {
          this.props.projects.map((projects, index) => (
            this.props.selectedProject === projects.title? (
              <Tab>{projects.title}</Tab>
            ) : (
              <Tab onClick={() => this.props.onSelectProject(projects.title)} key={index} className="ProjectSelector-project"> {projects.title}</Tab>
            )
          ))
        }
      </TabList>
      </Tabs> */}

          <Tabs>

            <TabList>
              <Tab
              >Act I</Tab>
              <Tab>Act II</Tab>
              <Tab>
              </Tab>
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

        <ProjectSelector
          projects={this.state.projects}
          selectedProject={this.state.selectedProject}
          onSelectProject={this.selectProject} />

        <div className="Project-board">
          {this.state.cards.map((card, index) => (
            <Card
              cardId={card._id}
              cardSlug={card.slug}
              cardText={card.content}
              deleteCard={() => this.deleteCard(card._id)}
              toggleStar={() => this.toggleStar(card)}
              isStarred={card.isStarred}
              
              className="card--show card"
              slugValue={this.state.slug}
              contentValue={this.state.content}
              
              onChangeSlug={(ev) => this.onChangeSlug(ev, index)}
              onClickSend={() => this.sendContent(index)}
              onChangeContent={(ev) => this.onChangeContent(ev, index)}
              onLeftMove={() => this.moveCardLeft(card._id)}
              onRightMove={() => this.moveCardRight(card._id)}
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
