import PropTypes from "prop-types";
import './DetectionResults.css';


const DetectionResults = ({ concepts }) => {
  return (
    <div className="tc detection-results">
      <h3>Detected Concepts:</h3>
      <ul className="detection-results-list">
        {concepts.map((concept) => (
          <li key={concept.id}>
            {concept.name}: {concept.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

DetectionResults.propTypes = {
  concepts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DetectionResults;
