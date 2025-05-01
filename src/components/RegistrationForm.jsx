import { useState, useRef } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for error messages
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // State for form submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Ref for focusing on input
  const nameInputRef = useRef(null);
  
  // Password strength indicators
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    
    // Length check
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };
  
  const getStrengthLabel = (strength) => {
    if (strength === 0) return { text: '', color: '' };
    if (strength <= 2) return { text: 'Weak', color: 'red' };
    if (strength <= 4) return { text: 'Medium', color: 'orange' };
    return { text: 'Strong', color: 'green' };
  };
  
  const passwordStrength = getPasswordStrength(password);
  const strengthLabel = getStrengthLabel(passwordStrength);
  
  // Validation handlers
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (!value.trim()) {
      setNameError('Name is required');
    } else if (value.length < 2) {
      setNameError('Name must be at least 2 characters');
    } else {
      setNameError('');
    }
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!value.trim()) {
      setEmailError('Email is required');
    } else if (!value.includes('@') || !value.includes('.')) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
    
    // Check confirm password match if it has a value
    if (confirmPassword) {
      if (value !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (!value) {
      setConfirmPasswordError('Please confirm your password');
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation check
    if (
      name && 
      email && 
      password && 
      confirmPassword && 
      !nameError && 
      !emailError && 
      !passwordError && 
      !confirmPasswordError
    ) {
      // Form is valid, show success message
      setIsSubmitted(true);
      
      // Reset form (optional)
      // setName('');
      // setEmail('');
      // setPassword('');
      // setConfirmPassword('');
    }
  };
  
  // Check if form is valid to enable/disable submit button
  const isFormValid = 
    name && 
    email && 
    password && 
    confirmPassword && 
    !nameError && 
    !emailError && 
    !passwordError && 
    !confirmPasswordError;
  
  return (
    <div className="registration-container">
      <h2 className="form-heading">User Registration</h2>
      
      {isSubmitted ? (
        <div className="success-message">
          <p className="success-title">Registration Successful!</p>
          <p>Thank you for registering, {name}.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="register-again-btn"
          >
            Register Another User
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              value={name}
              onChange={handleNameChange}
              className={`form-input ${nameError ? 'input-error' : ''}`}
              placeholder="Enter your name"
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`form-input ${emailError ? 'input-error' : ''}`}
              placeholder="Enter your email"
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          
          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`form-input ${passwordError ? 'input-error' : ''}`}
              placeholder="Enter your password (min. 6 characters)"
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="strength-container">
                <div className="strength-section">
                  <span className="strength-label">Password Strength:</span>
                  <div className="strength-meter">
                    <div 
                      className={`strength-indicator ${
                        passwordStrength <= 2 ? 'strength-weak' : 
                        passwordStrength <= 4 ? 'strength-medium' : 'strength-strong'
                      }`} 
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`strength-text text-${strengthLabel.color}`}>
                    {strengthLabel.text}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`form-input ${confirmPasswordError ? 'input-error' : ''}`}
              placeholder="Confirm your password"
            />
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`submit-button ${
              isFormValid ? 'submit-button-enabled' : 'submit-button-disabled'
            }`}
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;