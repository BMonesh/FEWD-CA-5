import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../CSS/Register.css';

const Register = ({ updateUserName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    localStorage.setItem('formData', JSON.stringify(data));
    setSubmitted(true);
    navigate('/', { state: { userName: data.firstname } });
  };

  return (
    <div className="form-container">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Your Name</label>
          <input type="text" {...register("firstname", { required: true, maxLength: 30 })} />
          {errors.firstname && <p className="error">First name is required</p>}
        </div>

        <div className="form-group">
          <label>Your Email</label>
          <input type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
          {errors.email && <p className="error">Invalid email format</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password", { required: true, minLength: 8, pattern: /[!@#$%^&*(),.?":{}|<>]/ })} />
          {errors.password && <p className="error">Password should be at least 8 characters long and contain at least one symbol</p>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" {...register("confirmPassword", { required: true, validate: (value) => value === watch("password") })} />
          {errors.confirmPassword && <p className="error">Passwords must match</p>}
        </div>

        <button type="submit" className={submitted ? 'hide-signup' : ''} onClick={onSubmit}>
          {submitted ? 'Sign Out' : 'Sign Up'}
        </button>
      </form>

      {submitted && <h3>Signed up successfully</h3>}
    </div>
  );
};

export default Register;
