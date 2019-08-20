import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.handleClick} className="location-button" >{this.props.location ? this.props.location : 'All locations'}</button>
    );
  }
}
export default Button;