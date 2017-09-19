import { createMuiTheme } from 'material-ui/styles';
import { blue, purple, green, red, blueGrey } from 'material-ui/colors';

let themes = [
  {
    name: 'Light',
    theme: {
      primary: blue,
      error: red
    }
  },
  {
    name: 'Dark',
    theme: {
      type: 'dark',
      primary: blueGrey,
      secondary: green,
      error: red
    }
  },
  {
    name: 'Royal',
    theme: {
      primary: purple,
      error: red
    }
  },
  {
    name: 'Red',
    theme: {
      primary: red,
      error: red
    }
  }
]

module.exports.getList = (themeIndex) => {
  let themeList = [];
  themes.forEach((theme) => {
    themeList.push({name: theme.name});
  });
  return themeList;
};

module.exports.get = (themeIndex) => {
  return createMuiTheme({
    palette: themes[themeIndex].theme
  });
};