import './Navigation.styles.css';
import PropTypes from 'prop-types';


const Navigation = ({ onRouteChange }) => {
  return (
    <nav>
        <p
          onClick={() => onRouteChange('signin')}
          className='f3 link dim underline pa3 pointer'
        >
          Sign Out
        </p>
    </nav>
  )
};

Navigation.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
};

export default Navigation