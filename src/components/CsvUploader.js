import React, { useState } from 'react';
import { db } from "../firebase";
import { collection, addDoc } from 'firebase/firestore';
import "../css/add.css";  // Reuse the same CSS file

function CsvUploader() {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text.split('\n');
      const data = [];

      // Parse CSV rows assuming columns: location, cases, deaths, date, regions
      rows.forEach((row, index) => {
        const columns = row.split(',');
        if (columns.length >= 11 && index > 0) {
          const fullName = columns[0].trim().split(" "); 
          const lastName = fullName.pop(); // Get the last name
          const firstName = fullName.join(" "); 

          data.push({
            first_name: firstName || "", 
            respondents: lastName, 
            age: Number(columns[1].trim()),
            sex: columns[2].trim(),
            ethnic: columns[3].trim(),
            academic_performance: columns[4].trim(),
            academic_description: columns[5].trim(),
            iq: columns[6].trim(),
            type_school: columns[7].trim(),
            socio_economic_status: columns[8].trim(),
            study_habit: columns[9].trim(),
            nat_results: Number(columns[10].trim()),
          });
        }
      });

      try {
        const batch = data.map(async (item) => {
          await addDoc(collection(db, 'natData'), item);
        });

        await Promise.all(batch);
        alert('CSV data uploaded successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error uploading CSV data:', error);
      }
    };

    reader.readAsText(csvFile);
  };

  return (
    <div className="csv-container">
        <h3> </h3>
        <h2>Upload CSV File</h2>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileChange} 
        className="input-field"
      />
      <button className="submit-button" onClick={handleFileUpload}>Upload CSV</button>
      <h3>---------------------------OR---------------------------</h3>
    </div>
  );
}

export default CsvUploader;