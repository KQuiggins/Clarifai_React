import PropTypes from 'prop-types';

const ImageDetection = ({ imgUrl }) => {
  console.log(imgUrl);
  return (
    <div className="tc mt4">
      {imgUrl && <img src={imgUrl} />}
    </div>
  );
};

export default ImageDetection;

ImageDetection.propTypes = {
  imgUrl: PropTypes.string.isRequired
};

