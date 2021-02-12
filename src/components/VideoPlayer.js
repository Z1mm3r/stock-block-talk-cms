import React from "react"
const VideoPlayer = ({ src, title, ...props }) => (
  <div className="video-container">
    <div className="video">
      <iframe
        className="video-only"
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
)
export default VideoPlayer