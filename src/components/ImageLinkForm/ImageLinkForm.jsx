/* eslint-disable no-undef */
import { useState } from "react";
import './ImageLinkForm.css';
import PropTypes from 'prop-types';
import detectImage from './../../AI_API/clarifiAPI.js';
import DetectionResults from './../DetectionResults/DetectionResults.jsx';
import ImageDetection from './../ImageDetection/ImageDetection.jsx';



const VITE_KEY = import.meta.env.VITE_CLARIFAI_API_KEY;


const ImageLinkForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [concepts, setConcepts] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await detectImage(inputValue, VITE_KEY);
      console.log(result);
      setConcepts(result);
      // Handle the result here or update the component's state with the result
    } catch (error) {
      console.log("Error detecting image:", error);
    }
  };


  return (
    <>
    <div className="tc">
      <h2>{`Welcome to Ken's Code object detection app.`}</h2>
      <div className="pa5 form-bg w-90 w-75-m w-50-l center mb4">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="f4 mr2 pa2 mb3 w-70-l"
            placeholder="Enter an image URL"
            value={inputValue}

            onChange={(e) => setInputValue(e.target.value)}


          />
          <button className="w-100 w-auto-l grow f4 link ph3 pv2 mv3 shadow-2 dv2 dib white bg-light-gray tc blue">Detect</button>
        </form>

      </div>
    </div>
    {concepts.length > 0 && <DetectionResults concepts={concepts} />}
    {inputValue && <ImageDetection imgUrl={inputValue} />}
    </>
  );
};

ImageLinkForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,

};

export default ImageLinkForm;
