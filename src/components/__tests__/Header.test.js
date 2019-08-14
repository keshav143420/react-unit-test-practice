import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';


describe('Header',function(){
  let mountedHeader;
  beforeEach(()=>{
    mountedHeader = shallow(<Header />);
  });

  it('renders without crashing', () => {
    shallow(<Header />);
  });

  it('render a logo',()=>{
    // const logoImg = mountedHeader.find('img [src="images/wired-brain-coffee-logo.png"]');
    const logoImg = mountedHeader.find('img');
    expect(logoImg.length).toBe(1);
  });

});
