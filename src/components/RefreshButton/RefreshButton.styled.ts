import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 75px;
  border: 1px solid ${({ theme }) => theme.colors.lightgrey};
  border-radius: 0.2rem;
  padding: 3px 7px 3px 7px;
  transition:
    color 0.1s ease-in-out,
    background-color 0.1s ease-in-out,
    border-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightgrey};
  }
`;

export const Disabled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 75px;
  border: 1px solid #c0c0c0;
  border-radius: 0.2rem;
  padding: 3px 7px 3px 7px;
  transition:
    color 0.1s ease-in-out,
    background-color 0.1s ease-in-out,
    border-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;
  background-color: #a6a6a6;
  &:hover {
    cursor: not-allowed;
  }
`;
