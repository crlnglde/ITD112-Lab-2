import React from "react";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import Chartt from "../src/components/charts";
import Dashboard from "../src/components/dash";

function App() {
  return (
    <div className="App">
      <Header />

      <Dashboard/>
      <Chartt/>

      <Footer />
    </div>
  );
}

export default App;