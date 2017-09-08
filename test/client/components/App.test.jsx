import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../../../client/src/App.jsx';

test('<App />', () => {
  
  it('renders \'Hello World!\'', () => {
    const App = shallow(<App />);
    expect(App.find('h2').text()).toBe('Hello World!');
  });

  it('renders the correct number of children', () => {
    const App = shallow(<App />);
    expect(App).toHaveLength(5);
  });
  
});
