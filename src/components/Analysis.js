// import React from "react";
// import { useLocation } from "react-router-dom";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

// const AnalysisPage = () => {
//   const location = useLocation();
//   const { forecastData, year } = location.state || {}; // Retrieve data passed via state

//   if (!forecastData) {
//     return <p>No data available. Please go back and fetch the forecast.</p>;
//   }

//   // Format the data for recharts
//   const formattedLevels = Object.entries(forecastData.monthly_level).map(
//     ([month, level]) => ({ month, level })
//   );
//   const formattedStorage = Object.entries(forecastData.monthly_storage).map(
//     ([month, storage]) => ({ month, storage })
//   );

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>Analysis for {year}</h1>
      
//       <h2>Monthly Reservoir Levels</h2>
//       <LineChart
//         width={800}
//         height={400}
//         data={formattedLevels}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="level" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>

//       <h2>Monthly Reservoir Storage</h2>
//       <BarChart
//         width={800}
//         height={400}
//         data={formattedStorage}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="storage" fill="#82ca9d" />
//       </BarChart>
//     </div>
//   );
// };

// export default AnalysisPage;



import React from "react";
import { useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Analysis.css"; // Assuming you'll put the CSS in this file

const AnalysisPage = () => {
  const location = useLocation();
  const { forecastData, year } = location.state || {}; // Retrieve data passed via state

  if (!forecastData) {
    return <p>No data available. Please go back and fetch the forecast.</p>;
  }

  // Format the data for recharts
  const formattedLevels = Object.entries(forecastData.monthly_level).map(
    ([month, level]) => ({ month, level })
  );
  const formattedStorage = Object.entries(forecastData.monthly_storage).map(
    ([month, storage]) => ({ month, storage })
  );

  return (
    <div className="analysis-page">
      <h1>Analysis for {year}</h1>

      <div className="chart-container">
        <h2>Monthly Reservoir Levels</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={formattedLevels}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="level" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>Monthly Reservoir Storage</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={formattedStorage}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="storage" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalysisPage;
