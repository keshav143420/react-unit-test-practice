import React from 'react';
import { shallow } from 'enzyme';
import StoreLocator from '../StoreLocator';

describe("StoreLocator",function(){
  let mountedStoreLocator;
  beforeEach(()=>{
    mountedStoreLocator = shallow(<StoreLocator />);
  })
  
  it('renders without crashing', () => {
    shallow(<StoreLocator />);
  });

  it('renders a header', () => {
    const headers = mountedStoreLocator.find('Header');
    expect(headers.length).toBe(1);
  });

  it('renders buttons', () => {
    const buttons = mountedStoreLocator.find('Button');
    expect(buttons.length).toBe(3);
  });

  it('renders a map', () => {
    const maps = mountedStoreLocator.find('Map');
    expect(maps.length).toBe(1);
  });

});
