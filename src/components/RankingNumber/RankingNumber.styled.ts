import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.whitegrey};
  color: ${props => props.color};
  border-radius: 1rem;
  height: 20px;
  font-size: 12px;
  padding: 0px 20px 0px 20px;
  gap: 0.3rem;

  p {
    padding-top: 2px;
  }
`;
