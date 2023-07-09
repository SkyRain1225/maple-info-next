import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.bluegrey};
  border-top: 1px solid ${({ theme }) => theme.colors.blue};
  > div {
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.blackgrey};
    font-size: 15px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(1) {
      min-width: 170px;
      width: 170px;
    }
    &:nth-child(2) {
      min-width: 352px;
      width: 352px;
    }
    &:nth-child(3) {
      min-width: 200px;
      width: 200px;
    }
    &:nth-child(4) {
      min-width: 132px;
      width: 132px;
    }
    &:nth-child(5) {
      min-width: 197px;
      width: 197px;
    }
    &:nth-child(6) {
      min-width: 149px;
      width: 149px;
    }
  }
`;
