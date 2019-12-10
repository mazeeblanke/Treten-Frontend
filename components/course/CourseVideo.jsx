import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import VideoPlayer from 'react-video-js-player';
import dynamic from 'next/dynamic'
const VideoPlayer = dynamic(() => import('react-video-js-player'), { ssr: false })

class CourseVideo extends Component {
  player = {}
  state = {
    video: {
      src: 'http://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      poster: '/static/images/course/course-video.png'
    }
  }

  componentDidMount () {

  }

  onPlayerReady (player) {
    this.player = player
  }

  onVideoPlay (duration) {
    this.duration = duration
  }

  onVideoPause (duration) {
    this.duration = duration
  }

  onVideoTimeUpdate (duration) {
    this.duration = duration
  }

  onVideoSeeking (duration) {
    this.duration = duration
  }

  onVideoSeeked (from, to) {
    this.from = from
    this.to = to
  }

  onVideoEnd () {

  }

  render () {
    const { height, video } = this.props
    return (
      <VideoPlayer
        controls={true}
        src={this.state.video.src}
        poster={video.poster || this.state.video.poster}
        width="550"
        height={height || '400px'}
        onReady={this.onPlayerReady.bind(this)}
        onPlay={this.onVideoPlay.bind(this)}
        onPause={this.onVideoPause.bind(this)}
        onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
        onSeeking={this.onVideoSeeking.bind(this)}
        onSeeked={this.onVideoSeeked.bind(this)}
        onEnd={this.onVideoEnd.bind(this)}
      />
    )
  }
}

CourseVideo.propTypes = {
  height: PropTypes.string.isRequired,
  video: PropTypes.object.isRequired
}

export default CourseVideo
