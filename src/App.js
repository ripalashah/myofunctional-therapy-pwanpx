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
import ProtectedRoute from './components/ProtectedRoute';
import ReferralDashboard from './components/ReferralDashboard';
import ResourceLibrary from './components/ResourceLibrary'; // Update to ResourceLibrary
import PatientIncentives from './components/PatientIncentives'; // Update to PatientIncentives
import ViewProgress from './components/ViewProgress'; // Update to ViewProgress
import SleepQuestionnaire from './components/SleepQuestionnaire'; // Ensure this file exists or create it
import { AuthProvider } from './context/AuthContext'; // Ensure AuthContext path is correct
import PatientHistory from './components/PatientHistory'; // Import the new component

function App() {
  return (
    <AuthProvider>
      <Router basename="/wmt">
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
          <Route path="/referral-dashboard" element={<ProtectedRoute role="referral-source" component={ReferralDashboard} />} />
          <Route path="/library" element={<ProtectedRoute role="therapist" component={ResourceLibrary} />} /> {/* Corrected name */}
          <Route path="/incentives" element={<ProtectedRoute role="patient" component={PatientIncentives} />} /> {/* Corrected name */}
          <Route path="/progress-logs" element={<ProtectedRoute role="therapist" component={ViewProgress} />} /> {/* Corrected name */}
          <Route path="/sleep-questionnaire" element={<ProtectedRoute role="patient" component={SleepQuestionnaire} />} /> {/* Ensure file exists */}
          <Route path="/patients/:id/history" element={<PatientHistory />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
