import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { db } from "../firebase"; // Ensure correct import
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import '../css/stackedbar.css'; // Optional: include CSS for styling

const AcademicDescriptionChart = () => {
  const [chartData, setChartData] = useState({
    public: { 
      "Did not meet expectation": 0, 
      "Fairly Satisfactory": 0, 
      "Satisfactory": 0, 
      "Outstanding": 0 
    },
    private: { 
      "Did not meet expectation": 0, 
      "Fairly Satisfactory": 0, 
      "Satisfactory": 0, 
      "Outstanding": 0 
    },
    categories: [
      "Did not meet expectation", 
      "Fairly Satisfactory", 
      "Satisfactory", 
      "Outstanding"
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "natData")); // Updated query
        const rawData = querySnapshot.docs.map(doc => doc.data());

        console.log("Raw Data:", rawData); // Check raw data retrieved

        const groupedData = {
          public: { 
            "Did not meet expectation": 0, 
            "Fairly Satisfactory": 0, 
            "Satisfactory": 0, 
            "Outstanding": 0 
          },
          private: { 
            "Did not meet expectation": 0, 
            "Fairly Satisfactory": 0, 
            "Satisfactory": 0, 
            "Outstanding": 0 
          },
        };

        rawData.forEach((item) => {
          const { type_school, academic_description } = item;
          const schoolType = type_school?.toLowerCase();

          if (groupedData[schoolType]) {
            if (groupedData[schoolType][academic_description] !== undefined) {
              groupedData[schoolType][academic_description] += 1;
            }
          }
        });

        console.log("Grouped Data:", groupedData);

        setChartData({
          public: groupedData.public,
          private: groupedData.private,
          categories: [
            "Did not meet expectation", 
            "Fairly Satisfactory", 
            "Satisfactory", 
            "Outstanding"
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getValues = (schoolType) =>
    chartData.categories.map((category) => chartData[schoolType][category]);

  // Calculate the maximum value for each category across both school types
  const maxValues = chartData.categories.map((category) => 
    Math.max(chartData.public[category], chartData.private[category])
  );

  // Find the highest maximum value across all categories
  const maxValue = Math.max(...maxValues);

  // Function to determine the next interval above the maximum value
  const getNextYMax = (max, interval) => {
    return Math.ceil(max / interval) * interval; // Round up to the next interval
  };

  // Define the interval
  const interval = 20;
  const nextYMax = getNextYMax(maxValue, interval); // Calculate the next y-axis max

  return (
    <div className="sbchart-container">
      <Plot
        data={[
          {
            x: chartData.categories,
            y: getValues("public"),
            name: "Public",
            type: "bar",
            marker: { color: '#1c2f69' }, // Blue color for public school
            text: getValues("public").map(String),
            textposition: "auto",
            hoverinfo: "y",
          },
          {
            x: chartData.categories,
            y: getValues("private"),
            name: "Private",
            type: "bar",
            marker: { color:'#9a1216' }, // Red color for private school
            text: getValues("private").map(String),
            textposition: "auto",
            hoverinfo: "y",
          },
        ]}
        layout={{
          barmode: "stack",
          title: "Academic Description by School Type",
          xaxis: { title: "Academic Description" },
          yaxis: { 
            title: "Number of Students",
            range: [0, nextYMax], // Use nextYMax for y-axis range
          },
        }}
        
      />
    </div>
  );
};

export default AcademicDescriptionChart;
