import React, { useState } from 'react';
import { connect } from 'react-redux';

import { LoginForm, LoginInput, LoginButton } from './style';
import { login } from '../../actions/auth';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <LoginForm onSubmit={e => onSubmit(e)}>
      <LoginInput
        type='email'
        placeholder='Email Address'
        name='email'
        value={email}
        onChange={e => onChange(e)}
        required
      />

      <LoginInput
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={e => onChange(e)}
        minLength='6'
      />

      <LoginButton type='submit' value='Login' />
    </LoginForm>
  );
};

export default connect(
  null,
  { login }
)(Login);