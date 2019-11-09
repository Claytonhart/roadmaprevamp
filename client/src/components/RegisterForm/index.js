import React, { useState } from 'react';
import { connect } from 'react-redux';

import { register } from '../../actions/auth';
import { Form, RegisterInput, RegisterButton, RegisterError } from './style';
import { setError } from '../../actions/error';

const RegisterForm = ({ setError, register, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (!password || !password2) {
      setError('Please input matching passwords');
    } else if (password !== password2) {
      setError('Passwords do not match');
    } else {
      register({ name: name.toLowerCase(), email, password });
    }
  };

  return (
    <Form onSubmit={e => onSubmit(e)}>
      {error.msg && <RegisterError>{error.msg}</RegisterError>}
      <RegisterInput
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={e => onChange(e)}
      />

      <RegisterInput
        type='email'
        placeholder='Email Address'
        name='email'
        value={email}
        onChange={e => onChange(e)}
      />

      <RegisterInput
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={e => onChange(e)}
      />

      <RegisterInput
        type='password'
        placeholder='Confirm Password'
        name='password2'
        value={password2}
        onChange={e => onChange(e)}
      />

      <RegisterButton type='submit' value='Register' />
    </Form>
  );
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { setError, register }
)(RegisterForm);
