import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {linkToThumbnail} from '../utils/YoutubeHelpers'

const VideoSnippet = ({ data: post }) => {
    return (
        <div className="is-parent column is-12" key={post.id}>
              <article
                className={`post-snippet tile is-child box post-snippet-body ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  <p className="post-snippet-meta">
                    <Link
                      className="title has-text-primary is-6"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
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
                </header>
              </article>
            </div>
    )
}

export default VideoSnippet