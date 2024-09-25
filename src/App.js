import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PatientDashboard from './components/PatientDashboard';
import TherapistDashboard from './components/TherapistDashboard';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentManagement from './components/AppointmentManagement';
import Payment from './components/Payment';
import ProgressTracking from './components/ProgressTracking';
import MedicalHistoryForm from './components/MedicalHistoryForm';
import ProtectedRoute from './components/ProtectedRoute'; // Example of role-based protected routing

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient" element={<ProtectedRoute role="patient" component={PatientDashboard} />} />
        <Route path="/therapist" element={<ProtectedRoute role="therapist" component={TherapistDashboard} />} />
        <Route path="/appointments" element={<ProtectedRoute role="patient" component={AppointmentManagement} />} />
        <Route path="/payment" element={<ProtectedRoute role="patient" component={Payment} />} />
        <Route path="/progress" element={<ProtectedRoute role="patient" component={ProgressTracking} />} />
        <Route path="/medical-history" element={<ProtectedRoute role="patient" component={MedicalHistoryForm} />} />
        {/* Add additional routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;
