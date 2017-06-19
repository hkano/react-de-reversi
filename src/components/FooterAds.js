import React, { Component } from 'react'

class FooterAds extends Component {
  componentDidMount () {
    (window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <div className="footer-ads">
        <ins
          className="adsbygoogle"
          data-ad-client="ca-pub-6328331008026390"
          data-ad-slot="9013171511"
        />
      </div>
    )
  }
}

export default FooterAds
