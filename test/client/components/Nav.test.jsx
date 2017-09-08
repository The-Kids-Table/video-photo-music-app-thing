import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Nav from '../../../client/src/components/Nav.jsx';

test('<Nav />', () => {
  it('renders AppBar', () => {
    const Nav = shallow(<Nav />);
    expect(Nav.find('AppBar')).toBe(true);
  });

  it('renders Drawer', () => {
    const Nav = shallow(<Nav />);
    expect(Nav.find('Drawer')).toBe(true);
  });
});