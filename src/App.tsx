import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { QHSE } from './pages/QHSE';
import { HR } from './pages/HR';
import { Contractors } from './pages/Contractors';
import { DrillingOperations } from './pages/DrillingOperations';
import { Accounting } from './pages/Accounting';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="qhse" element={<QHSE />} />
          <Route path="hr" element={<HR />} />
          <Route path="contractors" element={<Contractors />} />
          <Route path="drilling" element={<DrillingOperations />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;