import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchResultsItem from '../../../client/src/components/SearchResultsItem.jsx';

test('<SearchResultsItem />', () => {
  it('renders CardMedia', () => {
    const SearchResultsItem = shallow(<SearchResultsItem />);
    expect(SearchResultsItem.find('CardMedia')).toBe(true);
  });

  it('renders CardContent', () => {
    const SearchResultsItem = shallow(<SearchResultsItem />);
    expect(SearchResultsItem.find('CardContent')).toBe(true);
  });
});