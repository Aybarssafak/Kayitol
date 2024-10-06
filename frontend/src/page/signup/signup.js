import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password } = values;

        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await axios.post('http://localhost:3001/signup', values);
            console.log("Signup Successful", res.data);
            setValues({ name: '', email: '', password: '' });
            setError('');
        } catch (err) {
            if (err.response) {
                if (err.response.status === 409) {
                    setError('Email already exists');
                } else {
                    setError('An error occurred: ' + err.response.data); // Sunucudan dönen hata mesajı
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='form'>
            <h1>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder='Name..'
                    value={values.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder='E-Mail..'
                    value={values.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder='Password..'
                    value={values.password}
                    onChange={handleChange}
                />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
