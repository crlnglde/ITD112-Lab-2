import React, { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore"; 
import Plot from "react-plotly.js";
import "../css/violin.css"

const ChartComponent = () => {
  const [iqData, setIqData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "natData")); // Use the collection function
      const data = querySnapshot.docs.map(doc => doc.data());

      // Process data to categorize NAT results by IQ levels (case insensitive)
      const iqCategories = {
        low: [],
        average: [],
        high: []
      };

      data.forEach(item => {
        const { iq, nat_results } = item;
        const iqKey = iq ? iq.toLowerCase() : null;

        // Map the IQ level to categories
        if (iqKey && nat_results) {
          if (iqKey === "low") {
            iqCategories.low.push(nat_results);
          } else if (iqKey === "average") {
            iqCategories.average.push(nat_results);
          } else if (iqKey === "high") {
            iqCategories.high.push(nat_results);
          }
        }
      });

      setIqData(iqCategories);
    };

    fetchData();
  }, []);

  // Prepare data for the box plot and violin plot
  const iqLevels = Object.keys(iqData);
  const colors = [
    'rgba(0, 123, 255, 0.7)', // Light Blue for Low
    'rgba(255, 165, 0, 0.7)', // Orange for Average
    'rgba(255, 0, 0, 0.7)',   // Red for High
  ];

  const violinPlotData = iqLevels.map((iqLevel, index) => ({
    type: "violin",
    y: iqData[iqLevel],
    name: iqLevel.charAt(0).toUpperCase() + iqLevel.slice(1), // Capitalize first letter
    points: "all",  // show all points
    jitter: 0.3,
    pointpos: 0,
    scalemode: "width",
    marker: { color: colors[index] }, // Assign specific colors
  }));

  return (

    <div className="violinchart-container">
        
          <Plot
            data={violinPlotData}
            layout={{
              title: "NAT Results by IQ Levels (Violin Plot)",
              yaxis: { title: "NAT Results" },
              xaxis: { title: "IQ Level" },
              violingap: 0.3,
              violinmode: "group",
            }}

            
          />
        
    </div>
  );
};

export default ChartComponent;
