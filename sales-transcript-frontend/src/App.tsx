// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TranscriptViewer from './components/TranscriptViewer';
import SummaryDisplay from './components/SummaryDisplay';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transcript" element={<TranscriptViewer />} />
        <Route path="/summary" element={<SummaryDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;