import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ProjectContributors from '../../../client/src/components/SearchResultsItem.jsx';

test('<ProjectContributors />', () => {
  it('renders project owner header', () => {
    const ProjectContributors = shallow(<ProjectContributors />);
    expect(ProjectContributors.find('CardHeader')).toBe(true);
  });

  it('renders contributor list', () => {
    const ProjectContributors = shallow(<ProjectContributors />);
    expect(ProjectContributors.find('List')).toBe(true);
  });
});