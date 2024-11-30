import React, { useState } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'active' },
  ]);

  const handleBlockUser = (userId) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: 'blocked' } : user)));
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                {user.status === 'active' && (
                  <button className="pp_button" onClick={() => handleBlockUser(user.id)}>Block</button>
                )}
                {user.status === 'blocked' && (
                  <span>Blocked</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
