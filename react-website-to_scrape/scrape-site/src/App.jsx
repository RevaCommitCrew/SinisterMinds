import "./App.css";
import React, { useState } from "react";
import reports from "./components/Report";

function App() {
  const [count, setCount] = useState(0);

  const renderReport = () => {
    const report = reports[Math.floor(Math.random() * reports.length)];
    return (
      <div>
        <h2>
          {report.date} - {report.source}
        </h2>
        <p>{report.report}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Terrorism Report</h1>
      {renderReport()}
    </div>
  );
}

export default App;
