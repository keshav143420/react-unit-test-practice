import React, { Component } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Map from '../components/Map';
import mapChooser from '../mapChooser';
import Calculator from '../calculator/Calculator'; // Import the Calculator

class StoreLocator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMap: 'none.png',
      shops: []
    };
    this.chooseMap = this.chooseMap.bind(this);
  }

  componentDidMount() {
    this.setState({
      shops: [
        {
          "location": "Portland",
          "address": "123 Portland Dr."
        },
        {
          "location": "Astoria",
          "address": "123 Astoria Dr."
        },
        {
          "location": "Corvalis",
          "address": "123 Corvalis Dr."
        },
        {
          "location": "",
          "address": ""
        }
      ]
    })
  }

  chooseMap(e) {
    this.setState({ currentMap: mapChooser(e.target.value) });
  }

  render() {

    let storeButtons = this.state.shops.map((shop, id) => {
      return (<Button handleClick={this.chooseMap} key={id} location={shop.location} />)
    });

    return (<div>
      <Header />
      <div>
        {storeButtons}
      </div>
      <Map imagename={this.state.currentMap} location={this.props.location} />
      <hr /> {/* Optional: Add a separator */}
      <h2>Basic Calculator</h2>
      <Calculator /> {/* Render the Calculator */}
    </div>
    );
  }
}

export default StoreLocator;