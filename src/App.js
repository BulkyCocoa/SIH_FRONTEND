// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Map from "./components/Map";
// import Home from "./components/Home";
// import TimeSimulation from "./components/TimeSimulation";


// const App = () => {
//   return ( 
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/map" element={<Map />} />
//         <Route path="/TimeSimulation" element={<TimeSimulation />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Map from "./components/Map";
import Home from "./components/Home";
import TimeSimulation from "./components/TimeSimulation";
import Analysis from "./components/Analysis";

const App = () => {
  const location = useLocation(); // Get the current location

  // Define paths where the Navbar should not be visible
  const hideNavbarPaths = ["/TimeSimulation"];

  // Check if the current path matches one where the Navbar should be hidden
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/map" element={<Map />} />
        <Route path="/TimeSimulation" element={<TimeSimulation />} />
        <Route path="/Analysis" element={<Analysis />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
