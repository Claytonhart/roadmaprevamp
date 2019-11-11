import styled from 'styled-components/macro';

// index
export const ProjectsContainer = styled.div`
  margin-bottom: 10px;
  flex-grow: 1;
  border-bottom: 2px solid ${props => props.theme.primary.lightgrey};
  overflow-y: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;
