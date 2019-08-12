import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import VideoPlayer from 'react-video-js-player';
import dynamic from 'next/dynamic';
const VideoPlayer = dynamic(() => import('react-video-js-player'), { ssr: false });

class CourseVideo extends Component {
  constructor(props) {
    super(props);

  }

  player = {}
  state = {
      video: {
          src: "http://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
          poster: "/static/images/course/course-video.png"
      }
  }

  // componentWillMount() {

  // }

  componentDidMount() {

  }

  onPlayerReady(player){
    console.log("Player is ready: ", player);
    this.player = player;
  }

  onVideoPlay(duration){
    console.log("Video played at: ", duration);
  }

  onVideoPause(duration){
    console.log("Video paused at: ", duration);
  }

  onVideoTimeUpdate(duration){
    console.log("Time updated: ", duration);
  }

  onVideoSeeking(duration){
    console.log("Video seeking: ", duration);
  }

  onVideoSeeked(from, to){
    console.log(`Video seeked from ${from} to ${to}`);
  }

  onVideoEnd(){
    console.log("Video ended");
  }

  // componentWillReceiveProps(nextProps) {

  // }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  // componentWillUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  componentWillUnmount() {

  }

  render() {
    return (
      // <div>
        <VideoPlayer
            controls={true}
            src={this.state.video.src}
            poster={this.props.video.poster || this.state.video.poster}
            width="550"
            height={this.props.height || '400px' }
            onReady={this.onPlayerReady.bind(this)}
            onPlay={this.onVideoPlay.bind(this)}
            onPause={this.onVideoPause.bind(this)}
            onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
            onSeeking={this.onVideoSeeking.bind(this)}
            onSeeked={this.onVideoSeeked.bind(this)}
            onEnd={this.onVideoEnd.bind(this)}
        />
      // </div>
    );
  }
}

CourseVideo.propTypes = {

};

export default CourseVideo;