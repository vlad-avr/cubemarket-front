import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of users (assuming there's an API to fetch users)
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5051/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setErrorMessage('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage('Network error. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      const response = await fetch('http://localhost:5051/admin/set-block', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          user: userId,
          blocked: isBlocked,
        }),
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, status: isBlocked ? 'blocked' : 'active' } : user
          )
        );
      } else {
        setErrorMessage('Failed to update user status.');
      }
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch('http://localhost:5051/superadmin/set-role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          user: userId,
          role: newRole,
        }),
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        setErrorMessage('Failed to update user role.');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">SuperAdmin</option>
                </select>
              </td>
              <td>
                {user.status === 'active' ? (
                  <button
                    className="pp_button"
                    onClick={() => handleBlockUser(user.id, true)}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="pp_button"
                    onClick={() => handleBlockUser(user.id, false)}
                  >
                    Unblock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="navigation-buttons">
        <button className="pp_button" onClick={() => navigate('/personal')}>
          Back to Personal Page
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
