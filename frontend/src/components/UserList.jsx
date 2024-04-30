import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserList = () => {
    const [users, setUsers] = useState([])

    async function fetchUsers() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/account/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/account/users/', {
                "username": "bbca",
                "email": "b@gmail.com",
                "password": "b",
                "first_name": "b",
                "last_name": "b"
            });
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    

    return (
        <div>
          <h1>User List</h1>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, id) => (
                
                <tr key={id}>
                  <td>{user.username}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.user_detail && user.user_detail.profile ? (
                        <img src={user.user_detail.profile} alt="Profile" style={{ width: '50px', height: '50px' }} />
                    ) : (
                        <span>No Profile Image</span>
                    )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCreateUser}>Create</button>
        </div>
      );
      
}

export default UserList
