import React, { useState } from "react";

function JobForm({ setJobs }) {
  const [jobName, setJobName] = useState("");
  const [duration, setDuration] = useState("");

  const submitJob = async (e) => {
    e.preventDefault();
    const response = await fetch("/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: jobName, duration: parseInt(duration) * 1000 })
    });
    const newJob = await response.json();
    setJobs(jobs => [...jobs, newJob]);
  };

  return (
    <form onSubmit={submitJob}>
      <input placeholder="Job Name" value={jobName} onChange={e => setJobName(e.target.value)} />
      <input placeholder="Duration (seconds)" value={duration} onChange={e => setDuration(e.target.value)} />
      <button type="submit">Submit Job</button>
    </form>
  );
}

export default JobForm;