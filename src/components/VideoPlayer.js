import React from "react"
const VideoPlayer = ({ src, title, ...props }) => (
  <div className="video">
    <iframe
      src={src}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)
export default VideoPlayer