import React from 'react';
import AddNatData from './AddNATData';
import NatList from './NATList';
import CSVUploader from './CsvUploader';
import '../css/dash.css'; // Import CSS for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-item1">
        <CSVUploader />
        <AddNatData />
      </div>
      <div className="dashboard-item2">
        <NatList />
      </div>
    </div>
  );
};

export default Dashboard;