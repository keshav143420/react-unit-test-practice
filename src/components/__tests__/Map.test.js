import React from 'react';
import { shallow } from 'enzyme';
import Map from '../Map';

describe("Map",function(){

  let mountedMap;

  beforeEach(()=>{
    mountedMap = shallow(<Map />);
  });

  it('renders without crashing', () => {
    let mountedMap = shallow(<Map />);
  });

  it('contains map image',()=>{
    const image = mountedMap.find('img');
    expect(image.length).toBe(1);
  });


});
