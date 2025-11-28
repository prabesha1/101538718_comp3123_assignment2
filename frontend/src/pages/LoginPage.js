import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import axiosClient from '../api/axiosClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const res = await axiosClient.post('/login', { email, password });
      login(res.data.token);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-center mt-5">
        <Card style={{ width: '26rem' }} className="shadow">
          <Card.Body className="p-4">
            <Card.Title className="mb-4 text-center">
              <h3 className="fw-bold">Login</h3>
            </Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 mt-3">
                Login
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <span>Don&apos;t have an account? </span>
              <Link to="/signup">Sign up</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

