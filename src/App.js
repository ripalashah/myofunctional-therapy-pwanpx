// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PatientDashboard from './components/PatientDashboard';
import TherapistDashboard from './components/TherapistDashboard';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentManagement from './components/AppointmentManagement';
import Payment from './components/Payment';
import ProgressTracking from './components/ProgressTracking';
import CreatePatient from './components/CreatePatient';
import ProtectedRoute from './components/ProtectedRoute';
import ReferralDashboard from './components/ReferralDashboard';
import ResourceLibrary from './components/ResourceLibrary';
import PatientIncentives from './components/PatientIncentives';
import ViewProgress from './components/ViewProgress';
import SleepQuestionnaire from './components/SleepQuestionnaire';
import { AuthProvider } from './context/AuthContext';
import PatientHistory from './components/PatientHistory';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MedicalHistory from './components/MedicalHistory'; // <-- Import MedicalHistory component
import PatientManagement from './components/PatientManagement'; // Import PatientManagement component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default redirect to login */}
          <Route path="*" element={<Navigate to="/login" />} />
          
          {/* Authentication and Registration Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Patient Routes */}
          <Route path="/patient" element={<ProtectedRoute role="patient" component={PatientDashboard} />} />
          <Route path="/appointments" element={<ProtectedRoute role="patient" component={AppointmentManagement} />} />
          <Route path="/payment" element={<ProtectedRoute role="patient" component={Payment} />} />
          <Route path="/progress" element={<ProtectedRoute role="patient" component={ProgressTracking} />} />
          <Route path="/incentives" element={<ProtectedRoute role="patient" component={PatientIncentives} />} />
          <Route path="/sleep-questionnaire" element={<ProtectedRoute role="patient" component={SleepQuestionnaire} />} />
          
          {/* Therapist Routes */}
          <Route path="/therapist" element={<ProtectedRoute role="therapist" component={TherapistDashboard} />} />
          <Route path="/patient-management" element={<ProtectedRoute role="therapist" component={PatientManagement} />} /> {/* New Patient Management route */}
          <Route path="/create-patient" element={<ProtectedRoute role="therapist" component={CreatePatient} />} />
          <Route path="/progress-logs" element={<ProtectedRoute role="therapist" component={ViewProgress} />} />
          <Route path="/library" element={<ProtectedRoute role="therapist" component={ResourceLibrary} />} />

          {/* Referral Source Routes */}
          <Route path="/referral-dashboard" element={<ProtectedRoute role="referral-source" component={ReferralDashboard} />} />

          {/* Common Routes */}
          <Route path="/patients/:id/history" component={PatientHistory} />
          <Route path="/medical-history/:patientId" element={<ProtectedRoute role="therapist" component={MedicalHistory} />} /> {/* <-- New Medical History route */}
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
