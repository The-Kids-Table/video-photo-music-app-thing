import React, { Component } from 'react';
import PasswordChanger from '../components/settings_components/PasswordChanger.jsx';
import ThemeChanger from '../components/settings_components/ThemeChanger.jsx';

const styles = {
  wrapper: {
    maxWidth: '800px',
    margin: 'auto'
  },
  button: {
    margin: 10
  },
  section: {
    marginBottom: 15
  }
};

class Settings extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <h2>Settings</h2>
        <div style={styles.section}>
          <PasswordChanger />
        </div>
        <div style={styles.section}>
          <ThemeChanger />
        </div>
      </div>
    );
  }
}

export default Settings;