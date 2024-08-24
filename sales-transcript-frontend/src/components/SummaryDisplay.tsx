import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SummaryDisplay: React.FC = () => {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    axios.get('/api/summarize')
      .then(response => setSummary(response.data.summary))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

export default SummaryDisplay;