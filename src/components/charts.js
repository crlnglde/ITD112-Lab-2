import React from 'react';
import Sta from './stackedbar';
import Vv from './violin';
import Ba from './bar';
import Pi from './pie';
import "../css/charts.css";

const ChartsContainer = () => {
  return (
    <div className='hhhh'>

      <h2>Visualizations</h2>
      <div className="charts-row">
        <div className="chart-item1">

          <Vv/>
        </div>
        <div className="chart-item2">

          <Ba/>
        </div>
      </div>

      <div className='charts-row1'>
        <div className="chart-item3">

            <Sta/>
        </div>

        <div className="chart-item4">

            <Pi/>
        </div>
      </div>

    </div>

    

  );
};

export default ChartsContainer;
