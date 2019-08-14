import React, { Component } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Map from '../components/Map';

class StoreLocator extends Component {
  render() {
    return (

      <div>
        <Header />
        <div>
          <Button location='portland' />
          <Button location='Astoria' />
          <Button />
        </div>
        <Map />
      </div>
    );
  }
}
export default StoreLocator;
