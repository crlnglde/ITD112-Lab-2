import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { db } from "../firebase"; // Ensure correct import
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import '../css/pie.css'; 

const GenderCompositionChart = () => {
  const [genderData, setGenderData] = useState({ male: 0, female: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "natData")); // Ensure you're using the correct collection name
        const rawData = querySnapshot.docs.map(doc => doc.data());

        // Count gender distribution
        const genderCount = { male: 0, female: 0 };

        rawData.forEach((item) => {
          const gender = item.sex?.toLowerCase(); // Changed to use 'sex' instead of 'gender'
          if (gender === "male") {
            genderCount.male += 1;
          } else if (gender === "female") {
            genderCount.female += 1;
          }
        });

        setGenderData(genderCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="piechart-container">
        <Plot
        data={[
            {
            values: [genderData.male, genderData.female],
            labels: ['Male', 'Female'],
            type: 'pie',
            textinfo: 'label+percent',
            hoverinfo: 'label+percent',
            marker: {
                colors: ['#1c2f69', '#9a1216'], // Colors for Male and Female
            },
            },
        ]}
        layout={{
            title: "Gender Composition of Respondents",
            showlegend: true,
        }}
        
        />
    </div>
  );
};

export default GenderCompositionChart;
