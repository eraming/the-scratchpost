import React, { Component } from 'react';
import {Button} from 'kc-react-widgets';
import './Card.css';
import starEmpty from './star_empty.svg';
import starFilled from './starFilled.svg';
import trashCan from './trash.svg';
import saveFloppy from './floppy.svg';


class Card extends Component {

render() {

  let starIcon = starEmpty;
    if (this.props.isStarred) {
      starIcon = starFilled;
    }

return (

  <div className="Project-card" key={this.props.cardId}>
    <textarea
      className="Slug"
      value={this.props.cardSlug}
      onChange={this.props.onChangeSlug}
      placeholder="INT/EXT LOCATION"
      cols="20"
      rows="2"
      wrap="hard"
      />

    <div className="content">
        <textarea
          className="Content"
          value={this.props.cardText}
          onChange={this.props.onChangeContent}
          placeholder="scene descrip"
          cols="20"
          rows="20"
          wrap="hard"
        />
    </div>

      <div className="Project-CardActions">
        <div onClick={this.props.deleteCard}>
          <span alt="delete this">
            <img
              src={trashCan}
              className="trashCan"
              alt="trash" />
          </span>
        </div>

        <div onClick={this.props.toggleStar}>
          <img
            src={starIcon}
            className="starEmpty"
            alt="star" />
        </div>
      </div>

        <Button
            size="small"
            depth="shallow"
            shape="rounded"
            iconRight={saveFloppy}
            className="save-btn"
            onClick={this.props.onClickSend}>
            Save
        </Button>


        <button
          className="left-btn"
          onClick={this.props.onLeftMove}>
          ←
        </button>

        <button
          className="right-btn"
          onClick={this.props.onRightMove}>
          →
        </button>


      </div>
  </div>




);

};
}

export default Card;
