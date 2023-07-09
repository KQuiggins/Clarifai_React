import "./App.css";
import ImageDetection from "./components/ImageDetection/ImageDetection";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleOptions from "./Particles/particleOptions.js";
import detectImage from "./AI_API/clarifiAPI.js";
import SignIn from "./components/SignIn/SignInForm.jsx";
import Register from "./components/Register/RegisterForm.jsx";

const VITE_KEY = import.meta.env.VITE_CLARIFAI_API_KEY;

function App() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = async (imageUrl) => {
    try {
      setImgUrl(imageUrl);
      console.log("Image URL:", imageUrl);
      await detectImage(imageUrl, VITE_KEY);
    } catch (error) {
      console.log("Error detecting image:", error);
    }
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
      setRoute("signin");
    } else if (route === "home") {
      setIsSignedIn(true);
      setRoute("home");
    } else {
      setRoute(route);
    }
  };


  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    return Promise.resolve();
  }, []);

  return (
    <>
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        {route === "home" ? (
          <>
            <Logo />
            {imgUrl && <ImageDetection imgUrl={imgUrl} />}
            <ImageLinkForm
              inputValue={input}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
            />
          </>
        ) : route === "signin" ? (
          <SignIn onRouteChange={onRouteChange} />
        ) : (
          <Register onRouteChange={onRouteChange} />
        )}
      </div>
    </>
  );
}

export default App;
