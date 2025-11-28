import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Card, Spinner, Alert, Form, Row, Col } from 'react-bootstrap';
import axiosClient from '../api/axiosClient';

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/employees');
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (department) params.department = department;
      if (position) params.position = position;

      const res = await axiosClient.get('/employees/search/by', { params });
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDepartment('');
    setPosition('');
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await axiosClient.delete(`/employees/${id}`);
      fetchEmployees(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete employee');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Employee Directory</h2>
          <p className="text-muted">Manage your workforce</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/employees/add')}
        >
          + Add Employee
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      {/* Search Section */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-3">Search Employees</h5>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., IT, HR, Sales"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Developer, Manager"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <div className="mb-3 d-flex gap-2 w-100">
                <Button variant="primary" onClick={handleSearch} className="flex-grow-1">
                  Search
                </Button>
                <Button variant="outline-secondary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Employee List */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {employees.length === 0 ? (
            <div className="text-center p-5">
              <h4 className="text-muted">No employees found</h4>
              <p className="text-muted">Try adjusting your search criteria or add a new employee</p>
              <Button variant="primary" onClick={() => navigate('/employees/add')}>
                Add Employee
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3">First Name</th>
                    <th className="py-3">Last Name</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Department</th>
                    <th className="py-3">Position</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(employee => (
                    <tr key={employee._id}>
                      <td className="px-4 py-3">{employee.first_name}</td>
                      <td className="py-3">{employee.last_name}</td>
                      <td className="py-3">{employee.email}</td>
                      <td className="py-3">{employee.department}</td>
                      <td className="py-3">{employee.position}</td>
                      <td className="py-3">
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => navigate(`/employees/${employee._id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate(`/employees/${employee._id}/edit`)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(employee._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {employees.length > 0 && (
        <div className="mt-3 text-muted">
          <small>Total Employees: <strong>{employees.length}</strong></small>
        </div>
      )}
    </Container>
  );
}

