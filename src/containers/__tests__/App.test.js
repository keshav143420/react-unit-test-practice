import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe("App",function(){
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders without crashing for Store locator', () => {
    let mountedApp = shallow(<App />);
    const locators = mountedApp.find('StoreLocator');
    expect(locators.length).toBe(1);
  });

});
