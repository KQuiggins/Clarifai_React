import Tilt from 'react-parallax-tilt'
import './Logo.css';






const Logo = () => {
  return (

    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
          <div className="tiltComponent">
            <img src="/images/tilt_component.png" alt="Ken's Code Logo" />
          </div>

        </Tilt>
  )
}

export default Logo