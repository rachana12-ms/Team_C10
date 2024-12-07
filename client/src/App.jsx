import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [newName, setNewName] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  // Fetch all employees
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setEmployeeList(response.data);
    });
  }, [employeeList]);

  // Add a new employee
  const addEmployee = () => {
    Axios.post("http://localhost:3001/insert", {
      name: name,
      email: email,
      position: position,
      salary: salary,
    }).then(() => {
      alert("Employee Added Successfully");
    });
  };

  // Update an employee's name
  const updateEmployee = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newName: newName,
    }).then(() => {
      alert("Employee Updated Successfully");
    });
  };

  // Delete an employee
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      alert("Employee Deleted Successfully");
    });
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>

      {/* Add Employee Section */}
      <div>
        <label>Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label>Position:</label>
        <input type="text" onChange={(e) => setPosition(e.target.value)} />
        <label>Salary:</label>
        <input type="number" onChange={(e) => setSalary(e.target.value)} />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      {/* Display Employee List */}
      <h1>Employee List</h1>
      {employeeList.map((employee, key) => (
        <div className="employee" key={key}>
          <h2>Name: {employee.name}</h2>
          <h3>Email: {employee.email}</h3>
          <h3>Position: {employee.position}</h3>
          <h3>Salary: {employee.salary}</h3>
          <input
            type="text"
            placeholder="New name..."
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={() => updateEmployee(employee._id)}>Update</button>
          <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;

