import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])
  const handleSubmit = e => {
    e.preventDefault()
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    //post data to server

    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        const newUsers =[...users, data];
        setUsers(newUsers);
        console.log(data);
      })
  }
  return (
    <div className="App">
      <h1>my own data: {users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder="Name" required></input>
        <input type="text" name="email" placeholder="Email" required></input>
        <input type='submit' value='Add User'></input>
      </form>
      <ul>
        {users.map(user => <li key={user.id}>{user.id}: {user.name}, email: {user.email}</li>)}
      </ul>
    </div>
  );
}

export default App;
