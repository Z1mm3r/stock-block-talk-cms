import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo2-square.png'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import youtube from '../img/social/youtube_social_circle_dark.png'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-text-black">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="StockBlockTalk"
            style={{ height: '10em' }}
          />
        </div>
        <div className="content has-text-centered has-text-black">
          <div className="container has-text-black">
            <div style={{ maxWidth: '100vw' }} className="columns">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="">
                        Latest Stories
                      </Link>
                    </li>
                    
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                        <Link className="navbar-item" to="/videos">
                          Videos
                        </Link>
                    </li>
                    <li>
                        <Link className="navbar-item" to="/articles">
                          Articles
                        </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <a title="youtube" href="https://www.youtube.com/channel/UC6hr5myHfAE4-imtrCQCE2w">
                  <img
                    src={youtube}
                    alt="Youtube"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
