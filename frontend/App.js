import React, { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
  const [jobs, setJobs] = useState([]);
  const ws = new WebSocket("ws://localhost:8080/ws");

  useEffect(() => {
    fetch("/jobs")
      .then(response => response.json())
      .then(data => setJobs(data));

    ws.onmessage = (event) => {
      const updatedJob = JSON.parse(event.data);
      setJobs(prevJobs => prevJobs.map(job =>
        job.id === updatedJob.id ? updatedJob : job
      ));
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Job Scheduler</h1>
      <JobForm setJobs={setJobs} />
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;