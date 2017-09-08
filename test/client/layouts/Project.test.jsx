import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Project from '../../../client/src/layouts/Project.jsx';

test('<Project />', () => {
  it('renders ProjectResults', () => {
    const Project = shallow(<Project />);
    expect(Project.find('Grid')).toBe(true);
  });
});