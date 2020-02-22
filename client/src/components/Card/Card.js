import React, { Component } from 'react';
import './Card.css';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import Highlight from 'react-highlight';
import starEmpty from './star_empty.svg';
import starFilled from './star_filled.svg';

class Card extends Component {
  state = {
    id: 1,
    title: 'cover with tests',
    cards: [],
    isStarred: true,
    highlight: true,
    textarea: `Multiline example
    text value`,
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

  <div className="Project-card" key={this.props.cardId}>

    <h3>{this.props.cardSlug}</h3>
    <p>{this.props.cardText}
    {/*<RIETextArea
value={this.props.cardText}
change={this.virtualServerCallback}
propName="textarea"
className={this.state.highlight ? "editable" : ""}
validate={this.isStringAcceptable}
classLoading="loading"
classInvalid="invalid"
isDisabled={this.state.isDisabled} />*/}
    </p>

    <textarea
      className="Slug"
      value={this.props.slug}
      onChange={this.props.onChangeSlug}
      placeholder="INT/EXT LOCATION"
      cols="20"
      rows="2"
      wrap="hard" />


      <div className="content">
        <textarea
          className="Content"
          value={this.props.content}
          onChange={this.props.onChangeContent}
          placeholder="scene descrip"
          cols="20"
          rows="20"
          wrap="hard"
        />
      </div>

     

    <div className="Project-CardActions">
      <div onClick={this.props.deleteCard}>
        <span alt="delete this">🗑</span>
      </div>

      <div onClick={this.props.toggleStar}>
        <img src={starIcon} className="starEmpty" alt="star" />
      </div>

      <button 
          className="save-btn" 
          onClick={this.props.onClickSend}>
          Save
      </button>


    </div>
  </div>




);

};
}

export default Card;
