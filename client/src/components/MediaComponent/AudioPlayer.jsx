import React, { Component } from 'react';
import videojs from 'video.js';
import './video.css';

export default class AudioPlayer extends Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
      // this.bigPlayButton.hide();
      this.controlBar.fullscreenToggle.hide();
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <audio ref={ node => this.videoNode = node } className="video-js audio"></audio>
      </div>
    );
  }
}