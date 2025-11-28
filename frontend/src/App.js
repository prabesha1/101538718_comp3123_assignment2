import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeAddPage from './pages/EmployeeAddPage';
import EmployeeViewPage from './pages/EmployeeViewPage';
import EmployeeEditPage from './pages/EmployeeEditPage';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/employees"
              element={
                <Layout>
                  <EmployeeListPage />
                </Layout>
              }
            />
            <Route
              path="/employees/add"
              element={
                <Layout>
                  <EmployeeAddPage />
                </Layout>
              }
            />
            <Route
              path="/employees/:id"
              element={
                <Layout>
                  <EmployeeViewPage />
                </Layout>
              }
            />
            <Route
              path="/employees/:id/edit"
              element={
                <Layout>
                  <EmployeeEditPage />
                </Layout>
              }
            />
          </Route>

          {/* default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
