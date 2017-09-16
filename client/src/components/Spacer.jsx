import React from 'react';
import PropTypes from 'prop-types';

import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';


const Spacer = ({ hidden }) => (
  <Hidden only={hidden}>
    <Grid item sm lg/>
  </Hidden>
);

Spacer.propTypes = {
  hidden: PropTypes.array
};

Spacer.defaultProps = {
  hidden: undefined,
};

export default Spacer;