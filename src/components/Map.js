import React, { Component } from 'react';
import './Map.css';
class Map extends Component {
  render(){
    return(
      <div className="MapBox">
        <img src="images/none.png" alt="No Store selected" />
      </div>
    );
  }
}
export default Map;