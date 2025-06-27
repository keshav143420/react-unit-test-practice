// Polyfill for TextEncoder and TextDecoder
// THIS MUST BE THE VERY FIRST THING IN THIS FILE
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
