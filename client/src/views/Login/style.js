import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 25%;
`;

export const LoginLogo = styled.h3`
  font-size: 64px;
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.primary.red};
`;

export const LoginForm = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

export const LoginInput = styled.input`
  padding: 12px;
  margin: 8px;
  border: 1px solid gainsboro;
  border-radius: 5px;
`;

export const LoginButton = styled.input`
  background-color: ${props => props.theme.primary.blue};
  color: #fff;
  padding: 12px;
  margin: 8px;
  cursor: pointer;
`;
