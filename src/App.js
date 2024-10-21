import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PatientDashboard from './components/PatientDashboard';
import TherapistDashboard from './components/TherapistDashboard';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentManagement from './components/AppointmentManagement';
import Payment from './components/Payment';
import ProgressTracking from './components/ProgressTracking';
import CreatePatient from './components/CreatePatient'; // Updated to use CreatePatient
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient" element={<ProtectedRoute role="patient" component={PatientDashboard} />} />
          <Route path="/therapist" element={<ProtectedRoute role="therapist" component={TherapistDashboard} />} />
          <Route path="/appointments" element={<ProtectedRoute role="patient" component={AppointmentManagement} />} />
          <Route path="/payment" element={<ProtectedRoute role="patient" component={Payment} />} />
          <Route path="/progress" element={<ProtectedRoute role="patient" component={ProgressTracking} />} />
          {/* Updated route to use CreatePatient instead of MedicalHistoryForm */}
          <Route path="/create-patient" element={<ProtectedRoute role="therapist" component={CreatePatient} />} />
          <Route path="/referral-dashboard" element={<ProtectedRoute role="referral-source" component={ReferralDashboard} />} />
          <Route path="/library" element={<ProtectedRoute role="therapist" component={ResourceLibrary} />} /> 
          <Route path="/incentives" element={<ProtectedRoute role="patient" component={PatientIncentives} />} /> 
          <Route path="/progress-logs" element={<ProtectedRoute role="therapist" component={ViewProgress} />} /> 
          <Route path="/sleep-questionnaire" element={<ProtectedRoute role="patient" component={SleepQuestionnaire} />} /> 
          <Route path="/patients/:id/history" element={<PatientHistory />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
