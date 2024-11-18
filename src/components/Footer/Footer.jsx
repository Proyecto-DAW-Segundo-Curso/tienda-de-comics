import React from 'react'
import './Footer.css'
import { PiFacebookLogoLight, PiInstagramLogoLight, PiTwitchLogoLight, PiXLogoLight, PiYoutubeLogoLight } from "react-icons/pi";


function Footer() {
  return (
    <div className='footer'>
      <div className="social-icon">
        <PiYoutubeLogoLight />
      </div>
      <div className="social-icon">
        <PiTwitchLogoLight />
      </div>
      <div className="social-icon">
        <PiXLogoLight />
      </div>
      <div className="social-icon">
        <PiFacebookLogoLight />
      </div>
      <div className="social-icon">
        <PiInstagramLogoLight />
      </div>


    </div>
  )
}

export default Footer