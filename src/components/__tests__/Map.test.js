import React from 'react';
import { shallow } from 'enzyme';
import Map from '../Map';

describe("Map", function () {

  let mountedMap;
  let props;

  beforeEach(() => {
    props = {
      location:undefined,
      imagename: 'testmap.png'
    }
    mountedMap = shallow(<Map {...props}/>);
  });

  it('renders without crashing', () => {
    shallow(<Map />);
  });

  it('contains map image', () => {
    const image = mountedMap.find('img');
    expect(image.length).toBe(1);
  });


  it('Displays none map when no param is given', function () {
    // const defaultMap = mountedMap.find('img [src="images/none.png"]');
    let defaultMap = shallow(<Map />);

    const noneImage = "images/none.png";
    expect(defaultMap.find("img").prop("src")).toEqual(noneImage);

    // expect(defaultMap.length).toBe(1);
  })

  it('display the map imagename passed to it',()=>{
    const defaultMap = mountedMap.find('img');
    const noneImage = "images/testmap.png";
    expect(defaultMap.prop("src")).toEqual(noneImage);
  });


});
