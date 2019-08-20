import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.handleClick} value={this.props.location} className="location-button" >{this.props.location ? this.props.location : 'All locations'}</button>
    );
  }
}
export default Button;