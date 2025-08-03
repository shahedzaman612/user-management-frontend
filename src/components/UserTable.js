import React from "react";
import { Table, Form } from "react-bootstrap";

function UserTable({ users, onSelectAll, onSelectUser, selectedUserIds }) {
  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              aria-label="Select all users"
              onChange={onSelectAll}
              checked={
                users.length > 0 && selectedUserIds.length === users.length
              }
              // Indeterminate state if some but not all are selected
              indeterminate={
                selectedUserIds.length > 0 &&
                selectedUserIds.length < users.length
              }
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Last Login Time</th>
          <th>Registration Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              No users found.
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  aria-label={`Select user ${user.name}`}
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => onSelectUser(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* Corrected property names */}
              <td>
                {user.last_login
                  ? new Date(user.last_login).toLocaleString()
                  : "N/A"}
              </td>
              <td>
                {user.created_at
                  ? new Date(user.created_at).toLocaleString()
                  : "N/A"}
              </td>
              <td>{user.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default UserTable;
