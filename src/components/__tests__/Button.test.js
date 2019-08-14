import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

describe("Button",function(){
  let mountedButton;
  beforeEach(()=>{
    mountedButton = shallow(<Button />);
  });

  it('renders without crashing', () => {
    let mountedButton = shallow(<Button />);
  });

  it('renders a button', () => {
    const button = mountedButton.find('button');
    expect(button.length).toBe(1);
    

  });

});

describe('When a value is passed',function(){
  let mountedButton;
  let props;
  beforeEach(()=>{
    props = {
      location: 'Location1'
    }
    mountedButton = shallow(<Button { ...props } />);
  });

  it('displays the location',()=>{
    const locName = mountedButton.find('.location-button');
    expect(locName.text()).toEqual('Location1');
  });
});

describe('When a value is not passwed display all location',function(){
  let mountedButton;
  let props;
  beforeEach(()=>{
    props = {
      location: undefined
    }
    mountedButton = shallow(<Button { ...props } />);
  });

  it('displays the location',()=>{
    const locName = mountedButton.find('.location-button');
    expect(locName.text()).toEqual('All location');
  });
});
