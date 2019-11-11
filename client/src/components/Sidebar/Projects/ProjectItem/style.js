import styled from 'styled-components/macro';

// Index
export const Container = styled.div`
  padding: 8px;
  &:not(:first-of-type) {
    border-top: 1px solid ${props => props.theme.primary.lightgrey};
  }
`;
