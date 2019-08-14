import React from 'react';
import { shallow } from 'enzyme';
import Map from '../Map';

describe("Map",function(){

  let mountedMap;

  beforeEach(()=>{
    mountedMap = shallow(<Map />);
  });

  it('renders without crashing', () => {
    shallow(<Map />);
  });

  it('contains map image',()=>{
    const image = mountedMap.find('img');
    expect(image.length).toBe(1);
  });


  it('Displays none map when no param is given',function(){
    // const defaultMap = mountedMap.find('img [src="images/none.png"]');
    const noneImage = "images/none.png";
    expect(mountedMap.find("img").prop("src")).toEqual(noneImage);

    // expect(defaultMap.length).toBe(1);
  })


});
