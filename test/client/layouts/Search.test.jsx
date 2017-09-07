import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Search from '../../../client/src/layouts/Search.jsx';

test('<Search />', () => {
  it('renders SearchResults', () => {
    const Search = shallow(<Search />);
    expect(Search.find('SearchResults')).toBe(true);
  });
});