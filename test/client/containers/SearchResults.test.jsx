import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchResults from '../../../client/src/containers/SearchResults.jsx';

test('<SearchResults />', () => {
  it('renders SearchResultsItems', () => {
    const SearchResults = shallow(<SearchResults />);
    expect(SearchResults.find('SearchResultsItem')).toBe(true);
  });
});