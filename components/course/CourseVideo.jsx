import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import VideoPlayer from 'react-video-js-player';
import dynamic from 'next/dynamic'
const VideoPlayer = dynamic(() => import('react-youtube'), { ssr: false })
// const VideoPlayer = dynamic(() => import('react-video-js-player'), { ssr: false })

class CourseVideo extends Component {
  player = {}
  state = {
    video: {
      src: 'https://www.youtube.com/watch?v=5CnnXeQs99s',
      poster: '/static/images/course/course-video.png'
    }
  }

  componentDidMount () {

  }

  // onPlayerReady (player) {
  //   this.player = player
  // }

  // onVideoPlay (duration) {
  //   this.duration = duration
  // }

  // onVideoPause (duration) {
  //   this.duration = duration
  // }

  // onVideoTimeUpdate (duration) {
  //   this.duration = duration
  // }

  // onVideoSeeking (duration) {
  //   this.duration = duration
  // }

  // onVideoSeeked (from, to) {
  //   this.from = from
  //   this.to = to
  // }

  // onVideoEnd () {

  // }

  render () {
    const { videoId } = this.props
    return (
      <div className="mt-6">
        <VideoPlayer
          videoId={videoId}
          opts={{
            width: '100%',
            playerVars: {
              autoplay: 0
            }
          }}
          // controls={true}
          // src={this.state.video.src}
          // poster={video.poster || this.state.video.poster}
          // width="550"
          // height={height || '400px'}
          // onReady={this.onPlayerReady.bind(this)}
          // onPlay={this.onVideoPlay.bind(this)}
          // onPause={this.onVideoPause.bind(this)}
          // onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
          // onSeeking={this.onVideoSeeking.bind(this)}
          // onSeeked={this.onVideoSeeked.bind(this)}
          // onEnd={this.onVideoEnd.bind(this)}
        />
      </div>
    )
  }
}

CourseVideo.propTypes = {
  height: PropTypes.string.isRequired,
  video: PropTypes.object.isRequired
}

export default CourseVideo
