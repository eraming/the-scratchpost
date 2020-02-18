import React, { Component } from 'react';
import './Card.css';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import Highlight from 'react-highlight';
import starEmpty from './star_empty.svg';
import starFilled from './star_filled.svg';

class Card extends Component {


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

  <div className="Project-card" key={card._id}>

    <h3>{card.title}</h3>
    <p>{card.text}

    <RIETextArea
value={card.text}
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

      <div onClick={() => this.toggleStar(card._id)}>
        <img src={starIcon} className="starEmpty" alt="star" />
      </div>


    </div>
  </div>




);

};
}

export default Card;
