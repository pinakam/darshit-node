import React, { useState } from 'react';

const Employee = () => {
    // Pre-defined employee data
    const initialData = [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "position": "Software Engineer"
        },
        {
            "id": 2,
            "firstName": "darshit",
            "lastName": "dandnayak",
            "email": "darshit@example.com",
            "position": "Software Engineer"
        },
    ];

    const [addedEmployees, setAddedEmployees] = useState([]);
    const allEmployees = [...initialData, ...addedEmployees];

    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        position: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddEmployee = (e) => {
        e.preventDefault();

        const newEmployee = {
            id: formData.id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            position: formData.position,
        };

        setAddedEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        setFormData({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            position: '',
        });
    };

    return (
        <div>
            <h1>Employee List</h1>
            <form onSubmit={handleAddEmployee}>
                <label>id:</label>
                <input type="text" name="id" value={formData.id} onChange={handleInputChange}></input>
                <label>firstName:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}></input>
                <label>lastName:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}></input>
                <label>email:</label>
                <input type='text' name="email" value={formData.email} onChange={handleInputChange}></input>
                <label>postion:</label>
                <input type='text' name="position" value={formData.position} onChange={handleInputChange}></input>
                <button type="submit">submit</button>
            </form>
            <br></br>
            <ul>
                {allEmployees.map((employee) => (
                    <li key={employee.id}>
                        <li>{employee.firstName}</li>
                        <li>{employee.lastName}</li>
                        <li>{employee.email}</li>
                        <li>{employee.position}</li>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Employee;
