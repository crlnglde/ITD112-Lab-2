import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { db } from "../firebase"; // Ensure correct import
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import '../css/bar.css'; // Optional: include CSS for styling

const SocioEconomicStatusChart = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    averages: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "natData")); // Updated query
        const rawData = querySnapshot.docs.map(doc => doc.data());

        const groupedData = {};

        // Group NAT results by socio-economic status
        rawData.forEach(item => {
          const { socio_economic_status, nat_results } = item;

          if (socio_economic_status && nat_results) {
            const status = socio_economic_status.toLowerCase();

            if (!groupedData[status]) {
              groupedData[status] = {
                total: 0,
                count: 0
              };
            }

            groupedData[status].total += nat_results; // Accumulate NAT results
            groupedData[status].count += 1; // Increment count for average calculation
          }
        });

        // Define the order of categories
        const orderedCategories = [
          "below poverty line",
          "on poverty line",
          "above poverty line"
        ];

        // Calculate averages in the specified order
        const categories = orderedCategories.filter(cat => groupedData[cat]);
        const averages = categories.map(category => {
          const { total, count } = groupedData[category];
          return (total / count).toFixed(2); // Average NAT results
        });

        setChartData({
          categories,
          averages
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define shades of blue for each category
  const colors = ['#a3c1e0', '#007bff', '#004085']; // Lighter to darker shades of blue

  return (
    <div className="barchart-container">
      <Plot
        data={[{
          x: chartData.categories,
          y: chartData.averages,
          type: 'bar',
          marker: { 
            color: chartData.categories.map((_, index) => colors[index] || '#007bff') // Use shades of blue
          },
        }]}
        layout={{
          title: "Average NAT Results by Socio-Economic Status",
          xaxis: { title: "Socio-Economic Status" },
          yaxis: { title: "Average NAT Result" },
        }}
      />
    </div>
  );
};

export default SocioEconomicStatusChart;
