import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert, Row, Col, Image } from 'react-bootstrap';
import axiosClient from '../api/axiosClient';

export default function EmployeeViewPage() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEmployee = useCallback(async () => {
    try {
      const res = await axiosClient.get(`/employees/${id}`);
      setEmployee(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employee');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!employee) return <Alert variant="warning">Employee not found</Alert>;

  // Construct profile image URL
  const profileImageUrl = employee.profileImage
    ? `${process.env.REACT_APP_API_BASE_URL.replace('/api', '')}/${employee.profileImage}`
    : null;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Employee Details</h2>
          <p className="text-muted">View employee information</p>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => navigate(`/employees/${employee._id}/edit`)}
          >
            Update Employee
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/employees')}
          >
            Back to List
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Row>
            {/* Profile Image Section */}
            {profileImageUrl && (
              <Col md={12} className="text-center mb-4">
                <Image
                  src={profileImageUrl}
                  alt={`${employee.first_name} ${employee.last_name}`}
                  roundedCircle
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
              </Col>
            )}

            <Col md={6}>
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Personal Information</h6>
                <div className="mb-3">
                  <label className="text-muted small">First Name</label>
                  <h5 className="mb-0">{employee.first_name}</h5>
                </div>
                <div className="mb-3">
                  <label className="text-muted small">Last Name</label>
                  <h5 className="mb-0">{employee.last_name}</h5>
                </div>
                <div className="mb-3">
                  <label className="text-muted small">Email Address</label>
                  <div>
                    <a href={`mailto:${employee.email}`} className="text-decoration-none">
                      {employee.email}
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Employment Details</h6>
                <div className="mb-3">
                  <label className="text-muted small">Position</label>
                  <div className="fw-semibold">{employee.position}</div>
                </div>
                <div className="mb-3">
                  <label className="text-muted small">Department</label>
                  <div className="fw-semibold">{employee.department}</div>
                </div>
                {employee.salary && (
                  <div className="mb-3">
                    <label className="text-muted small">Salary</label>
                    <div className="fs-5 fw-bold text-success">
                      ${employee.salary?.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          {employee.date_of_joining && (
            <>
              <hr className="my-4" />
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="text-muted small">Date of Joining</label>
                    <div className="fw-semibold">
                      {new Date(employee.date_of_joining).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}

          <hr className="my-4" />

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <label className="text-muted small">Created At</label>
                <div className="small">
                  {new Date(employee.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="text-muted small">Last Updated</label>
                <div className="small">
                  {new Date(employee.updated_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

