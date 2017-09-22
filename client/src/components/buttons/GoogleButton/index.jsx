import React, { Component } from 'react';
import image from './button.png';
import ImageButton from '../ImageButton.jsx';

const GoogleButton = (props) => <ImageButton onClick={props.onClick} image={image} />;

export default GoogleButton;