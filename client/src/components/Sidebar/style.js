import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding: 8px;
  &:not(:first-of-type) {
    border-top: 1px solid ${props => props.theme.primary.lightgrey};
  }
`;

export const WorkspaceItemTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export const WorkspaceItemTitle = styled.h6`
  font-size: 14px;
  color: #fff;
  cursor: pointer;
`;

export const WorkspaceItemIconContainer = styled.div`
  &:hover > span {
    opacity: 1;
  }
`;

export const WorkspaceItemIcon = styled.span`
  cursor: pointer;
  opacity: 0;
`;

export const WorkspaceItemPeople = styled.ul`
  display: flex;
  margin: 12px 0;
`;

export const WorkspaceItemPerson = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 11px;
  text-transform: uppercase;

  height: 24px;
  width: 24px;
  margin: 0;
  margin-right: 8px;
  padding: 6px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary.lightgrey};
  cursor: pointer;
`;

export const WorkspaceItemProjects = styled.ul`
  margin-bottom: 8px;
  text-align: left;
`;

export const DropDownContainerButton = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  background-color: #fff;
  text-align: right;
  display: block;
  border: none;
  background-color: transparent;
  width: 100%;
  color: #272838;

  &:hover {
    background-color: #f6f8f9;
    text-decoration: none;
    color: #272838;
  }
`;

// PROJECT LINK

export const Item = styled.li`
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 6px;
  color: inherit;
  outline: none; */
  /* width: 100%; */
/* 
  transition: all 0.2s;

  &:hover,
  &:focus,
  &:active {
    background-color: ${props => props.theme.primary.lightgrey};
    text-decoration: none;
    color: inherit;
    outline: none;
  } */
`;

export const ItemLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 6px;
  color: inherit;
  outline: none;

  transition: all 0.2s;

  &:hover,
  &:focus,
  &:active {
    background-color: ${props => props.theme.primary.lightgrey};
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  &:hover {
    > span {
      opacity: 1;
    }
  }
`;

export const ItemButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 6px;
  color: inherit;
  outline: none;

  transition: all 0.2s;

  &:hover,
  &:focus {
    background-color: ${props => props.theme.primary.lightgrey};
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  &:hover {
    > span {
      opacity: 1;
    }
  }
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
`;

export const ItemIcon = styled.span`
  width: 8px;
  height: 8px;
  margin-right: 12px;
  background-color: ${props =>
    props.color ? props.color : props.theme.primary.lightgrey};
`;

export const ItemName = styled.p`
  margin: 0;
`;

export const ItemEditIcon = styled.span`
  cursor: pointer;
  opacity: 0;
  font-size: 18px;
`;
