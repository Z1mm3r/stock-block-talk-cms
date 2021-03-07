import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {linkToThumbnail} from '../utils/YoutubeHelpers'

const VideoSnippet = ({ 
  data: post,
  noRaise = false 
}) => {
    return (
        <div className="is-parent tile column is-12" key={post.id}>
              <article
                className={`post-snippet tile is-child ${noRaise ? '' : 'box'} 
                  post-snippet-body ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                  }`}
              >
                <header className="video-snippet-header">
                  <div className={"columns is-multiline snippet-wrapper-one"}>
                    <div className="column is-12 video-snippet-text-container">
                      <div className="video-snippet-text-wrapper">
                      <p className="post-snippet-meta">
                      <Link
                        className="title has-text-primary is-6 video-snippet-header"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link>
                    </p>
                      </div>

                    
                    </div>
                  <div className="column is-12 snippet-wrapper-two">
                    <div>
                      <div>
                      <p className="post-snippet-meta">
                      
                      {post.frontmatter.video_src ? (
                          <Link to={post.fields.slug}>
                              <div className="post-snippet-thumbnail">
                                  <PreviewCompatibleImage
                                      imageInfo={{
                                          image: linkToThumbnail(post.frontmatter.video_src),
                                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                      }}
                                  />
                              </div>
                          </Link>
                    ) : null}
                      <span></span>
                    </p>
                      </div>

                    </div>
                    
                  </div>
                  </div>
                </header>
              </article>
            </div>
    )
}

export default VideoSnippet